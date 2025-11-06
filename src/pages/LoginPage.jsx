import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from "react-router-dom";
import {useAuthStore} from '../store/authstore/authStore.js'

import StackWaveBackground from '../components/StackWaveBackground.jsx';

// Define validation schema
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
})

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    console.log(data)
    const result = await login(data);
    if (!result) return

    if (result.role === "CLIENT") {
      navigate("/client/dashboard")
    } else if (result.role === "COMPANY") {
      navigate("/company/dashboard")
    } else {
      console.error("Unknown role")
    }
  };

  return (
    <section id='login' className='flex justify-center items-center w-screen h-screen p-5'>
      <div className="absolute inset-0 -z-10">
        <StackWaveBackground />
      </div>
      <div className="form_container">
        <div className="form_area">
          <p className="title">LOGIN</p>
          <div>
            <div className="form_group">
              <label className="sub_title" htmlFor="email">Email</label>
              <input 
                placeholder="Enter your email" 
                id="email" 
                className={`form_style ${errors.email ? 'error' : ''}`}
                type="email"
                {...register('email')}
              />
              {errors.email && <p className="error_message">{errors.email.message}</p>}
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="password">Password</label>
              <input 
                placeholder="Enter your password" 
                id="password" 
                className={`form_style ${errors.password ? 'error' : ''}`}
                type="password"
                {...register('password')}
              />
              {errors.password && <p className="error_message">{errors.password.message}</p>}
            </div>

            <div>
              <button 
                className="btn flex items-center justify-center gap-2" 
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 018 8h-4l3.5 3.5L20 12h-4a8 8 0 01-8 8v-4l-3.5 3.5L4 20v-4z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  'LOGIN'
                )}
              </button>
              {error && <p className="text-red-500 text-center mt-3">{error}</p>}
              <p>Don't have an Account? <Link to={"/signup"} className="text-indigo-400 hover:underline">Sign Up Here!</Link></p>
              <p>Forgot Password? <Link to={"/forgot-password"} className="text-indigo-400 hover:underline">Create new password</Link></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage