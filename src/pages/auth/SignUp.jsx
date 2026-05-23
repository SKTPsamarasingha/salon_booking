import {Link} from "react-router-dom";
import {
    User2,
    Mail,
    Phone,
    Lock,
} from "lucide-react";

const SignUp = () => {
    return (
        <section className="mt-10 min-h-screen bg-[#f8f5f0] flex items-center justify-center px-2 py-6 md:py-10">

            {/* Changed from h-[45rem] to h-auto and added responsive max-w-sm on smaller laptops */}
            <div
                className="w-full max-w-sm md:max-w-md bg-white border border-[#e8e3dc] rounded-3xl shadow-sm overflow-hidden my-auto">

                {/* Top - Reduced top/bottom padding */}
                <div className="px-6 py-6 md:px-8 md:pt-8 md:pb-6 text-center border-b border-[#f1ece6]">
                    <h1 className="text-2xl md:text-3xl font-serif text-[#1a1714] mb-1.5">
                        Create Account
                    </h1>
                    <p className="text-xs md:text-sm text-[#7a7068] font-light">
                        Join to book and manage appointments.
                    </p>
                </div>

                {/* Form - Reduced padding from p-8 to p-6 */}
                <div className="p-6 md:p-8">
                    <form className="flex flex-col gap-4 md:gap-5">

                        {/* Full Name */}
                        <div>
                            <label
                                className="text-[10px] uppercase tracking-[0.2em] text-[#b0a89e] mb-1.5 block font-medium">
                                Full Name
                            </label>
                            {/* Scaled down input height from h-[54px] to h-[46px] */}
                            <div
                                className="h-[46px] border border-[#e8e3dc] rounded-xl px-4 flex items-center gap-3 focus-within:border-[#1a1714] transition-colors">
                                <User2 size={16} className="text-pink-400 shrink-0"/>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full h-full bg-transparent outline-none text-xs md:text-sm text-[#1a1714] placeholder:text-[#b0a89e]"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                className="text-[10px] uppercase tracking-[0.2em] text-[#b0a89e] mb-1.5 block font-medium">
                                Email Address
                            </label>
                            <div
                                className="h-[46px] border border-[#e8e3dc] rounded-xl px-4 flex items-center gap-3 focus-within:border-[#1a1714] transition-colors">
                                <Mail size={16} className="text-pink-400 shrink-0"/>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full h-full bg-transparent outline-none text-xs md:text-sm text-[#1a1714] placeholder:text-[#b0a89e]"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                className="text-[10px] uppercase tracking-[0.2em] text-[#b0a89e] mb-1.5 block font-medium">
                                Phone Number
                            </label>
                            <div
                                className="h-[46px] border border-[#e8e3dc] rounded-xl px-4 flex items-center gap-3 focus-within:border-[#1a1714] transition-colors">
                                <Phone size={16} className="text-pink-400 shrink-0"/>
                                <input
                                    type="tel"
                                    placeholder="+94 77 123 4567"
                                    className="w-full h-full bg-transparent outline-none text-xs md:text-sm text-[#1a1714] placeholder:text-[#b0a89e]"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                className="text-[10px] uppercase tracking-[0.2em] text-[#b0a89e] mb-1.5 block font-medium">
                                Password
                            </label>
                            <div
                                className="h-[46px] border border-[#e8e3dc] rounded-xl px-4 flex items-center gap-3 focus-within:border-[#1a1714] transition-colors">
                                <Lock size={16} className="text-pink-400 shrink-0"/>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full h-full bg-transparent outline-none text-xs md:text-sm text-[#1a1714] placeholder:text-[#b0a89e]"
                                />
                            </div>
                        </div>

                        {/* Submit - Scaled button down proportionally */}
                        <button
                            type="submit"
                            className="h-[46px] bg-[#1a1714] text-white rounded-xl hover:bg-black transition-all text-xs md:text-sm font-medium tracking-wide cursor-pointer mt-2 shadow-xs"
                        >
                            Create Account
                        </button>

                    </form>

                    {/* Bottom */}
                    <div className="mt-5 md:mt-6 text-center">
                        <p className="text-xs md:text-sm text-[#7a7068]">
                            Already have an account?{" "}
                            <Link
                                to="/signin"
                                className="text-pink-400 hover:text-pink-500 font-medium transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default SignUp;
