import Logo from "../../components/logo/logo.components"
import {RegisterUserPageHeader, RegisterUserPageMain} from "./style.page"
import { Link } from "react-router-dom"
import FormRegister from "../../models/formRegisterUser/formRegister.model"

const RegisterUserPage = () => {

    return (
        <>
            <RegisterUserPageHeader>
                <div>
                    <Logo />
                    <Link to={"/"} className="button primary">Login</Link>
                </div>
            </RegisterUserPageHeader>
            <RegisterUserPageMain>
                <FormRegister />
            </RegisterUserPageMain>
        </>
    )
}

export default RegisterUserPage