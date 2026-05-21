import {z} from "zod";

// 1. The Single Source of Truth Schema
export const bookingFormSchema = z.object({
    servicesID: z
        .number()
        .nullable()
        .refine((val) => val !== null, {
            message: "Please select a service to continue.",
        }), employeeID: z.number().nullable(), // null means "No preference"
    date: z.string().min(1, "Please choose a booking date."),
    time: z.string().min(1, "Please pick a time slot."),
    details: z.object({
        fullName: z.string().trim().min(1, "Full name is required."),
        email: z.string().trim().min(1, "Email is required.").email("Invalid email format."),
        phone: z.string().min(5, "Valid phone number is required."), // Assuming string for formatting
        requests: z.string().optional(),
    }),
});

// 2. Map your steps directly to partial schemas
export const BOOKING_STEPS = [
    {
        id: "Service",
        schema: bookingFormSchema.pick({servicesID: true})
    },
    {
        id: "Artist",
        schema: bookingFormSchema.pick({employeeID: true})
    },
    {
        id: "Date",
        schema: bookingFormSchema.pick({date: true})
    },
    {
        id: "Time",
        schema: bookingFormSchema.pick({time: true})
    },
    {
        id: "Details",
        schema: bookingFormSchema.pick({details: true})
    },
    {
        id: "Confirm",
        schema: z.object({})
    },
];
