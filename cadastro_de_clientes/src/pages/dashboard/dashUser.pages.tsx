import HeaderPage from "../../models/headerPage/headerPage.model"
import { UserInformations } from "./style.page"
import {BsGear} from "react-icons/bs"
import {RiUserLine} from "react-icons/ri"
import {useContext, useEffect} from "react"
import {contextObjAuthorization} from "../../context/authorization.context"
import { Navigate } from "react-router-dom"
import instance from "../../service/axios.service"
import { useDisclosure } from "@chakra-ui/react"
import ModalEditUser from "../../models/modalDashboardUser/modalEditUser.model"

const DashUserPage = () => {

    const token = localStorage.getItem("@Token:")
    const id = localStorage.getItem("@IdUser:")

    const { isOpen, onOpen, onClose } = useDisclosure()

    const {user, setUser} = useContext(contextObjAuthorization)

    const getUser = async () => {

        const listUser = await instance.get("/api/user/list", {
            headers:{
                Authorization: `Bearer ${token}`
            } 
        })

        const user = listUser.data.find((user: { id: string; }) => user.id == id)

        setUser(user)

    }

    useEffect(() => {
        getUser()
    }, [])

    return user ? (
        <>
            <HeaderPage to="/" buttonName="LogOut"/>
            <UserInformations>
                <div className="container">
                    <div className="container__Information">
                        <div>
                            <RiUserLine className="userIcon" />
                            <h2>{user.name}</h2>
                        </div>
                        <span className="email"><strong>Email:</strong> {user.email}</span>
                        <span className="phoneNumber"><strong>Tel:</strong> {user.phone_number}</span>
                    </div>
                    <BsGear className="userConfigIcon" onClick={onOpen}/>
                </div>
            </UserInformations>
            <ModalEditUser  isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </>
    )
    :
    <Navigate to="/" replace />
    
}

export default DashUserPage