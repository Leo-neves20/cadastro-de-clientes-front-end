import { useContext} from "react"
import {Outlet, Navigate} from "react-router-dom"
import {contextObjAuthorization} from "../context/authorization.context"

const VerifyTokenAcess = () => {

    const {user} = useContext(contextObjAuthorization)

    return user ? <Outlet /> : <Navigate to={"/"} replace={true} /> 

}

export default VerifyTokenAcess