import {services, employees, STEPS} from "../../api/constant.js";
import {useRef, useState} from "react";
import StepIndicator from "./StepIndicator.jsx";
import {MiniCalendar} from "./MiniCalendar.jsx";
import {Field, Row} from "./Field.jsx";
import {BOOKING_STEPS} from "../../zod/bookingSchema.js";
import {gsap} from "gsap";
import {saveBookings} from "../../api/bookingStorage.js";

const dummyAvailableDates = new Set(["2026-05-20", "2026-05-21", "2026-05-22", "2026-05-25", "2026-05-26", "2026-05-28", "2026-05-28"]);
const friendlyDate = "Thursday, June 11th, 2026";
const slots = ["09:00 AM", "10:30 AM", "11:00 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

const BookingModal = ({isOpen, setIsOpen}) => {
    const [step, setStep] = useState(0);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        servicesID: null, employeeID: null, date: "", time: "", details: {
            fullName: "", email: "", phone: "", requests: ""
        }
    });
    const [snapShot, setSnapShot] = useState({name: "", email: ""});

    const contentRef = useRef(null);

    const handleFinalSubmit = () => {
        try {
            setErrors({});
            const payload = {id: `${Math.floor(1000 + Math.random() * 9000)}`, ...formData}
            saveBookings(payload)
            setSnapShot({
                name: formData.details.fullName,
                email: formData.details.email
            });
            setFormData({
                servicesID: null,
                employeeID: null,
                date: "",
                time: "",
                details: {fullName: "", email: "", phone: "", requests: ""}
            });
            setSubmitted(true);
        } catch (err) {
            console.warn(err)
            setErrors({serverError: "An unexpected system error occurred. Please try again."});
        }
    };
    const animateStep = (dir, cb) => {
        gsap.to(contentRef.current, {
            x: dir * -30, opacity: 0, duration: 0.18, ease: "power2.in", onComplete: () => {
                cb();
                gsap.fromTo(contentRef.current, {x: dir * 30, opacity: 0}, {
                    x: 0,
                    opacity: 1,
                    duration: 0.28,
                    ease: "power3.out"
                });
            },
        });
    };
    const handleClose = () => {
        setErrors({});
        setIsOpen(!isOpen)
        setSubmitted(false);
        setStep(0)

    };
    const next = () => {
        const currentStepSchema = BOOKING_STEPS[step].schema;
        const result = currentStepSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors = {};
            result.error.issues.forEach((issue) => {
                const key = issue.path.length > 1 ? issue.path[1] : issue.path[0];
                formattedErrors[key] = issue.message;
            });
            setErrors(formattedErrors);
        } else {
            setErrors({});
            animateStep(1, () => setStep(s => s + 1));

        }
    };
    const back = () => {
        setErrors({});
        animateStep(-1, () => setStep(s => s - 1));

    };
    return (<div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 select-none transition-all duration-300 ease-in-out ${
            isOpen
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
        }`}
    >
        <div className="absolute inset-0 bg-[#1a1714]/70 backdrop-blur-sm" onClick={handleClose}/>

        {/* Main Panel */}
        <div
            className="relative z-10 w-full max-w-2xl max-h-[92vh] bg-[#faf9f7] flex flex-col overflow-hidden shadow-2xl rounded-2xl"
            style={{fontFamily: "'Georgia', serif"}}
        >
            {/* Dynamic Panel Header Layout */}
            <div className="flex items-center justify-between px-8 pt-8 pb-5 border-b border-[#e8e3dc] shrink-0">
                <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-pink-300 mb-1">Book Your Visit</p>
                    <h2 className="font-serif text-2xl font-light text-[#1a1714]">
                        {submitted ? "Appointment Confirmed" : STEPS[step]}
                    </h2>
                </div>
                <button
                    onClick={handleClose}
                    type="button"
                    className="w-9 h-9 flex items-center justify-center text-[#b0a89e] hover:text-[#1a1714] transition-colors text-2xl cursor-pointer leading-none"
                >
                    ×
                </button>
            </div>

            {/* Dynamic Workflow Tracker Elements */}
            {!submitted && <StepIndicator current={step}/>}

            {/* Centralized Global Step Error Feedback */}
            {Object.keys(errors || {}).length > 0 && (
                <p className="text-xs text-red-500 font-medium tracking-wide  bg-red-50/50 border border-red-100 rounded-lg p-3 text-center">
                    {Object.values(errors)[0]}
                </p>)}
            {/*{errors && <p className="text-xs text-red-500 text-center">{errors}</p>}*/}

            {/* Context Content Injection Port */}
            <div ref={contentRef} className="flex-1 overflow-y-auto px-8 py-6">

                {submitted ? (
                    <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                        <div
                            className="w-16 h-16 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-400 text-2xl mb-4">✓
                        </div>
                        <h3 className="text-xl text-[#1a1714] mb-2">Thank you, {snapShot?.name}!</h3>
                        <p className="text-sm text-[#7a7068] max-w-sm font-light">Your session has been securely
                            cataloged. A review details summary has been dispatched to {snapShot?.email}.</p>
                    </div>) : (
                    <>
                        {/* STEP 0: Select Service */}
                        {step === 0 && (<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                            {services.map(s => {
                                const isSelected = formData.servicesID === s.id;
                                return (<button
                                    key={s.id}
                                    type="button"
                                    onClick={() => {
                                        setFormData(prev => ({...prev, servicesID: s.id}));
                                        setErrors({});
                                    }}
                                    className={`text-left p-5 border transition-all duration-300 cursor-pointer rounded-xl ${isSelected ? "border-pink-300 bg-pink-50 shadow-sm" : "border-[#e8e3dc] hover:border-pink-200 hover:bg-white bg-transparent"}`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <span className="text-lg text-pink-300">{s.icon}</span>
                                        <span
                                            className="font-serif italic text-xs text-[#1a1714]">{s.price}</span>
                                    </div>
                                    <h4 className="font-serif text-base text-[#1a1714] mb-1">{s.title}</h4>
                                    <p className="text-xs text-[#7a7068] font-light mb-2">{s.description}</p>
                                    <p className="text-[10px] tracking-widest uppercase text-[#b0a89e]">{s.duration}</p>
                                    {isSelected && <div className="mt-3 h-px bg-pink-300 animate-fade-in"/>}
                                </button>);
                            })}
                        </div>)}

                        {/* STEP 1: Select Artist */}
                        {step === 1 && (<div className="flex flex-col gap-3 animate-fade-in">
                            <p className="text-sm text-[#7a7068] font-light mb-1">
                                Select a preferred artist, or choose <span className="italic text-pink-400">No preference</span>.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setFormData(prev => ({...prev, employeeID: null}));
                                    setErrors({});
                                }}
                                className={`text-left px-5 py-4 border transition-all duration-300 cursor-pointer rounded-xl ${formData.employeeID === null ? "border-pink-300 bg-pink-50" : "border-[#e8e3dc] hover:border-pink-200 hover:bg-white bg-transparent"}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-11 h-11 rounded-full bg-[#e8e3dc] flex items-center justify-center text-[#7a7068] text-lg shrink-0">✦
                                    </div>
                                    <div>
                                        <p className="font-serif text-base text-[#1a1714]">No preference</p>
                                        <p className="text-xs text-[#b0a89e] font-light">Best available artist
                                            for your service</p>
                                    </div>
                                    {formData.employeeID === null &&
                                        <div className="ml-auto w-2 h-2 rounded-full bg-pink-300 shrink-0"/>}
                                </div>
                            </button>

                            {employees?.map(a => {
                                const isSelected = formData.employeeID === a.id;
                                return (<button
                                    key={a.id}
                                    type="button"
                                    onClick={() => {
                                        setFormData(prev => ({...prev, employeeID: a.id}));
                                        setErrors({});
                                    }}
                                    className={`text-left px-5 py-4 border transition-all duration-300 cursor-pointer rounded-xl ${isSelected ? "border-pink-300 bg-pink-50" : "border-[#e8e3dc] hover:border-pink-200 hover:bg-white bg-transparent"}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <img src={a.img} alt={a.name}
                                             className="w-11 h-11 rounded-full object-cover shrink-0"/>
                                        <div>
                                            <p className="font-serif text-base text-[#1a1714]">{a.name}</p>
                                            <p className="text-xs text-[#b0a89e] tracking-wide">{a.role}</p>
                                        </div>
                                        {isSelected && <div
                                            className="ml-auto w-2 h-2 rounded-full bg-pink-300 shrink-0"/>}
                                    </div>
                                </button>);
                            })}
                        </div>)}

                        {/* STEP 2: Select Date */}
                        {step === 2 && (<div className="flex flex-col gap-4 animate-fade-in">
                            {formData.employeeID && (<div
                                className="flex items-center gap-3 px-4 py-3 bg-pink-50 border border-pink-100 rounded-xl">
                                {(() => {
                                    const currentArtist = employees?.find(e => e.id === formData.employeeID);
                                    if (!currentArtist) return null;
                                    return (<>
                                        <img src={currentArtist.img} alt={currentArtist.name}
                                             className="w-8 h-8 rounded-full object-cover"/>
                                        <p className="text-xs text-[#7a7068]">Showing available dates
                                            for <span
                                                className="text-[#1a1714] font-medium">{currentArtist.name}</span>
                                        </p>
                                    </>);
                                })()}
                            </div>)}
                            <MiniCalendar
                                selected={formData.date}
                                onSelect={(isoStr) => {
                                    setFormData(prev => ({...prev, date: isoStr}));
                                    setErrors({});
                                }}
                                availableDates={dummyAvailableDates}
                            />
                        </div>)}

                        {/* STEP 3: Select Time */}
                        {step === 3 && (<div className="flex flex-col gap-5 select-none animate-fade-in">
                            <div>
                                <p className="text-[10px] tracking-[0.25em] uppercase text-[#b0a89e] mb-1">Selected
                                    date</p>
                                <p className="font-serif text-base text-[#1a1714]">{friendlyDate}</p>
                            </div>

                            {slots.length === 0 ? (<div
                                className="py-10 text-center border border-dashed border-[#e8e3dc] rounded-xl bg-[#faf9f6]">
                                <p className="text-sm text-[#7a7068] font-light">No slots available for this
                                    date.</p>
                                <button onClick={back} type="button"
                                        className="mt-4 text-xs text-pink-400 underline cursor-pointer hover:text-pink-500">←
                                    Choose a different date
                                </button>
                            </div>) : (<div>
                                <p className="text-[10px] tracking-[0.25em] uppercase text-[#b0a89e] mb-3">Available
                                    times — {slots.length} remaining</p>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {slots.map((t, idx) => {
                                        const isSelected = formData.time === t;
                                        return (<button
                                            key={`${t}-${idx}`}
                                            type="button"
                                            onClick={() => {
                                                setFormData(prev => ({...prev, time: t}));
                                                setErrors({});
                                            }}
                                            className={`py-2.5 text-sm border rounded-lg transition-all duration-200 cursor-pointer tabular-nums text-center ${isSelected ? "border-pink-300 bg-pink-50 text-[#1a1714] font-medium shadow-sm" : "border-[#e8e3dc] text-[#7a7068] hover:border-pink-200 hover:bg-white bg-transparent"}`}
                                        >
                                            {t}
                                        </button>);
                                    })}
                                </div>
                            </div>)}
                        </div>)}

                        {/* STEP 4: Fill Customer Details */}
                        {step === 4 && (<div className="flex flex-col gap-4 animate-fade-in">
                            <Field label="Full Name" required error={errors?.fullName}>
                                <input type="text" placeholder="Your name" value={formData.details.fullName}
                                       onChange={e => setFormData(p => ({
                                           ...p, details: {...p.details, fullName: e.target.value}
                                       }))}
                                       className="w-full border border-[#e8e3dc] bg-white px-4 py-3 text-sm text-[#1a1714] placeholder:text-[#c4bdb5] focus:outline-none focus:border-pink-300 transition-colors rounded-lg"/>
                            </Field>
                            <Field label="Email Address" required error={errors?.email}>
                                <input type="email" placeholder="your@email.com" value={formData.details.email}
                                       onChange={e => setFormData(p => ({
                                           ...p, details: {...p.details, email: e.target.value}
                                       }))}
                                       className="w-full border border-[#e8e3dc] bg-white px-4 py-3 text-sm text-[#1a1714] placeholder:text-[#c4bdb5] focus:outline-none focus:border-pink-300 transition-colors rounded-lg"/>
                            </Field>
                            <Field label="Phone Number" required error={errors?.phone}>
                                <input type="tel" placeholder="+1 (000) 000-0000" value={formData.details.phone}
                                       onChange={e => setFormData(p => ({
                                           ...p, details: {...p.details, phone: e.target.value}
                                       }))}
                                       className="w-full border border-[#e8e3dc] bg-white px-4 py-3 text-sm text-[#1a1714] placeholder:text-[#c4bdb5] focus:outline-none focus:border-pink-300 transition-colors rounded-lg"/>
                            </Field>
                            <Field label="Special Requests">
                                        <textarea rows={3} placeholder="Preferences or notes..."
                                                  value={formData.details.requests} onChange={e => setFormData(p => ({
                                            ...p, details: {...p.details, requests: e.target.value}
                                        }))}
                                                  className="w-full border border-[#e8e3dc] bg-white px-4 py-3 text-sm text-[#1a1714] placeholder:text-[#c4bdb5] focus:outline-none focus:border-pink-300 transition-colors resize-none rounded-lg"/>
                            </Field>
                        </div>)}

                        {/* STEP 5: Confirmation Summary View */}
                        {step === 5 && (<div className="flex flex-col gap-6 animate-fade-in">
                            <p className="text-sm text-[#7a7068] font-light">Review your details before
                                confirming.</p>
                            <div
                                className="bg-white border border-[#e8e3dc] p-6 flex flex-col gap-4 rounded-xl shadow-sm">
                                {(() => {
                                    const serviceInfo = services?.find(s => s.id === formData.servicesID);
                                    const artistInfo = employees?.find(e => e.id === formData.employeeID);
                                    return (<>
                                        <Row label="Service"
                                             value={serviceInfo ? serviceInfo.title : "None chosen"}
                                             sub={serviceInfo?.price}/>
                                        <Row label="Artist"
                                             value={artistInfo ? artistInfo.name : "No preference"}
                                             sub={artistInfo ? artistInfo.role : "Best available"}/>
                                        <Row label="Date" value={formData.date || "None chosen"}/>
                                        <Row label="Time" value={formData.time || "None chosen"}/>
                                        <div className="h-px bg-[#e8e3dc] my-1"/>
                                        <Row label="Name" value={formData.details.fullName || "—"}/>
                                        <Row label="Email" value={formData.details.email || "—"}/>
                                        <Row label="Phone" value={formData.details.phone || "—"}/>
                                        <Row label="Notes"
                                             value={formData.details.requests || "No notes added"}/>
                                    </>);
                                })()}
                            </div>
                            <p className="text-[11px] text-[#b0a89e] leading-relaxed">By confirming you agree to
                                our 24-hour cancellation policy.</p>
                        </div>)}

                    </>)}
            </div>

            {/* Structural Interactive Navigation Footer Layout */}
            {!submitted && (<div
                className="px-8 py-5 border-t border-[#e8e3dc] flex justify-between gap-4 bg-[#fcfbfa] shrink-0">
                <button
                    type="button"
                    disabled={step === 0}
                    onClick={back}
                    className="px-5 py-2.5 text-sm text-[#7a7068] hover:text-[#1a1714] disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
                >
                    Back
                </button>

                {step < STEPS.length - 1 ? (<button
                    type="button"
                    onClick={next}
                    className="px-6 py-2.5 text-sm bg-[#1a1714] text-white rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                    Continue
                </button>) : (<button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="px-6 py-2.5 text-sm bg-pink-400 text-white rounded-xl hover:bg-pink-500 transition-colors cursor-pointer font-medium"
                >
                    Confirm Appointment
                </button>)}
            </div>)}
        </div>
    </div>);
};

export default BookingModal;
