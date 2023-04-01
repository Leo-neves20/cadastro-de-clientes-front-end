import { useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import {iChildren, iUserData, iUserDataResponse, iUserUpdate} from "../interface/user.interface"
import { iContactResponse } from "../models/tableDash/tableContacts.model"
import instance from "../service/axios.service"
import { contextObjAuthorization } from "./authorization.context"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DynamicContent, TDocumentDefinitions } from "pdfmake/interfaces"
import {ModalOverlay} from "@chakra-ui/react"
import { iContactCreate } from "../models/modalDashboardUser/modalCreateContact.model"

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
    updataContact(data: iUserDataResponse): void
    pfdGenerate(): void
    overlay: any
    setOverlay: React.Dispatch<React.SetStateAction<any>>
    isOpenContactDelete: any
    onOpenContactDelete: any 
    onCloseContactDelete: any
    deleteContact(): void
    getContactDelete(id: number): void
    isOpenContactCreate: any
    onOpenContactCreate: any
    onCloseContactCreate: any
    createContact(data: iContactCreate): void
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

    const { 
        isOpen: isOpenContactDelete, 
        onOpen: onOpenContactDelete, 
        onClose: onCloseContactDelete 
    } = useDisclosure()

    const { 
        isOpen: isOpenContactCreate, 
        onOpen: onOpenContactCreate, 
        onClose: onCloseContactCreate 
    } = useDisclosure()

    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const [overlay, setOverlay] = useState(<OverlayOne />)

    const editContact = (id: number) => {

        const findContact = contacts.find(contac => +contac.id == +id)
        
        setContactSelected(findContact!)
        
        onOpenContactEdit()
        
    }

    const getContactDelete = (id: number) => {

        const findContact = contacts.find(contac => +contac.id == +id)
        
        setContactSelected(findContact!)
        
        onOpenContactDelete()
    
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

    const deleteUser = () => {
        
    }

    const createContact = async (data: iContactCreate) => {

        try {

            instance.defaults.headers.authorization = `Bearer ${token}`

            await instance.post("/api/contact/register", data)

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
            contactList()
        }

    }

    const updataContact = async (data: iUserDataResponse) => {

        try {
            
            instance.defaults.headers.authorization = `Bearer ${token}`

            await instance.patch(`/api/contact/update/${contactSelected?.id}`, data)

            toast.success("Contato atualizado com sucesso", {
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
            contactList()
            setContactSelected(data)
        }
    }

    const deleteContact = async () => {

        try {
            
            instance.defaults.headers.authorization = `Bearer ${token}`

            await instance.delete(`/api/contact/delete/${contactSelected?.id}`)

            toast.success("Contato deletado com sucesso", {
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
            contactList()
            setContactSelected(undefined)
            onCloseContactDelete()
        }

    }

    const pfdGenerate = async () => {

        // contact_list.contacts.forEach(contact => {

        //     const arr = []
    
        //     arr.push(contact.name)
        //     arr.push(contact.email)
        //     arr.push(contact.phone_number)
    
        //     contacts_Arr.push(arr)
    
        // })
    

        pdfMake.vfs = pdfFonts.pdfMake.vfs

        const pdfTitle: any = [
            {
                text: 'CONTATOS',
                fontSize: 20,
			    bold: true,
                margin: [0, 60, 0, 0],
                alignment: "center"
            }
        ]

        const datails: any = [
            {
                table:{
                    width: ["*", "*", "*", "*"]
                },
                header: "headerLineOnly"
            }
        ]

        const docConfig: TDocumentDefinitions = {
            pageSize: "A4",
            pageMargins: [20, 80, 20, 60],
            header: [pdfTitle],
            content: [datails],
        }

        pdfMake.createPdf(docConfig).download()

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
            editContact,
            updataContact,
            pfdGenerate,
            overlay,
            setOverlay,
            isOpenContactDelete, 
            onOpenContactDelete, 
            onCloseContactDelete,
            deleteContact,
            getContactDelete,
            isOpenContactCreate,
            onOpenContactCreate,
            onCloseContactCreate,
            createContact
        }}>
            {children}
        </contextObjDashboard.Provider>)
    
}

export default DashBoardContext