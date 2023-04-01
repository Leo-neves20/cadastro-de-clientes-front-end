import {Outlet, Navigate} from "react-router-dom"

const VerifyTokenAcess = () => {

    const token = localStorage.getItem("@Token:")

    return token ? <Outlet /> : <Navigate to="/" replace={true} /> 

}

export default VerifyTokenAcess