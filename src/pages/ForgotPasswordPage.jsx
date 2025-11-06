import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import StackWaveBackground from "../components/StackWaveBackground.jsx";
import { useAuthStore } from "../store/authstore/authStore.js";

const ForgotPasswordPage = () => {
  const { forgotPassword, isLoading, error } = useAuthStore(); // ✅ pull from store
  const [message, setMessage] = useState(null); // for success message

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setMessage(null); // reset old message
    const result = await forgotPassword(data.email);

    if (result.success) {
      setMessage(result.message);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <section
      id="forgot-password"
      className="flex justify-center items-center w-screen h-screen p-5"
    >
      <div className="absolute inset-0 -z-10">
        <StackWaveBackground />
      </div>

      <div className="form_container">
        <div className="form_area">
          <p className="title">Forgot Password</p>
          <p className="text-sm text-gray-400 text-center mb-5">
            Enter your registered email and we’ll send you a reset link.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_group">
              <label className="sub_title" htmlFor="email">
                Email
              </label>
              <input
                placeholder="Enter your email"
                id="email"
                className={`form_style ${errors.email ? "error" : ""}`}
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="error_message">{errors.email.message}</p>
              )}
            </div>

            {/* ✅ Show backend response (error or success) */}
            {message && (
              <p
                className={`text-sm mt-2 text-center ${
                  message.toLowerCase().includes("fail") ||
                  message.toLowerCase().includes("invalid")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {message}
              </p>
            )}

            {error && (
              <p className="text-sm text-red-500 text-center mt-2">{error}</p>
            )}

            <button
              type="submit"
              className="btn flex justify-center items-center gap-2 mt-5"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin w-5 h-5" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <p className="text-center mt-3">
              Remember your password?{" "}
              <Link to="/login" className="text-indigo-400 hover:underline">
                Login Here!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
