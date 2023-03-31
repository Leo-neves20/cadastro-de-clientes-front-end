import { useContext, useEffect, useState } from "react"
import { contextObjDashboard } from "../../context/dashboard.context"
import instance from "../../service/axios.service"
import {Table} from "./style"
import {GoPencil} from "react-icons/go"
import {IoTrashOutline} from "react-icons/io5"
import ModelEditContact from "../modalDashboardUser/modalEditContact.model"

export interface iContactResponse{
    id: string,
    name: string,
    email: string,
    phone_number: string,
    created_At: Date,
}

const TableContacts = () => {
    
    const {
        contacts,
        editContact,
        contactSelected,
        onOpenContactEdit
    } = useContext(contextObjDashboard)

    const teste = () => {
        onOpenContactEdit()
    }

    return(
        <>
        <Table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telofone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    contacts.map(contact => {
                        return (
                            <tr key={contact.id}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone_number}</td>
                                <td className="buttonsTable">
                                    <div>
                                        <GoPencil
                                            className="editContactButton"
                                            onClick={() => {editContact(+contact.id)}}
                                        />
                                        <IoTrashOutline 
                                            onClick={() => {}}  
                                            className="deleteContactButton"
                                        />
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <ModelEditContact 
            name={contactSelected?.name} 
            email={contactSelected?.email} 
            phone_number={contactSelected?.phone_number}
            id={contactSelected?.id}
        />
        </>
    )

}

export default TableContacts