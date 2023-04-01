import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { contextObjDashboard } from "../../../context/dashboard.context";

const ModalDeleteContact = () => {
  const { 
    isOpenContactDelete, 
    onCloseContactDelete, 
    overlay, 
    onDeleteContact 
  } =useContext(contextObjDashboard);

  return (
    <Modal
      isCentered
      isOpen={isOpenContactDelete}
      onClose={onCloseContactDelete}
    >
      {overlay}
      <ModalContent>
        <ModalHeader>Excluir Contato</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Tem certeza que deseja excluir este contato ?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={() => onDeleteContact()}>
            Exclui
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteContact;
