import {useState, useEffect} from "react";
import {employees, services, dummyBookings} from "../../api/constant.js";
import BookingCard from "../../components/BookingPage/BookingCard.jsx";
import {loadBooking, updateBooking} from "../../api/bookingStorage.js";
import RescheduleModal from "../../components/BookingPage/RescheduleModal.jsx";

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    const [targetedBooking, setTargetedBooking] = useState(null);

    useEffect(() => {
        const currBookings = loadBooking()
        const combined = [...currBookings, ...dummyBookings]

        setBookings(combined)
    }, []);

    const handleRescheduleBooking = (bookingId) => {
        const matched = bookings.find(b => b.id === bookingId);
        setTargetedBooking(matched);
        setIsRescheduleOpen(true);
    };

    const handleConfirmReschedule = (bookingId, newDate, newTime) => {
        const updated = bookings.map(b =>
            b.id === bookingId ? {...b, date: newDate, time: newTime} : b
        );
        setBookings(updated);
        updateBooking(updated)
    };

    return (
        <>
            <main className="mt-10 w-full min-h-screen bg-[#faf9f7 flex flex-col items-center ]">
                <div className="w-full max-w-7xl mx-auto mt-15 ">
                    {/* Header */}
                    <div className="">
                        <h1 className="font-serif font-light text-4xl lg:text-5xl text-[#1a1714] leading-tight mb-4">
                            {"Your".split(" ").map((w, i) => (
                                <span key={i} className="word inline-block mr-[0.28em]">
                                    {w}
                                </span>
                            ))}{" "}
                            <span className="word inline-block italic text-pink-300 mr-[0.28em]">
                                Appointments
                            </span>
                        </h1>
                        <p className="text-sm text-[#7a7068] font-light leading-relaxed max-w-xl">
                            View, reschedule, or cancel your upcoming bookings.
                        </p>
                    </div>
                </div>

                <div className="mt-10 mb-10 flex items-center flex-col gap-6 max-w-5xl">
                    {bookings.map((singleBooking) => (
                        <BookingCard
                            key={singleBooking?.id}
                            booking={singleBooking}
                            services={services}
                            employees={employees}
                            setIsRescheduleOpen={setIsRescheduleOpen}
                            handleRescheduleBooking={handleRescheduleBooking}
                        />
                    ))}
                </div>

                <RescheduleModal
                    isOpen={isRescheduleOpen}
                    onClose={() => setIsRescheduleOpen(false)}
                    booking={targetedBooking}
                    employees={employees}
                    onConfirm={handleConfirmReschedule}
                />
            </main>
        </>
    );
};

export default BookingPage;