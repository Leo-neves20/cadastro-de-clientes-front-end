import axios from "axios"
import { createContext, useContext } from "react"
import { toast } from "react-toastify"
import {iChildren, iUserData, iUserDataResponse, iUserUpdate} from "../interface/user.interface"
import instance from "../service/axios.service"
import { contextObjAuthorization } from "./authorization.context"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DynamicContent, TDocumentDefinitions } from "pdfmake/interfaces"

interface iContext{
    updateUserRequest(dataUpdate: iUserUpdate): void
    pfdGenerate(): void
}

export const contextObjDashboard = createContext({} as iContext)

const DashBoardContext = ({children}: iChildren) => {

    const {user, setUser} = useContext(contextObjAuthorization)
    const token = localStorage.getItem("@Token:")

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

        pdfMake.createPdf(docConfig).open()

    }

    return (
        <contextObjDashboard.Provider value={{updateUserRequest, pfdGenerate}}>
            {children}
        </contextObjDashboard.Provider>
    )

}

export default DashBoardContext