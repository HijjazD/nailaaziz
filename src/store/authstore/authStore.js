import { create } from 'zustand'
import axios from 'axios'
import { getToken, saveToken, saveUser } from '../../util/jwtToken'
import { jwtDecode } from 'jwt-decode'

const dev_api_url = 'http://localhost:4000'
const prod_api_url = 'https://xenial-edyth-spakaknel-65446e30.koyeb.app'

const AUTH_HEADER = "authorization";



export const useAuthStore = create((set, get) => ({
    isLoading: false,
    error: null,
    verifiedEmail: null,
    isAuthenticated: false,
    user: null,

    signup: async(signupData) => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.post(
                `${prod_api_url}/signup`,
                signupData,
                {
                    headers: { "Content-Type": "application/json", "Accept": "application/json"},
                }
            )
            set({isLoading:false})
            console.log("response data", response.data)
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Signup error:", error);
            const errMsg =
            error.response?.data?.message ||
            error.response?.data ||
            "Something went wrong during signup.";
            console.log(errMsg)
            set({ isLoading: false, error: errMsg });
            return { success: false, message: errMsg };
        }
    },

    verifyToken: async ({ code }) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(
                `${prod_api_url}/verify-token`,
                { code },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

                // if the backend returns a 200 OK with verified true
            if (response.data.verified) {
                set({
                    isLoading: false,
                    verifiedEmail: response.data.email, // <- make sure backend returns this
                });

                return {
                    success: true,
                    message: response.data.message,
                    email: response.data.email,
                };
            } else {
                // handles cases where verified is false but 200 returned
                set({ isLoading: false });
                return { success: false, message: response.data.message || "Invalid or expired verification code." };
            }
        } catch (error) {
            console.error("Verification error:", error);

            const errMsg =
            error.response?.data?.message ||
            "Invalid or expired verification code.";

            set({ isLoading: false, error: errMsg });
            return { success: false, message: errMsg };
        }
    },

    createPassword: async ({ password }) => {
        set({ isLoading: true, error: null });

        try {
        // 👇 get the verified email from the state
        const email = get().verifiedEmail;

        const response = await axios.post(
            `${prod_api_url}/create-password`, 
            {
                email,
                password,
            },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true, // important for cookie-based auth
            }
        );

        set({ isLoading: false });
        return { success: true, message: response.data.message };
        } catch (error) {
        const errMsg =
            error.response?.data?.message || "Failed to create password.";
        set({ isLoading: false, error: errMsg });
        return { success: false, message: errMsg };
        }
    },


    login: async (loginData) => {
        set({ isLoading: true, error: null });
        try {
            const loginPayload = {
                username: loginData.email,
                password: loginData.password,
            };

            const response = await axios.post(
                `${prod_api_url}/login`,
                loginPayload,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true, // important for cookie-based auth
                }
            );

            // ✅ Save user info returned by backend
            saveUser(response.data);

            // ✅ Return role for frontend navigation
            set({ isLoading: false });
            return response.data;
        } catch (error) {
            console.error("Login error:", error);

            // 🧠 Try to capture backend message if available
            const errMsg =
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Incorrect email or password.";

            set({ isLoading: false, error: errMsg });

            // ❌ Return null so frontend knows login failed
            return null;
        }
    },

    logout: async() => {
        try {
            const response = await axios.post(
                `${prod_api_url}/logout`,
                {},
                { withCredentials: true }
            )
        } catch (error) {
            console.error("Logout error:", error);
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(
                `${prod_api_url}/forgot-password`,
                { email },
                {
                    headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    },
                }
            );

            set({ isLoading: false });
            return {
                success: true,
                message:
                    response.data?.message ||
                    "Password reset email sent successfully. Please check your inbox.",
            };
        } catch (error) {
            console.error("Forgot password error:", error);

            const errMsg =
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to send password reset email.";

            set({ isLoading: false, error: errMsg });
            return { success: false, message: errMsg };
        }
    },

    resetPassword: async (token, newPassword) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(
            `${prod_api_url}/reset-password/${token}`,
            { newPassword },
            {
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                },
            }
            );

            set({ isLoading: false });
            return {
            success: true,
            message: response.data?.message || "Password has been reset successfully.",
            };
        } catch (error) {
            console.error("Reset password error:", error);

            const errMsg =
            error.response?.data?.message ||
            error.response?.data ||
            "Failed to reset password.";

            set({ isLoading: false, error: errMsg });
            return { success: false, message: errMsg };
        }
    },

    checkAuth: async () => {
        try {
            const response = await axios.get(`${prod_api_url}/check-auth`, {
                withCredentials: true, // important: allows sending the JWT cookie
            });

            // If the response is 200 (authenticated)
            const { username, role } = response.data;

            set({
                isAuthenticated: true,
                user: {
                    username,
                    role,
                },
            });

            return {
                authenticated: true,
                username,
                role,
            };
        } catch (error) {
            // If 401 or any error → user not logged in
            console.error("Auth check failed:", error.response?.data || error.message);

            set({
                isAuthenticated: false,
                user: null,
            });

            return { authenticated: false };
        }
    },

}))
