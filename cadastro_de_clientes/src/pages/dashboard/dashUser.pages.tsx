import HeaderPage from "../../models/headerPage/headerPage.model";
import {
  SectionButtons,
  UserInformations,
  DashUserPageMain,
} from "./style.page";
import { BsGear } from "react-icons/bs";
import { RiUserLine } from "react-icons/ri";
import { useContext, useEffect } from "react";
import { contextObjAuthorization } from "../../context/authorization.context";
import { contextObjDashboard } from "../../context/dashboard.context";
import { Navigate } from "react-router-dom";
import instance from "../../service/axios.service";
import ModalEditUser from "../../models/modalDashboardUser/user/modalEditUser.model";
import { AiFillFilePdf } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import TableContacts from "../../models/tableDash/tableContacts.model";
import ModalDeleteUser from "../../models/modalDashboardUser/user/modelDeleteUser.model";

const DashUserPage = () => {
  const token = localStorage.getItem("@Token:");
  const id = localStorage.getItem("@IdUser:");

  const { onOpenUserSettings, onOpenContactEdit } =
    useContext(contextObjDashboard);

  const { user, setUser } = useContext(contextObjAuthorization);
  const { pfdGenerate, onOpenContactCreate } = useContext(contextObjDashboard);

  const getUser = async () => {
    const listUser = await instance.get("/api/user/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = listUser.data.find((user: { id: string }) => user.id == id);

    setUser(user);
    
  };

  useEffect(() => {
    getUser();
  }, []);

  return user ? (
    <>
      <HeaderPage to="/" buttonName="LogOut" />
      <UserInformations>
        <div className="container">
          <div className="container__Information">
            <div>
              <RiUserLine className="userIcon" />
              <h2>{user.name}</h2>
            </div>
            <span className="email">
              <strong>Email:</strong> {user.email}
            </span>
            <span className="phoneNumber">
              <strong>Tel:</strong> {user.phone_number}
            </span>
          </div>
          <BsGear className="userConfigIcon" onClick={onOpenUserSettings} />
        </div>
      </UserInformations>
      <SectionButtons>
        <div>
          <AiFillFilePdf className="pdfButton" onClick={() => pfdGenerate()} />
          <FaUserPlus
            className="createContactButtton"
            onClick={onOpenContactCreate}
          />
        </div>
      </SectionButtons>
      <ModalEditUser />
      <ModalDeleteUser />
      <DashUserPageMain>
        <TableContacts />
      </DashUserPageMain>
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default DashUserPage;
