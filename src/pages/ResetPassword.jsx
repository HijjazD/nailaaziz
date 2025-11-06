import React, { useState } from "react";
import StackWaveBackground from "../components/StackWaveBackground.jsx";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authstore/authStore.js";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const { token } = useParams(); // ✅ get reset token from URL
  const navigate = useNavigate();
  const { resetPassword, isLoading, error } = useAuthStore(); // ✅ Zustand store

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [serverMessage, setServerMessage] = useState("");

  const onSubmit = async (data) => {
    setServerMessage("");

    const result = await resetPassword(token, data.password);

    if (result.success) {
      setServerMessage(result.message);
      // wait briefly then navigate
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setServerMessage(result.message);
    }
  };

  return (
    <section
      id="reset-password"
      className="flex justify-center items-center w-screen h-screen p-5"
    >
      <div className="absolute inset-0 -z-10">
        <StackWaveBackground />
      </div>

      <div className="form_container">
        <div className="form_area">
          <p className="title">Reset Password</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* New Password */}
            <div className="form_group">
              <label className="sub_title" htmlFor="password">
                New Password
              </label>
              <input
                placeholder="Enter your new password"
                id="password"
                type="password"
                className={`form_style ${errors.password ? "error" : ""}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="error_message">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form_group">
              <label className="sub_title" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                placeholder="Confirm your new password"
                id="confirmPassword"
                type="password"
                className={`form_style ${
                  errors.confirmPassword ? "error" : ""
                }`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") ||
                    "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="error_message">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Server messages */}
            {serverMessage && (
              <p
                className={`text-sm text-center mb-3 ${
                  serverMessage.toLowerCase().includes("fail") ||
                  serverMessage.toLowerCase().includes("invalid")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {serverMessage}
              </p>
            )}

            {error && (
              <p className="text-red-500 text-sm text-center mb-3">{error}</p>
            )}

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="btn flex justify-center items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin w-5 h-5" />
                    Resetting...
                  </>
                ) : (
                  "RESET PASSWORD"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
