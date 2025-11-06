import { useEffect } from 'react';

//pages
import MainLayout from './pages/MainLayout';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/ClientDashboard'
import ClientMainLayout from './pages/ClientMainLayout';
import CompanyMainLayout from './pages/CompanyMainLayout';
import ClientBookings from './components/ClientBookings';
import CompanyDashboard from './pages/CompanyDashboard';
import EmailVerificationPage from './pages/EmailVerificationPage';

//gsap
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all'


//Routing
import { Routes, Route, Navigate } from "react-router-dom"


//jwt
import { isClientLoggedIn } from './util/jwtToken';


//util
import ProtectedRoute from './util/ProtectedRoute';
import CreatePasswordPage from './pages/CreatePasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPassword';


//store
import {useAuthStore} from './store/authstore/authStore';



//registerplugin
gsap.registerPlugin(ScrollTrigger);



const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticated, user } = useAuthStore() 
    if (isAuthenticated && user) {
      if (user.role === "CLIENT") {
        return <Navigate to="/client/dashboard" replace />;
      } else if (user.role === "COMPANY") {
        return <Navigate to="/company/dashboard" replace />;
      }
    }


    return children;
}

const App = () => {
  const {checkAuth} = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <main>
      <Routes>
        <Route path="/" element={<MainLayout />}/>


        <Route path="/signup" element={
          <SignupPage/>
        }
        />

        <Route path="/verify-email" element={
          <EmailVerificationPage/>
        }
        />

        <Route path="/create-password" element={
          <CreatePasswordPage/>
        }
        />

        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route path="/forgot-password" element={
          <ForgotPasswordPage/>
        }
        />

        <Route path="/reset-password/:token" element={
          <ResetPasswordPage/>
        }
        />

        <Route path='/client/dashboard' 
          element={
            <ProtectedRoute allowedRoles={["CLIENT"]}>
              <ClientMainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ClientDashboard />} />
          <Route path="mybookings" element={<ClientBookings />} />  
        </Route>

        <Route path='/company/dashboard' 
          element={
            <ProtectedRoute allowedRoles={["COMPANY"]}>
              <CompanyMainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CompanyDashboard/>}/>
        </Route>
      </Routes>

    </main>
  )
}

export default App