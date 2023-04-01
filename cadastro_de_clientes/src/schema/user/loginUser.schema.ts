import * as yup from "yup";

const schemaLoginUser = yup.object({
    email: yup.string().email().required("Campo obrigatório *"),
    password: yup.string().required("Campo obrigatório *")
})

export default schemaLoginUser