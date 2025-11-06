import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authstore/authStore.js";
import StackWaveBackground from "../components/StackWaveBackground";

// ✅ Validation schema (fullname, email, phone only)
const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits"),
});

const SignupPage = () => {
  const { signup, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const { name, email, phone } = data;
    const result = await signup({ name, email, phone });

    if (result.success) {
      setServerError(null);
      navigate("/verify-email"); // ✅ You’ll likely send them to verification next
    } else {
      setServerError(result.message);
    }
  };

  return (
    <section
      id="signup"
      className="flex justify-center items-center w-screen h-screen p-5"
    >
      <div className="absolute inset-0 -z-10">
        <StackWaveBackground />
      </div>

      <div className="form_container">
        <div className="form_area">
          <p className="title">SIGN UP</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_group">
              <label className="sub_title" htmlFor="name">
                Name
              </label>
              <input
                placeholder="Enter your name"
                id="name"
                className={`form_style ${errors.fullname ? "error" : ""}`}
                type="text"
                {...register("name")}
              />
              {errors.fullname && (
                <p className="error_message">{errors.fullname.message}</p>
              )}
            </div>

            <div className="form_group">
              <label className="sub_title" htmlFor="email">
                Email
              </label>
              <input
                placeholder="Enter your email"
                id="email"
                className={`form_style ${errors.email ? "error" : ""}`}
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="error_message">{errors.email.message}</p>
              )}
            </div>

            <div className="form_group">
              <label className="sub_title" htmlFor="phone">
                Phone
              </label>
              <input
                placeholder="Enter your phone number"
                id="phone"
                className={`form_style ${errors.phone ? "error" : ""}`}
                type="tel"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="error_message">{errors.phone.message}</p>
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
                    Signing up...
                  </>
                ) : (
                  "SIGN UP"
                )}
              </button>
              <p className="text-center mt-3">
                Have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-indigo-400 hover:underline"
                >
                  Login Here!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;



// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Link, useNavigate } from "react-router-dom";
// import { Loader } from "lucide-react";
// import { useAuthStore } from "../store/authstore/authStore.js";

// // background
// import StackWaveBackground from "../components/StackWaveBackground";

// // ✅ simplified validation schema
// const signupSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .email("Please enter a valid email address"),
// });

// const SignupPage = () => {
//   const { signup, isLoading } = useAuthStore();
//   const navigate = useNavigate();
//   const [serverError, setServerError] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(signupSchema),
//   });

//   const onSubmit = async (data) => {
//     const { email } = data;
//     const result = await signup({ email });

//     if (result.success) {
//       setServerError(null);
//       // navigate to verification code page (if you have one)
//       navigate("/verify-email");
//     } else {
//       setServerError(result.message);
//     }
//   };

//   return (
//     <section
//       id="signup"
//       className="flex justify-center items-center w-screen h-screen p-5"
//     >
//       <div className="absolute inset-0 -z-10">
//         <StackWaveBackground />
//       </div>

//       <div className="form_container">
//         <div className="form_area">
//           <p className="title">SIGN UP</p>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="form_group">
//               <label className="sub_title" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 placeholder="Enter your email"
//                 id="email"
//                 className={`form_style ${errors.email ? "error" : ""}`}
//                 type="email"
//                 {...register("email")}
//               />
//               {errors.email && (
//                 <p className="error_message">{errors.email.message}</p>
//               )}
//             </div>

//             {serverError && (
//               <p className="text-red-500 text-sm text-center mb-3">
//                 {serverError}
//               </p>
//             )}

//             <div>
//               <button
//                 type="submit"
//                 className="btn flex justify-center items-center gap-2"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader className="animate-spin w-5 h-5" />
//                     Sending...
//                   </>
//                 ) : (
//                   "SIGN UP"
//                 )}
//               </button>

//               <p className="text-center mt-3">
//                 Have an account?{" "}
//                 <Link
//                   to={"/login"}
//                   className="text-indigo-400 hover:underline"
//                 >
//                   Login here!
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignupPage;
