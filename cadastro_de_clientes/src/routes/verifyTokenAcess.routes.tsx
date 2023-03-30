import { useContext} from "react"
import {Outlet, Navigate} from "react-router-dom"
import {contextObjAuthorization} from "../context/authorization.context"

const VerifyTokenAcess = () => {

    const token = localStorage.getItem("@Token:")

    return token ? <Outlet /> : <Navigate to="/" replace={true} /> 

}

export default VerifyTokenAcess