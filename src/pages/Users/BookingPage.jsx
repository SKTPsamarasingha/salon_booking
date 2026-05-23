import {useState, useEffect, useRef} from "react";
import {employees, services, dummyBookings} from "../../api/constant.js";
import BookingCard from "../../components/BookingPage/BookingCard.jsx";
import {loadBooking, updateBooking} from "../../api/bookingStorage.js";
import RescheduleModal from "../../components/BookingPage/RescheduleModal.jsx";
import gsap from "gsap";


const BookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    const [targetedBooking, setTargetedBooking] = useState(null);

    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    // Reset cards references array on render
    cardsRef.current = [];

    useEffect(() => {
        setBookings(dummyBookings); // Assuming dummyBookings is globally accessible or imported
    }, []);

    useEffect(() => {
        if (bookings.length === 0) return; // Wait until dummy data binds to DOM

        const ctx = gsap.context(() => {
            // 1. Header Text Load Sequence (Matched from ServicesPage)
            const headerTl = gsap.timeline({defaults: {ease: 'power4.out'}});
            headerTl
                .from('.bookings-sub', {opacity: 0, y: -15, duration: 0.6})
                .from('.bookings-title', {opacity: 0, y: 25, duration: 0.8}, '-=0.4')
                .from('.bookings-desc', {opacity: 0, y: 15, duration: 0.6}, '-=0.5');

            // 2. ScrollTrigger Grid Stagger Entry (Matched from ServicesPage)
            gsap.from(cardsRef.current, {
                opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
                    trigger: '.services-grid', start: 'top 85%', toggleActions: 'play none none none',
                },
            });
        }, );


        return () => ctx.revert(); // GSAP memory cleanup
    }, [bookings]); // Re-run animation calculation when data mounts

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
        updateBooking(updated); // Assuming updateBooking is configured
    };

    return (
        <section ref={containerRef} className="w-full min-h-screen bg-[#f8f5f0] px-6 py-20 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Editorial Header (Exactly matching ServicesPage structure) */}
                <div className="text-center mb-16">
                    <p className="bookings-sub uppercase tracking-[0.35em] text-[10px] text-pink-300 mb-4 font-semibold">
                        Lock & co.
                    </p>
                    <h1 className="bookings-title text-5xl md:text-6xl font-serif text-[#1a1714] mb-5">
                        Your <span className="italic text-pink-300">Appointments</span>
                    </h1>
                    <p className="bookings-desc max-w-2xl mx-auto text-[#7a7068] font-light leading-relaxed">
                        View, reschedule, or cancel your upcoming scheduled wellness sessions. Review details and
                        modifications below.
                    </p>
                </div>

                {/* Bookings Grid Layout (Synced classes from services-grid) */}
                <div
                    className="bookings-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                    {bookings.map((singleBooking, i) => (
                        <div
                            key={singleBooking?.id}
                            ref={(el) => {
                                if (el) cardsRef.current[i] = el;
                            }}
                            className="w-full max-w-sm flex"
                        >
                            <BookingCard
                                booking={singleBooking}
                                services={services}
                                employees={employees}
                                setIsRescheduleOpen={setIsRescheduleOpen}
                                handleRescheduleBooking={handleRescheduleBooking}
                            />
                        </div>
                    ))}
                </div>

                {/* Interactive Modal System */}
                <RescheduleModal
                    isOpen={isRescheduleOpen}
                    onClose={() => setIsRescheduleOpen(false)}
                    booking={targetedBooking}
                    employees={employees}
                    onConfirm={handleConfirmReschedule}
                />

            </div>
        </section>
    );
};

export default BookingPage;
