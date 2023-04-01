import FormLogin from "../../models/formLoginUser/loginUser.model"
import HeaderPage from "../../models/headerPage/headerPage.model"
import { LoginUserPageMain } from "./style.page"
import {Navigate} from "react-router-dom"

const LoginUserPage = () => {

    const token = localStorage.getItem("@Token:")

    return !token ? (
        <>
            <HeaderPage to="/register"  buttonName="Cadastro"/>

            <LoginUserPageMain>
                <FormLogin />
            </LoginUserPageMain>
        </>
    )
    :
    <Navigate to="/dashboard" replace/>
    
}

export default LoginUserPage