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
    useDisclosure 
} from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import { SubmitHandler } from "react-hook-form/dist/types"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import schemaUpdateContact from "../../schema/updateContact.schema";
import { contextObjDashboard } from "../../context/dashboard.context";
import { iContactResponse } from "../tableDash/tableContacts.model";
import { iUserDataResponse } from "../../interface/user.interface";

interface iContactUpdate{
    name?: string,
    email?: string,
    phone_number?: string,
}

const ModelEditContact = () => {

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<iContactUpdate>({
        resolver: yupResolver(schemaUpdateContact),
    });
    
    const onSubmit: SubmitHandler<iContactUpdate> = (data: iContactUpdate) => {
        console.log(data)
    };

    const {
        contactSelected, 
        isOpenContactEdit, 
        onCloseContactEdit, 
    } = useContext(contextObjDashboard)

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpenContactEdit}
                onClose={onCloseContactEdit}
            >

            <ModalOverlay />

            <ModalContent onSubmit = {handleSubmit(onSubmit)}>

                <ModalHeader marginTop = {5} fontSize={25}>Seus Dados</ModalHeader>

                <ModalCloseButton marginTop={5}/>

                <form className="containerFormUpdate">

                <FormControl>

                    <FormLabel>Nome</FormLabel>

                    <Input 
                        placeholder={contactSelected?.name}
                        focusBorderColor="color.secondary"
                        {...register("name")}
                    />

                </FormControl>

                <FormControl mt={4}>

                    <FormLabel>Email</FormLabel>

                    <Input 
                        placeholder = {contactSelected?.email}
                        focusBorderColor = "color.secondary"
                        {...register("email")}
                    />

                </FormControl>

                <FormControl mt={4}>

                    <FormLabel>Número de telefone</FormLabel>

                    <Input 
                        placeholder={contactSelected?.phone_number}
                        focusBorderColor="color.secondary"
                        {...register("phone_number")}
                    />

                </FormControl>

                <ModalFooter marginTop={7} marginBottom={5}>

                    <Button type="submit" backgroundColor="color.primary" color="white" mr={3}>
                        Salvar
                    </Button>

                    <Button colorScheme='gray' type="button" onClick={onCloseContactEdit}>Sair</Button>

                </ModalFooter>

                </form>

            </ModalContent>

            </Modal>

        </>

    )
   
}

export default ModelEditContact