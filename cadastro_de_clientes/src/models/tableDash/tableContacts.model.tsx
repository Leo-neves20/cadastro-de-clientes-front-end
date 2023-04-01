import { useContext } from "react";
import { contextObjDashboard } from "../../context/dashboard.context";
import { Table } from "./style";
import { GoPencil } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import ModelEditContact from "../modalDashboardUser/contact/modalEditContact.model";
import ModalDeleteContact from "../modalDashboardUser/contact/modelDeleteContact.model";
import ModalCreateContact from "../modalDashboardUser/contact/modalCreateContact.model";
import ModalDeleteUser from "../modalDashboardUser/user/modelDeleteUser.model";



const TableContacts = () => {

  const { 
    contacts, 
    onOpenContactEdit,
    setContactSelected,
    onOpenContactDelete 
  } = useContext(contextObjDashboard);

  const geContactUpdate = (id: number) => {

    const findContact = contacts.find((contac) => +contac.id == +id);

    setContactSelected(findContact!);

    onOpenContactEdit();
    
  };

  const getContactDelete = (id: number) => {

    const findContact = contacts.find((contac) => +contac.id == +id);

    setContactSelected(findContact!);

    onOpenContactDelete();

  };

  return (
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
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone_number}</td>
                <td className="buttonsTable">
                  <div>
                    <GoPencil
                      className="editContactButton"
                      onClick={() => {
                        geContactUpdate(+contact.id);
                      }}
                    />
                    <IoTrashOutline
                      onClick={() => {
                        getContactDelete(+contact.id);
                      }}
                      className="deleteContactButton"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ModalCreateContact />
      <ModelEditContact />
      <ModalDeleteContact />
      <ModalDeleteUser />
    </>
  );
};

export default TableContacts;
