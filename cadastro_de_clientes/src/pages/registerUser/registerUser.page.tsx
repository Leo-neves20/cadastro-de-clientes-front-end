import {RegisterUserPageMain} from "./style.page"
import FormRegister from "../../models/formRegisterUser/formRegister.model"
import HeaderPage from "../../models/headerPage/headerPage.model"

const RegisterUserPage = () => {

    return (
        <>
            <HeaderPage to="/" buttonName="Login" />
            
            <RegisterUserPageMain>
                <FormRegister />
            </RegisterUserPageMain>
        </>
    )
}

export default RegisterUserPage