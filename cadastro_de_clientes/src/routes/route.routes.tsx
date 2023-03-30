import {Route, Routes} from "react-router-dom"
import DashUserPage from "../pages/dashboard/dashUser.pages"
import LoginUserPage from "../pages/loginUser/loginUser.page"
import RegisterUserPage from "../pages/registerUser/registerUser.page"
import VerifyTokenAcess from "./verifyTokenAcess.routes"

const AllRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<LoginUserPage />}/>
            <Route path="/register" element={<RegisterUserPage />}/>
            <Route element={<VerifyTokenAcess />}>
                <Route path="/dashboard" element={<DashUserPage />} />
            </Route>
        </Routes>
    )

}

export default AllRoutes