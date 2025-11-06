import { Outlet } from "react-router-dom";
import NavbarUser from '../components/NavbarUser'



const ClientMainLayout = () => {
  return (
    <div>
        <NavbarUser/>
        <Outlet/>
    </div>
  )
}

export default ClientMainLayout