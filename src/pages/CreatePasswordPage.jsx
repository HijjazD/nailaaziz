import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import StackWaveBackground from "../components/StackWaveBackground";
import { useAuthStore } from "../store/authstore/authStore.js";

// ✅ Simple password validation (only required + must match)
const passwordSchema = z
  .object({
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const CreatePasswordPage = () => {
  const navigate = useNavigate();
  const { createPassword, isLoading } = useAuthStore(); // will call backend later
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    const { password } = data;

    const result = await createPassword({ password });

    if (result.success) {
      setServerError(null);
      navigate("/client/dashboard");
    } else {
      setServerError(result.message);
    }
  };

  return (
    <section
      id="create-password"
      className="flex justify-center items-center w-screen h-screen p-5"
    >
      <div className="absolute inset-0 -z-10">
        <StackWaveBackground />
      </div>

      <div className="form_container">
        <div className="form_area">
          <p className="title">CREATE PASSWORD</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_group">
              <label className="sub_title" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className={`form_style ${errors.password ? "error" : ""}`}
                {...register("password")}
              />
              {errors.password && (
                <p className="error_message">{errors.password.message}</p>
              )}
            </div>

            <div className="form_group">
              <label className="sub_title" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className={`form_style ${
                  errors.confirmPassword ? "error" : ""
                }`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="error_message">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="text-red-500 text-sm text-center mb-3">
                {serverError}
              </p>
            )}

            <div>
              <button
                type="submit"
                className="btn flex justify-center items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin w-5 h-5" />
                    Creating...
                  </>
                ) : (
                  "CREATE PASSWORD"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreatePasswordPage;
