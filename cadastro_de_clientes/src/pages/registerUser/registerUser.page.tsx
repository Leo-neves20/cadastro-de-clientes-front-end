import Logo from "../../components/logo/logo.components"
import {RegisterUserPageHeader, RegisterUserPageMain} from "./style.page"
import { Link } from "react-router-dom"
import FormRegister from "../../models/formRegisterUser/formRegister"

const RegisterUserPage = () => {

    return (
        <>
            <RegisterUserPageHeader>
                <div>
                    <Logo />
                    <button className="button primary">Login</button>
                </div>
            </RegisterUserPageHeader>
            <RegisterUserPageMain>
                <FormRegister />
            </RegisterUserPageMain>
        </>
    )
}

export default RegisterUserPage