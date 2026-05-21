const BOOKING_KEY = "CustomerBookings";

export const saveBookings = (newBookingData) => {
    try {
        const existingRaw = localStorage.getItem(BOOKING_KEY);
        const currentBookings = existingRaw ? JSON.parse(existingRaw) : [];

        currentBookings.push(newBookingData);
        localStorage.setItem(BOOKING_KEY, JSON.stringify(currentBookings));
    } catch (error) {
        console.error('Failed to update bookings in Local Storage:', error);
    }
};

export const cancelBooking = (id) => {
    const existingRaw = localStorage.getItem(BOOKING_KEY);
    const currentBookings = existingRaw ? JSON.parse(existingRaw) : [];

    const updatedBookings = currentBookings.filter((b) => b.id !== id)
    localStorage.setItem(BOOKING_KEY, JSON.stringify(updatedBookings));
}

export const updateBooking = (newBookingData) => {
    localStorage.setItem(BOOKING_KEY, JSON.stringify(newBookingData));
}

export const loadBooking = () => {
    try {
        const saved = localStorage.getItem(BOOKING_KEY);
        return saved ? JSON.parse([saved]) : null;
    } catch (error) {
        console.error("Failed to load booking progress:", error);
        return null;
    }
};

export const clearBookingProgress = () => {
    localStorage.removeItem(BOOKING_KEY);
};