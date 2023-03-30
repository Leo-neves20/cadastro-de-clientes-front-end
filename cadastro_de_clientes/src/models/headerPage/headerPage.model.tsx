import { Link, useNavigate } from "react-router-dom"
import Logo from "../../components/logo/logo.components"
import { contextObjAuthorization } from "../../context/authorization.context"
import { Header } from "./style.model"
import {useContext} from "react"

interface iPorpsHeader{
    to: string
    buttonName: string
}



const HeaderPage = ({to, buttonName}: iPorpsHeader) => {
    
    const {setUser} = useContext(contextObjAuthorization)

    const navigate = useNavigate()

    const logout = () => {

        setUser(null)
        localStorage.clear()
        navigate("/", {replace: true})
        
    }

    return(
        <Header>
            <div>
                <Logo />
                {
                    buttonName == "LogOut" ?
                        <Link to={to} onClick={() => logout()} className="button primary">{buttonName}</Link>
                    :
                        <Link to={to} className="button primary">{buttonName}</Link>
                }
            </div>
        </Header>
    )

}

export default HeaderPage