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
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { SubmitHandler } from "react-hook-form/dist/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import schemaUpdateContact from "../../../schema/contact/updateContact.schema";
import { contextObjDashboard } from "../../../context/dashboard.context";
import { iContactUpdate } from "../../../interface/contact.interface";

const ModelEditContact = () => {

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<iContactUpdate>({
    resolver: yupResolver(schemaUpdateContact),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
    },
  });

  const {
    contactSelected,
    isOpenContactEdit,
    onCloseContactEdit,
    onUpdataContact,
  } = useContext(contextObjDashboard);

  const onSubmit: SubmitHandler<iContactUpdate> = (data: iContactUpdate) => {
    if (data.name) {
      onUpdataContact({ ...contactSelected!, name: data.name });
    }

    if (data.email) {
      onUpdataContact({ ...contactSelected!, email: data.email });
    }

    if (data.phone_number) {
      onUpdataContact({ ...contactSelected!, phone_number: data.phone_number });
    }

    reset();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenContactEdit}
        onClose={onCloseContactEdit}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader marginTop={5} fontSize={25}>
            Dados do Contato
          </ModalHeader>

          <ModalCloseButton marginTop={5} />

          <form
            className="containerFormUpdate"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                placeholder={contactSelected?.email}
                focusBorderColor="color.secondary"
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
              <Button
                type="submit"
                backgroundColor="color.primary"
                color="white"
                mr={3}
              >
                Salvar
              </Button>

              <Button
                colorScheme="gray"
                type="button"
                onClick={onCloseContactEdit}
              >
                Sair
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModelEditContact;
