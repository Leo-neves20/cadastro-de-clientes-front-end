import { createContext } from "react"
import { 
    iChildren, 
    iUserDataRequest, 
    iUserDataResponse, 
    iUserLoginData 
} from "../interface/user.interface"
import { toast } from "react-toastify";
import axios from "axios";
import instance from "../service/axios.service"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface iContextInterface{
    loginRequest(loginData: iUserLoginData): void
    registerRequest(registerData: iUserDataRequest): void
    user: iUserDataResponse | null
    setUser: React.Dispatch<React.SetStateAction<iUserDataResponse | null>>
}

export const contextObjAuthorization = createContext({} as iContextInterface)

const AuthorizationContext = ({children}: iChildren) => {

    const [user, setUser] = useState<iUserDataResponse | null>(null)

    const navigate = useNavigate()

    const loginRequest = async (loginData: iUserLoginData) => {

        try {
            
            const response = await instance.post("/api/login", loginData)

            localStorage.setItem("@Token:", response.data.token)
            
            toast.success("Logado com sucesso", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } catch (error) {
            
            if(axios.isAxiosError(error)){

                toast.error(error.response?.data, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });

            }
            
        }finally{

            const token = localStorage.getItem("@Token:")

            instance.defaults.headers.authorization = `Bearer ${token}`

            const listUser = await instance.get("/api/user/list")

            const user = listUser.data.find((user: { email: string; }) => user.email == loginData.email)

            setUser(user)

            localStorage.setItem("@IdUser:", user.id)

            navigate("/dashboard", {replace: true})

        }

    }

    const registerRequest = async(registerData: iUserDataRequest) => {

        try {

            await instance.post("/api/user/register", registerData)

            toast.success("Registrado com sucesso", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            navigate("/", {replace: true})
            
        } catch (error) {

            if(axios.isAxiosError(error)){

                toast.error(error.response?.data, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });

            }

        }
    }

    return (
        <contextObjAuthorization.Provider value={{
            loginRequest, 
            registerRequest, 
            user, 
            setUser
        }}>
            {children}
        </contextObjAuthorization.Provider>
    )

}

export default AuthorizationContext