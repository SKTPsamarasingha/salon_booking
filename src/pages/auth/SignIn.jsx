import {Link} from "react-router-dom";
import {Mail, Lock} from "lucide-react";

const SignIn = () => {
    return (
        <section className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4 py-8 md:py-12">

            {/* Structured with identical max-w sizing limits */}
            <div
                className="w-full max-w-sm md:max-w-md bg-white border border-[#e8e3dc] rounded-3xl shadow-sm overflow-hidden my-auto">

                {/* Top - Reduced top/bottom padding to match SignUp */}
                <div className="px-6 py-6 md:px-8 md:pt-8 md:pb-6 text-center border-b border-[#f1ece6]">
                    <h1 className="text-2xl md:text-3xl font-serif text-[#1a1714] mb-1.5">
                        Welcome Back
                    </h1>
                    <p className="text-xs md:text-sm text-[#7a7068] font-light">
                        Sign in to manage your appointments.
                    </p>
                </div>

                {/* Form - Compressed layout padding to match exactly */}
                <div className="p-6 md:p-8">
                    <form className="flex flex-col gap-4 md:gap-5">

                        {/* Email */}
                        <div>
                            <label
                                className="text-[10px] uppercase tracking-[0.2em] text-[#b0a89e] mb-1.5 block font-medium">
                                Email Address
                            </label>
                            {/* Unified field tracks downscaled to h-[46px] */}
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

                        {/* Forgot Password Link Element */}
                        <div className="flex justify-end -mt-1">
                            <button
                                type="button"
                                className="text-[11px] md:text-xs text-pink-400 hover:text-pink-500 font-medium transition-colors cursor-pointer"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="h-[46px] bg-[#1a1714] text-white rounded-xl hover:bg-black transition-all text-xs md:text-sm font-medium tracking-wide cursor-pointer mt-1 shadow-xs"
                        >
                            Sign In
                        </button>

                    </form>

                    {/* Bottom Identity Block Linkage */}
                    <div className="mt-5 md:mt-6 text-center">
                        <p className="text-xs md:text-sm text-[#7a7068]">
                            Don’t have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-pink-400 hover:text-pink-500 font-medium transition-colors"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default SignIn;
