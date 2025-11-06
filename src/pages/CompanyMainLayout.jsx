import { Outlet } from "react-router-dom";
import NavbarCompany from "../components/NavbarCompany";

const CompanyMainLayout = () => {
  return (
    <div>
        <NavbarCompany/>
        <Outlet/>
    </div>
  )
}

export default CompanyMainLayout