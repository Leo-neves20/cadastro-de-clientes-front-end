import { Link } from "react-router-dom"
import Logo from "../../components/logo/logo.components"
import FormLogin from "../../models/formLoginUser/loginUser.model"
import { LoginUserPageHeader, LoginUserPageMain } from "./style.page"

const LoginUserPage = () => {

    return(
        <>
            <LoginUserPageHeader>
                <div>
                    <Logo />
                    <Link to={"/register"} className="button primary">Cadastro</Link>
                </div>
            </LoginUserPageHeader>
            <LoginUserPageMain>
                <FormLogin />
            </LoginUserPageMain>
        </>
    )

}

export default LoginUserPage