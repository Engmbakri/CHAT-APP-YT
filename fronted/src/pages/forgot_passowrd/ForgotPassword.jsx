import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Make a request to the backend to send a password reset link
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            toast.success("Password reset link sent to your email.");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Forgot Password
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Email</span>
                        </label>
                        <input
                            type='email'
                            placeholder='Enter your email'
                            className='w-full input input-bordered h-10'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        className='btn btn-block btn-sm mt-4 border border-slate-700'
                        type='submit'
                    >
                        Send Password Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
