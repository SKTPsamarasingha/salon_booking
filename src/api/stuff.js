import { bookingSchema } from "/src/zod/bookingSchema.js";

const STORAGE_KEY   = "salon_bookings";
const SCHEDULE_KEY  = "salon_artist_schedule"; // pre-seeded availability

/* ═══════════════════════════════════════════════════════════════
   ARTIST SCHEDULE
   Format: { [artistId]: { [dateISO]: string[] } }
   where dateISO = "YYYY-MM-DD", values = available time slots
═══════════════════════════════════════════════════════════════ */

/** Seed default availability for the next 45 days if not already stored.
 *  Slots are deterministic — no randomness — so every slot is genuinely bookable.
 */
export function seedArtistSchedule() {
    try {
        const existing = localStorage.getItem(SCHEDULE_KEY);
        if (existing) return;

        const ALL_SLOTS = [
            "9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
            "12:00 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM",
            "3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM",
        ];

        // Deterministic per-artist configs — no Math.random()
        // Artist IDs now match transformed names: "isabelle_moret", "kenji_arao", etc.
        const artistConfigs = {
            isabelle_moret:  { daysOff: [0, 1], slots: ALL_SLOTS.filter((_, i) => i % 2 === 0) },
            kenji_arao:      { daysOff: [0, 6], slots: ALL_SLOTS.slice(0, 14) },
            sofia_vance:     { daysOff: [1],    slots: ALL_SLOTS },
            marc_delacroix:  { daysOff: [0, 2], slots: ALL_SLOTS.filter((_, i) => i % 3 !== 2) },
        };

        const schedule = {};
        const today = new Date();

        Object.entries(artistConfigs).forEach(([artistId, config]) => {
            schedule[artistId] = {};
            for (let i = 0; i < 45; i++) {
                const d = new Date(today);
                d.setDate(today.getDate() + i);
                if (config.daysOff.includes(d.getDay())) continue;
                const dateISO = toDateISO(d);
                // Full deterministic slot list — every slot is real and bookable
                schedule[artistId][dateISO] = [...config.slots];
            }
        });

        localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
    } catch (e) {
        console.error("[bookingStorage] seedArtistSchedule failed:", e);
    }
}

/** Check whether a specific artist + date + time slot is still available.
 *  This is the single source of truth used by saveBooking to prevent double-booking.
 */
export function isSlotAvailable(artistId, dateISO, timeSlot) {
    try {
        const raw = localStorage.getItem(SCHEDULE_KEY);
        if (!raw) return false;
        const schedule = JSON.parse(raw);
        const slots = schedule[artistId]?.[dateISO] ?? [];
        return slots.includes(timeSlot);
    } catch (e) {
        console.error("[bookingStorage] isSlotAvailable failed:", e);
        return false;
    }
}

/** Get all available dates for an artist (returns Set of "YYYY-MM-DD" strings) */
export function getAvailableDates(artistId) {
    try {
        const raw = localStorage.getItem(SCHEDULE_KEY);
        if (!raw) return new Set();
        const schedule = JSON.parse(raw);
        const artistSchedule = schedule[artistId] ?? {};
        return new Set(Object.keys(artistSchedule));
    } catch (e) {
        console.error("[bookingStorage] getAvailableDates failed:", e);
        return new Set();
    }
}

/** Get available time slots for an artist on a given date */
export function getAvailableSlots(artistId, dateISO) {
    try {
        const raw = localStorage.getItem(SCHEDULE_KEY);
        if (!raw) return [];
        const schedule = JSON.parse(raw);
        return schedule[artistId]?.[dateISO] ?? [];
    } catch (e) {
        console.error("[bookingStorage] getAvailableSlots failed:", e);
        return [];
    }
}

/** Remove a booked slot from the artist's schedule */
function removeBookedSlot(artistId, dateISO, timeSlot) {
    try {
        const raw = localStorage.getItem(SCHEDULE_KEY);
        if (!raw) return;
        const schedule = JSON.parse(raw);
        if (!schedule[artistId]?.[dateISO]) return;

        schedule[artistId][dateISO] = schedule[artistId][dateISO].filter(s => s !== timeSlot);

        // If no slots left that day, remove the date entirely
        if (schedule[artistId][dateISO].length === 0) {
            delete schedule[artistId][dateISO];
        }

        localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
    } catch (e) {
        console.error("[bookingStorage] removeBookedSlot failed:", e);
    }
}


/* ═══════════════════════════════════════════════════════════════
   BOOKINGS CRUD
═══════════════════════════════════════════════════════════════ */

/** Read all bookings from localStorage (returns parsed array) */
export function getAllBookings() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (e) {
        console.error("[bookingStorage] getAllBookings failed:", e);
        return [];
    }
}

/** Save a new booking. Validates with Zod, checks slot availability, then writes atomically.
 *  Returns { success: boolean, booking?, error? }
 */
export function saveBooking(bookingData) {
    try {
        // ── 1. Zod validation ──────────────────────────────────────────
        const payload = {
            ...bookingData,
            id:        crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };

        const parsed = bookingSchema.safeParse(payload);
        if (!parsed.success) {
            const messages = parsed.error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ");
            return { success: false, error: `Validation failed — ${messages}` };
        }

        // ── 2. Double-booking guard ────────────────────────────────────
        // For a named artist: the slot must still exist in the schedule.
        // For "no preference": check that no existing booking holds the same
        //                      date + time (across any artist).
        if (bookingData.artist) {
            if (!isSlotAvailable(bookingData.artist.id, bookingData.date, bookingData.time)) {
                return {
                    success: false,
                    error: `Sorry — ${bookingData.artist.name} is no longer available at ${bookingData.time} on that date. Please choose another slot.`,
                };
            }
        } else {
            // No-preference: reject if any booking already occupies this exact date+time
            const conflict = getAllBookings().find(
                b => !b.artist && b.date === bookingData.date && b.time === bookingData.time
            );
            if (conflict) {
                return {
                    success: false,
                    error: `The ${bookingData.time} slot on that date is no longer available. Please choose another time.`,
                };
            }
        }

        // ── 3. Write booking ───────────────────────────────────────────
        const bookings = getAllBookings();
        bookings.push(parsed.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));

        // ── 4. Remove slot from schedule so it can't be booked again ──
        if (bookingData.artist) {
            removeBookedSlot(bookingData.artist.id, bookingData.date, bookingData.time);
        }

        return { success: true, booking: parsed.data };
    } catch (e) {
        console.error("[bookingStorage] saveBooking failed:", e);
        return { success: false, error: "Unexpected error saving booking." };
    }
}

/** Get a single booking by ID */
export function getBookingById(id) {
    try {
        return getAllBookings().find(b => b.id === id) ?? null;
    } catch (e) {
        console.error("[bookingStorage] getBookingById failed:", e);
        return null;
    }
}

/** Cancel (delete) a booking by ID. Restores the slot to the schedule. */
export function cancelBooking(id) {
    try {
        const bookings = getAllBookings();
        const target = bookings.find(b => b.id === id);
        if (!target) return { success: false, error: "Booking not found." };

        const updated = bookings.filter(b => b.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        // Restore slot
        if (target.artist) {
            try {
                const raw = localStorage.getItem(SCHEDULE_KEY);
                const schedule = raw ? JSON.parse(raw) : {};
                const { id: artistId } = target.artist;
                if (!schedule[artistId]) schedule[artistId] = {};
                if (!schedule[artistId][target.date]) schedule[artistId][target.date] = [];
                schedule[artistId][target.date].push(target.time);
                schedule[artistId][target.date].sort();
                localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
            } catch (_) { /* slot restore is best-effort */ }
        }

        return { success: true };
    } catch (e) {
        console.error("[bookingStorage] cancelBooking failed:", e);
        return { success: false, error: "Unexpected error cancelling booking." };
    }
}

/** Wipe all bookings (dev/testing util) */
export function clearAllBookings() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

/* ─── Utility ──────────────────────────────────────────────── */
/** Format a JS Date to "YYYY-MM-DD" */
export function toDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}