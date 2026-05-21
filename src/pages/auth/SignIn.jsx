import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const SignIn = () => {
    return (
        <section className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4 py-10 mt-8">

            <div className="w-full max-w-md bg-white border border-[#e8e3dc] rounded-3xl shadow-sm overflow-hidden">

                {/* Top */}
                <div className="px-8 pt-10 pb-8 text-center border-b border-[#f1ece6]">
                    <h1 className="text-4xl font-serif text-[#1a1714] mb-3">
                        Welcome Back
                    </h1>

                    <p className="text-sm text-[#7a7068] font-light">
                        Sign in to manage your appointments.
                    </p>

                </div>

                {/* Form */}
                <div className="p-8">

                    <form className="flex flex-col gap-5">

                        {/* Email */}
                        <div>

                            <label className="text-xs uppercase tracking-[0.2em] text-[#b0a89e] mb-3 block">
                                Email Address
                            </label>

                            <div className="h-[54px] border border-[#e8e3dc] rounded-2xl px-4 flex items-center gap-3">

                                <Mail size={18} className="text-pink-400" />

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full h-full bg-transparent outline-none text-sm text-[#1a1714] placeholder:text-[#b0a89e]"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label className="text-xs uppercase tracking-[0.2em] text-[#b0a89e] mb-3 block">
                                Password
                            </label>

                            <div className="h-[54px] border border-[#e8e3dc] rounded-2xl px-4 flex items-center gap-3">

                                <Lock size={18} className="text-pink-400" />

                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full h-full bg-transparent outline-none text-sm text-[#1a1714] placeholder:text-[#b0a89e]"
                                />

                            </div>

                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">

                            <button
                                type="button"
                                className="text-sm text-pink-400 hover:text-pink-500 transition"
                            >
                                Forgot Password?
                            </button>

                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="h-[54px] bg-[#1a1714] text-white rounded-2xl hover:bg-black transition-all text-sm"
                        >
                            Sign In
                        </button>

                    </form>

                    {/* Bottom */}
                    <div className="mt-8 text-center">

                        <p className="text-sm text-[#7a7068]">

                            Don’t have an account?{" "}

                            <Link
                                to="/signup"
                                className="text-pink-400 hover:text-pink-500"
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