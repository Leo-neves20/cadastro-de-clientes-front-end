import { 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    useDisclosure,
    Text
} from "@chakra-ui/react"
import {useContext} from "react"
import { contextObjDashboard } from "../../context/dashboard.context"

const ModalDeleteUser = () => {

    const {
        isOpenUserDelete, 
        onCloseUserDelete, 
        deleteUser,
        overlay
    } = useContext(contextObjDashboard)

    return (
        <Modal
            isCentered 
            isOpen={isOpenUserDelete} 
            onClose={onCloseUserDelete}
        >
        {overlay}
            <ModalContent>
                <ModalHeader>Excluir Conta</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Tem certeza que deseja excluir sua conta?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" onClick={() => deleteUser()}>Exclui</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}

export default ModalDeleteUser