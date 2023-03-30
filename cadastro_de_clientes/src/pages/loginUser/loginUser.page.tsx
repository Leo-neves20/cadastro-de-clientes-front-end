import FormLogin from "../../models/formLoginUser/loginUser.model"
import HeaderPage from "../../models/headerPage/headerPage.model"
import { LoginUserPageMain } from "./style.page"
import {Navigate, useNavigate} from "react-router-dom"
import {useContext, useEffect} from "react"
import { contextObjAuthorization } from "../../context/authorization.context"
import instance from "../../service/axios.service"

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