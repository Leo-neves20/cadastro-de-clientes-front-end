import { 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Modal, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay
} from "@chakra-ui/react"
import { SubmitHandler } from "react-hook-form/dist/types"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import schemaUpdateUser from "../../schema/updateUser.schema";
import {iUserUpdate} from "../../interface/user.interface"
import React, { useContext} from "react"
import {contextObjDashboard} from "../../context/dashboard.context"
import { contextObjAuthorization } from "../../context/authorization.context";
   
const ModalEditUser = () => {

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<iUserUpdate>({
        resolver: yupResolver(schemaUpdateUser)
    });

    const {
        updateUserRequest, 
        isOpenUserSettings, 
        onCloseUserSettings, 
        onOpenUserSettings,
        onOpenUserDelete,
        setOverlay,
        deleteUserAccount
    } = useContext(contextObjDashboard)

    const {user, setUser} = useContext(contextObjAuthorization)

    const onSubmit: SubmitHandler<iUserUpdate> = (data: iUserUpdate) => {
        updateUserRequest(data)
    };

    const openModelDelete = () => {
        onCloseUserSettings()
        console.log()
        onOpenUserDelete()
    }
   
    return (

        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpenUserSettings}
            onClose={onCloseUserSettings}
        >

        <ModalOverlay />

        <ModalContent onSubmit={handleSubmit(onSubmit)}>

          <ModalHeader marginTop={5} fontSize={25}>Seus Dados</ModalHeader>

          <ModalCloseButton marginTop={5}/>

          <form className="containerFormUpdate">

            <FormControl>

              <FormLabel>Nome</FormLabel>

                <Input 
                    placeholder='digite seu novo nome'
                    focusBorderColor="color.secondary"
                    defaultValue={user?.name}
                    {...register("name")}
                />

            </FormControl>

            <FormControl mt={4}>

                <FormLabel>Email</FormLabel>

                <Input 
                    placeholder='digite seu novo Email'
                    focusBorderColor="color.secondary"
                    defaultValue={user?.email}
                    {...register("email")}
                />

            </FormControl>

            <FormControl mt={4}>

                <FormLabel>Número de telefone</FormLabel>

                <Input 
                    placeholder='Digite seu novo número de telefone'
                    focusBorderColor="color.secondary"
                    defaultValue={user?.phone_number}
                    {...register("phone_number")}
                />

            </FormControl>

            <ModalFooter marginTop={7} marginBottom={5}>

                <Button type="submit" backgroundColor="color.primary" color="white" mr={3}>
                    Salvar
                </Button>

                <Button colorScheme='red' type="button" onClick={() => {
                    deleteUserAccount()
                }}>Excluir</Button>

            </ModalFooter>

          </form>

        </ModalContent>

      </Modal>

    )

}

export default ModalEditUser