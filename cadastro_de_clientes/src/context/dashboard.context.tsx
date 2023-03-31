import { useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import {iChildren, iUserData, iUserDataResponse, iUserUpdate} from "../interface/user.interface"
import { iContactResponse } from "../models/tableDash/tableContacts.model"
import instance from "../service/axios.service"
import { contextObjAuthorization } from "./authorization.context"

interface iContext{
    updateUserRequest(dataUpdate: iUserUpdate): void
    contacts: iUserDataResponse[]
    isOpenUserSettings:  any
    onOpenUserSettings:  any
    onCloseUserSettings: any
    isOpenContactEdit:   any
    onOpenContactEdit:   any 
    onCloseContactEdit:  any
    contactSelected: iContactResponse | undefined
    setContactSelected: React.Dispatch<React.SetStateAction<iContactResponse | undefined>>
    editContact(id: number): void
}

export const contextObjDashboard = createContext({} as iContext)

const DashBoardContext = ({children}: iChildren) => {

    const {user, setUser} = useContext(contextObjAuthorization)
    const token = localStorage.getItem("@Token:")

    const [contacts, setContacts] = useState<iUserDataResponse[]>([])
    const [contactSelected, setContactSelected] = useState<iContactResponse | undefined>(undefined)

    const { 
        isOpen: isOpenUserSettings, 
        onOpen: onOpenUserSettings, 
        onClose: onCloseUserSettings 
    } = useDisclosure()

    const { 
        isOpen: isOpenContactEdit, 
        onOpen: onOpenContactEdit, 
        onClose: onCloseContactEdit 
    } = useDisclosure()

    const editContact = (id: number) => {

        const findContact = contacts.find(contac => +contac.id == +id)
        
        setContactSelected(findContact!)
        
        onOpenContactEdit()
        
    }

    const contactList = async () => {

        const response = await instance.get("/api/contact/list", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setContacts(response.data.contacts)
    }

    useEffect(() => {
        contactList()
    }, [])

    const updateUserRequest = async (dataUpdate: iUserUpdate) => {

        try {

            const userData: iUserUpdate = {}

            if(user){

                instance.defaults.headers.authorization = `Bearer ${token}`

                if(dataUpdate.name){
                    setUser({...user, name: dataUpdate.name})
                }

                if(dataUpdate.phone_number){
                    setUser({...user, phone_number: dataUpdate.phone_number})
                }

                if(dataUpdate.email){

                    if(dataUpdate.email != user.email){
                        setUser({...user, email: dataUpdate.email})
                        userData.email = dataUpdate.email
                    }

                    userData.name = dataUpdate.name
                    userData.phone_number = dataUpdate.phone_number

                }

                await instance.patch(`/api/user/update/${user.id}`, userData)
    
                toast.success("Usuário atualizado com sucesso", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }

            
        } catch (error) {

            if(axios.isAxiosError(error)){

                console.log(error)

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

            const id = localStorage.getItem("@IdUser:")

            const listUser = await instance.get("/api/user/list")
    
            const user = listUser.data.find((user: { id: string; }) => user.id == id)
    
            setUser(user)
        }

    }

    return (
        <contextObjDashboard.Provider value={{
            updateUserRequest, 
            contacts,
            isOpenUserSettings, 
            onOpenUserSettings, 
            onCloseUserSettings,
            isOpenContactEdit,
            onOpenContactEdit, 
            onCloseContactEdit,
            contactSelected, 
            setContactSelected,
            editContact
        }}>
            {children}
        </contextObjDashboard.Provider>
    )

}

export default DashBoardContext