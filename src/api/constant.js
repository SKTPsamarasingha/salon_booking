import {Flame, Gem, Palette, Sparkles} from "lucide-react";

export const navConfig = [
    {to: "/", label: "Home"},
    {to: "/services", label: "Services"},
    {to: "/packages", label: "Packages"},
    {to: "/appointment", label: "Appointment"},
]


export const infoLinks = [
    {label: "Careers", to: "/careers"},
    {label: "FAQ", to: "/faq"},
    {label: "Submit a request", to: "/support"},
    {label: "Contact Us", to: "/contact"}
];

export const employees = [
    {
        id: 1,
        name: "Isabelle Moret",
        role: "Master Colourist",
        bio: "Trained in Lyon and Tokyo. Isabelle's balayage work has been featured in Vogue and Harper's Bazaar.",
        specialty: "Balayage · Colour Correction",
        img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&q=80",
        years: "9 yrs",
        tags: ["hair", "bridal"]
    },
    {
        id: 2,
        name: "Kenji Arao",
        role: "Lead Skin Therapist",
        bio: "Kenji's minimalist skincare philosophy draws from Japanese aesthetics — less intervention, more illumination.",
        specialty: "Hydrafacial · LED Therapy",
        img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=500&q=80",
        years: "7 yrs",
        tags: ["skin", "body"]
    },
    {
        id: 3,
        name: "Sofia Vance",
        role: "Bridal Specialist",
        bio: "Sofia has styled over 300 brides. She believes every wedding look should feel timeless, never trendy.",
        specialty: "Bridal · Upstyles",
        img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80",
        years: "11 yrs",
        tags: ["bridal", "hair", "lash"]
    },
    {
        id: 4,
        name: "Marc Delacroix",
        role: "Precision Cutter",
        bio: "Marc's architectural cuts are known for their clean geometry and effortless movement.",
        specialty: "Precision Cut · Texture",
        img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80",
        years: "6 yrs",
        tags: ["hair", "nails"]
    },
];

export const services = [
    {
        id: 1,
        number: "01",
        title: "Hair Artistry",
        description:
            "From precision cuts to transformative color, our master stylists sculpt and tone every strand to perfection.",
        tags: ["Cut & Style", "Balayage", "Keratin"],
        duration: "60–120 min",
        price: "From $85",
        icon: "✦"
    },
    {
        id: 2,
        number: "02",
        title: "Skin Rituals",
        description:
            "Bespoke facials and advanced skin therapies designed to restore luminosity and reveal your most radiant complexion.",
        tags: ["Hydrafacial", "Peels", "LED Therapy"],
        duration: "45–90 min",
        price: "From $110",
        icon: "◈"
    },
    {
        id: 3,
        number: "03",
        title: "Nail Couture",
        description:
            "Meticulous manicures and pedicures elevated with hand-picked lacquers, gel art, and long-lasting finishes.",
        tags: ["Gel", "Nail Art", "Spa Pedicure"],
        duration: "45–75 min",
        price: "From $55",
        icon: "◇"
    },
    {
        id: 4,
        number: "04",
        title: "Body Sanctuary",
        description:
            "Indulgent body treatments — wraps, scrubs, and massages — that melt away tension and leave skin silken.",
        tags: ["Wraps", "Scrubs", "Massage"],
        duration: "60–120 min",
        price: "From $130",
        icon: "◉"
    },
    {
        id: 5,
        number: "05",
        title: "Bridal Suite",
        description:
            "A curated full-day experience for the bride and her party — flawless hair, makeup, and pampering from dawn to aisle.",
        tags: ["Bridal Hair", "Makeup", "Trial Day"],
        duration: "Full day",
        price: "From $380",
        icon: "◎"
    },
    {
        id: 6,
        number: "06",
        title: "Lash & Brow",
        description:
            "Frame your gaze with expert lash extensions, lifts, and precision brow shaping tailored to your facial architecture.",
        tags: ["Extensions", "Lash Lift", "Brow Tint"],
        duration: "30–90 min",
        price: "From $65",

    },
];

export const packages = [
    {
        id: 1,
        title: 'Bridal Glow Package',
        subtitle: 'Luxury bridal experience',
        duration: '5 Hours',
        price: '$101',
        icon: Gem,
        features: ['Professional Bridal Makeup', 'Luxury Hair Styling', 'Skin Preparation Facial', 'Nail Treatment'],
        popular: true,
    },
    {
        id: 2,
        title: 'Self Care Retreat',
        subtitle: 'Relax and refresh',
        duration: '3 Hours',
        price: '$54',
        icon: Flame,
        features: ['Hair Spa Treatment', 'Hydrating Facial', 'Head Massage', 'Luxury Blow Dry'],
        popular: false,
    },
    {
        id: 3,
        title: 'Color & Style Package',
        subtitle: 'Modern salon transformation',
        duration: '4 Hours',
        price: '$70',
        icon: Palette,
        features: ['Premium Hair Coloring', 'Haircut & Styling', 'Keratin Treatment', 'Professional Finish'],
        popular: false,
    },
    {
        id: 4,
        title: 'Weekend Luxe',
        subtitle: 'Complete beauty refresh',
        duration: '2.5 Hours',
        price: '$35',
        icon: Sparkles,
        features: ['Luxury Wash & Blow Dry', 'Mini Facial', 'Nail Care', 'Eyebrow Styling'],
        popular: false,
    },
];


export const galleryItems = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
        label: "Balayage",
        span: "row-span-2",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
        label: "Skin Ritual",
        span: "",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&q=80",
        label: "Nail Couture",
        span: "",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80",
        label: "Bridal",
        span: "col-span-2",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1634643836960-c345b3c3e998?w=600&q=80",
        label: "Lash & Brow",
        span: "",
    },
];

export const testimonials = [
    {
        id: 1,
        quote: "I've visited salons across Paris, Milan, and New York. None of them came close to the precision and care I received here. Isabelle understood exactly what I didn't even know I wanted.",
        name: "Charlotte W.",
        title: "Fashion Editor",
        initials: "CW",
    },
    {
        id: 2,
        quote: "Kenji's skin ritual changed how I see my reflection. After years of chasing products, I finally found a therapist who listened. My skin has never looked this calm.",
        name: "Priya M.",
        title: "Architect",
        initials: "PM",
    },
    {
        id: 3,
        quote: "Sofia did my bridal hair and my entire party's look on the day. Zero stress. She has this rare ability to make everyone feel like the most beautiful person in the room.",
        name: "Emma R.",
        title: "Bride, Spring 2024",
        initials: "ER",
    },
    {
        id: 4,
        quote: "Marc's cut is the first haircut I've ever received where I didn't feel the need to restyle it the next morning. The structure just falls perfectly — every single day.",
        name: "James T.",
        title: "Creative Director",
        initials: "JT",
    },
];

export const STEPS = ["Service", "Artist", "Date", "Time", "Details", "Confirm"];

export const dummyBookings = [
    {
        id: "BK-1001",
        servicesID: 1,
        employeeID: 1,

        date: "Thursday, June 11, 2026",
        time: "10:30 AM",

        status: "confirmed",

        createdAt: Date.now(),

        details: {
            fullName: "Emma Wilson",
            email: "emma@example.com",
            phone: "+94 77 123 4567",
            requests: "Soft curls and natural finish",
        },
    },

    {
        id: "BK-1002",
        servicesID: 2,
        employeeID: 2,

        date: "Friday, June 12, 2026",
        time: "01:00 PM",

        status: "pending",

        createdAt: Date.now(),

        details: {
            fullName: "Sophia Brown",
            email: "sophia@example.com",
            phone: "+94 71 987 6543",
            requests: "Prefer organic products",
        },
    },

    {
        id: "BK-1003",
        servicesID: 3,
        employeeID: null,

        date: "Saturday, June 13, 2026",
        time: "04:00 PM",

        status: "completed",

        createdAt: Date.now(),

        details: {
            fullName: "Olivia Taylor",
            email: "olivia@example.com",
            phone: "+94 76 222 1111",
            requests: "",
        },
    },

    {
        id: "BK-1004",
        servicesID: 4,
        employeeID: 3,

        date: "Sunday, June 14, 2026",
        time: "11:00 AM",

        status: "cancelled",

        createdAt: Date.now(),

        details: {
            fullName: "Charlotte Davis",
            email: "charlotte@example.com",
            phone: "+94 75 444 8888",
            requests: "Need bridal consultation before session",
        },
    },
];