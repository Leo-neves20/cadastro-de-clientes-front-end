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
import React, {useContext} from "react"
import { contextObjDashboard } from "../../context/dashboard.context"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import schemaCreateContact from "../../schema/createContact.schema";
import { SubmitHandler } from "react-hook-form/dist/types"

export interface iContactCreate{
    name: string,
    email: string,
    phone_number: string,
}

const ModalCreateContact = () => {

    const initialRef = React.useRef(null)
    const finalRef   = React.useRef(null)

    const {
        onCloseContactCreate, 
        isOpenContactCreate, 
        createContact
    } = useContext(contextObjDashboard)

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<iContactCreate>({
        resolver: yupResolver(schemaCreateContact),
        defaultValues: {
            name: "",
            email: "",
            phone_number: "",
        }
    });

    const onSubmit: SubmitHandler<iContactCreate> = (data: iContactCreate) => {
        console.log(data)
        createContact(data)
    };

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpenContactCreate}
                onClose={onCloseContactCreate}
            >

            <ModalOverlay />

            <ModalContent>

                <ModalHeader marginTop = {5} fontSize={25}>Novo Contato</ModalHeader>

                <ModalCloseButton marginTop={5}/>

                <form className="containerFormUpdate" onSubmit = {handleSubmit(onSubmit)}>

                <FormControl>

                    <FormLabel>Nome</FormLabel>

                    <Input 
                        placeholder= "Nome do contato..."
                        focusBorderColor="color.secondary"
                        {...register("name")}
                    />

                    <p style={{color: "red", fontSize: "0.8rem"}} >{errors.name?.message}</p> 

                </FormControl>

                <FormControl mt={4}>

                    <FormLabel>Email</FormLabel>

                    <Input 
                        placeholder = "Email do contato..."
                        focusBorderColor = "color.secondary"
                        {...register("email")}
                    />

                    <p style={{color: "red", fontSize: "0.8rem"}}>{errors.email?.message}</p>

                </FormControl>

                <FormControl mt={4}>

                    <FormLabel>Número de telefone</FormLabel>

                    <Input 
                        placeholder="Número de telefone do contato..."
                        focusBorderColor="color.secondary"
                        {...register("phone_number")}
                    />

                    <p style={{color: "red", fontSize: "0.8rem"}}>{errors.phone_number?.message}</p>

                </FormControl>

                <ModalFooter marginTop={7} marginBottom={5}>

                    <Button type="submit" backgroundColor="color.primary" color="white" mr={3}>
                        Criar
                    </Button>

                    <Button colorScheme='gray' type="button" onClick={onCloseContactCreate}>Sair</Button>

                </ModalFooter>

                </form>

            </ModalContent>

            </Modal>

        </>

    )
}

export default ModalCreateContact