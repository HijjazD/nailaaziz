import NavbarGuest from "../components/NavbarGuest"
import HeroPage from "./HeroPage";
import AboutPage from "./AboutPage";
import ServicesPage from "./ServicesPage";
import Contact_Review from "./Contact_Review";
import Footer from "../components/Footer";




const MainLayout = () => {
  return (
    <div>
        <NavbarGuest/>
        <HeroPage/>
        <AboutPage/>
        <ServicesPage/>
        <Contact_Review/>
        <Footer/>

    </div>
  )
}

export default MainLayout
