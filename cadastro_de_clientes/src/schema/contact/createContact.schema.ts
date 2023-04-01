import * as yup from "yup";

const schemaCreateContact = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email().required("Email é obrigatório"),
    phone_number: yup.string().required("Númeor de telefone obrigatório"),
})

export default schemaCreateContact