import {Route, Routes} from "react-router-dom"
import LoginUserPage from "../pages/loginUser/loginUser.page"
import RegisterUserPage from "../pages/registerUser/registerUser.page"

const AllRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<LoginUserPage />}/>
            <Route path="/register" element={<RegisterUserPage />}/>
        </Routes>
    )

}

export default AllRoutes