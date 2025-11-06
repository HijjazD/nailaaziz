import NavbarGuest from "../components/NavbarGuest"
import HeroPage from "./HeroPage";
import AboutPage from "./AboutPage";
import ServicesPage from "./ServicesPage";
import Contact_Review from "./Contact_Review";
import Tryhard from "./Tryhard";


import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
        <NavbarGuest/>
        <HeroPage/>
        <AboutPage/>
        <ServicesPage/>
        <Contact_Review/>
        <div className="w-screen h-screen bg-black"></div>

    </div>
  )
}

export default MainLayout