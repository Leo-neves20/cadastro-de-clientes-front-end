import { useState } from "react"
import {Outlet, Navigate} from "react-router-dom"

const VerifyTokenAcess = () => {

    const [user, setUser] = useState()
   
    return user ? <Outlet /> : <Navigate to={"/"} replace={true} /> 

}

export default VerifyTokenAcess