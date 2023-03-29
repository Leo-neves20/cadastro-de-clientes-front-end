import Logo from "../../components/logo/logo.components"
import FormLogin from "../../models/formLoginUser/loginUser.model"
import { LoginUserPageHeader, LoginUserPageMain } from "./style.page"

const LoginUserPage = () => {

    return(
        <>
            <LoginUserPageHeader>
                <div>
                    <Logo />
                    <button className="button primary">Cadastro</button>
                </div>
            </LoginUserPageHeader>
            <LoginUserPageMain>
                <FormLogin />
            </LoginUserPageMain>
        </>
    )

}

export default LoginUserPage