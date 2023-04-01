import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  iChildren,
  iUserDataResponse,
  iUserUpdate,
} from "../interface/user.interface";
import { iContactResponse } from "../interface/contact.interface";
import instance from "../service/axios.service";
import { contextObjAuthorization } from "./authorization.context";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {TDocumentDefinitions } from "pdfmake/interfaces";
import { ModalOverlay } from "@chakra-ui/react";
import { iContactCreate } from "../interface/contact.interface";
import { useNavigate } from "react-router-dom";

interface iContext {
  onUpdateUser(dataUpdate: iUserUpdate): void;
  contacts: iUserDataResponse[];
  isOpenUserSettings: any;
  onOpenUserSettings: any;
  onCloseUserSettings: any;
  isOpenContactEdit: any;
  onOpenContactEdit: any;
  onCloseContactEdit: any;
  contactSelected: iContactResponse | undefined;
  setContactSelected: React.Dispatch<
    React.SetStateAction<iContactResponse | undefined>
  >;
  onUpdataContact(data: iUserDataResponse): void;
  pfdGenerate(): void;
  overlay: any;
  setOverlay: React.Dispatch<React.SetStateAction<any>>;
  isOpenContactDelete: any;
  onOpenContactDelete: any;
  onCloseContactDelete: any;
  onDeleteContact(): void;
  isOpenContactCreate: any;
  onOpenContactCreate: any;
  onCloseContactCreate: any;
  onCreateContact(data: iContactCreate): void;
  isOpenUserDelete: any;
  onOpenUserDelete: any;
  onCloseUserDelete: any;
  onDeleteUser(): void;
}

export const contextObjDashboard = createContext({} as iContext);

const DashBoardContext = ({ children }: iChildren) => {
  
  const token = localStorage.getItem("@Token:");
  const navigate = useNavigate();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  
  const { user, setUser } = useContext(contextObjAuthorization);
  const [contacts, setContacts] = useState<iUserDataResponse[]>([]);
  const [contactSelected, setContactSelected] = useState<iContactResponse | undefined>(undefined);
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const {
    isOpen: isOpenUserSettings,
    onOpen: onOpenUserSettings,
    onClose: onCloseUserSettings,
  } = useDisclosure();
  
  const {
    isOpen: isOpenContactEdit,
    onOpen: onOpenContactEdit,
    onClose: onCloseContactEdit,
  } = useDisclosure();

  const {
    isOpen: isOpenContactDelete,
    onOpen: onOpenContactDelete,
    onClose: onCloseContactDelete,
  } = useDisclosure();
  
  const {
    isOpen: isOpenContactCreate,
    onOpen: onOpenContactCreate,
    onClose: onCloseContactCreate,
  } = useDisclosure();
  
  const {
    isOpen: isOpenUserDelete,
    onOpen: onOpenUserDelete,
    onClose: onCloseUserDelete,
  } = useDisclosure();

  const listUserContacts = async () => {
    const response = await instance.get("/api/contact/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setContacts(response.data.contacts);
  };

  useEffect(() => {
    listUserContacts();
  }, []);

  const onUpdateUser = async (dataUpdate: iUserUpdate) => {

    try {
      const userData: iUserUpdate = {};

      if (user) {
        instance.defaults.headers.authorization = `Bearer ${token}`;

        if (dataUpdate.name) {
          setUser({ ...user, name: dataUpdate.name });
        }

        if (dataUpdate.phone_number) {
          setUser({ ...user, phone_number: dataUpdate.phone_number });
        }

        if (dataUpdate.email) {
          if (dataUpdate.email != user.email) {
            setUser({ ...user, email: dataUpdate.email });
            userData.email = dataUpdate.email;
          }

          userData.name = dataUpdate.name;
          userData.phone_number = dataUpdate.phone_number;
        }

        await instance.patch(`/api/user/update/${user.id}`, userData);

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
      if (axios.isAxiosError(error)) {
        console.log(error);

        toast.error(error.response?.data, {
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
    } finally {
      const id = localStorage.getItem("@IdUser:");

      const listUser = await instance.get("/api/user/list");

      const user = listUser.data.find((user: { id: string }) => user.id == id);

      setUser(user);
    }
  };

  const onDeleteUser = async () => {
    try {
      if (user) {
        instance.defaults.headers.authorization = `Bearer ${token}`;

        await instance.delete(`/api/user/delete/${user.id}`);

        toast.success("Usuário deletado com sucesso", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/", { replace: true });

        setUser(null);

        localStorage.clear();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

        toast.error(error.response?.data, {
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
    }
  };

  const onCreateContact = async (data: iContactCreate) => {
    try {
      instance.defaults.headers.authorization = `Bearer ${token}`;

      await instance.post("/api/contact/register", data);

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
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data, {
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
    } finally {
      listUserContacts();
    }
  };

  const onUpdataContact = async (data: iUserDataResponse) => {
    try {
      instance.defaults.headers.authorization = `Bearer ${token}`;

      await instance.patch(`/api/contact/update/${contactSelected?.id}`, data);

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
      if (axios.isAxiosError(error)) {
        console.log(error);

        toast.error(error.response?.data, {
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
    } finally {
      listUserContacts();
      setContactSelected(data);
    }
  };

  const onDeleteContact = async () => {
    try {
      instance.defaults.headers.authorization = `Bearer ${token}`;

      await instance.delete(`/api/contact/delete/${contactSelected?.id}`);

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
      if (axios.isAxiosError(error)) {
        console.log(error);

        toast.error(error.response?.data, {
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
    } finally {
      listUserContacts();
      setContactSelected(undefined);
      onCloseContactDelete();
    }
  };

  const pfdGenerate = async () => {
    const contacts_Arr: Array<string[]> = [];

    contacts.forEach((contact) => {
      const arr = [];

      arr.push(contact.name);
      arr.push(contact.email);
      arr.push(contact.phone_number);

      contacts_Arr.push(arr);
    });

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const docConfig: TDocumentDefinitions = {
      pageSize: "A4",
      pageMargins: [50, 80, 50, 60],
      header: [
        [
          {
            text: "CONTATOS",
            bold: true,
            fontSize: 25,
            alignment: "center",
            margin: [0, 50, 0, 40],
          },
        ],
      ],
      content: [
        [
          {
            table: {
              widths: ["*", "*", "*"],
              body: [
                [
                  { text: "Nome", style: "header" },
                  { text: "email", style: "header" },
                  { text: "Número de telefone", style: "header" },
                ],
                ...contacts_Arr,
              ],
            },
            margin: [0, 60, 0, 0],

            layout: {
              fillColor: function (rowIndex, node, columnIndex) {
                return rowIndex % 2 === 1 ? "#76818b56" : null;
              },
            },
          },
        ],
      ],
      styles: {
        header: {
          bold: true,
          fontSize: 14,
          fillColor: "#263640",
          color: "white",
        },
      },
    };

    pdfMake.createPdf(docConfig).open();
  };

  return (
    <contextObjDashboard.Provider
      value={{
        onUpdateUser,
        contacts,
        isOpenUserSettings,
        onOpenUserSettings,
        onCloseUserSettings,
        isOpenContactEdit,
        onOpenContactEdit,
        onCloseContactEdit,
        contactSelected,
        setContactSelected,
        onUpdataContact,
        pfdGenerate,
        overlay,
        setOverlay,
        isOpenContactDelete,
        onOpenContactDelete,
        onCloseContactDelete,
        onDeleteContact,
        isOpenContactCreate,
        onOpenContactCreate,
        onCloseContactCreate,
        onCreateContact,
        isOpenUserDelete,
        onOpenUserDelete,
        onCloseUserDelete,
        onDeleteUser
      }}
    >
      {children}
    </contextObjDashboard.Provider>
  );
};

export default DashBoardContext;
