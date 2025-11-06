import { useState, useRef } from "react";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authstore/authStore.js";
import StackWaveBackground from "../components/StackWaveBackground";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const { verifyToken, isLoading } = useAuthStore(); // assuming you have verifyToken in your store
  const [serverError, setServerError] = useState(null);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // auto-focus next input
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const joinedCode = code.join("");
    if (joinedCode.length !== 6) {
      setServerError("Please enter the 6-digit code.");
      return;
    }

    const result = await verifyToken({ code: joinedCode });

    if (result.success) {
      setServerError(null);
      navigate("/create-password");
    } else {
      setServerError(result.message || "Invalid or expired code.");
    }
  };

  return (
    <section
      id="verify"
      className="flex justify-center items-center w-screen h-screen p-5"
    >
      <div className="absolute inset-0 -z-10">
        <StackWaveBackground />
      </div>

      <div className="form_container">
        <div className="form_area">
          <p className="title">VERIFY EMAIL</p>

          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <label className="sub_title">Enter 6-digit code</label>
              <div className="flex justify-center gap-2 mt-2">
                {code.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    ref={(el) => (inputsRef.current[i] = el)}
                    className="code_input"
                  />
                ))}
              </div>
            </div>

            {serverError && (
              <p className="text-red-500 text-sm text-center mb-3">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              className="btn flex justify-center items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin w-5 h-5" />
                  Verifying...
                </>
              ) : (
                "VERIFY"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmailVerificationPage;
