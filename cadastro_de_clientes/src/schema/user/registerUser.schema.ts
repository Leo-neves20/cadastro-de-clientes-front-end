import * as yup from "yup";

const schemaRegisterUser = yup.object({
    name: yup.string().required("Campo obrigatório *"),
    email: yup.string().email().required("Campo obrigatório *"),
    password: yup.string()
        .matches(/[a-z]/, "Deve conter ao menos uma letra minúscula")
        .matches(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
        .matches(/(\W|_)/, "Deve conter ao menos um caracter especial")
        .matches(/(\d)/, "Deve conter ao menos um número")
        .matches(/.{8,}/, " Deve conter 8 dígitos")
        .required("Senha obrigatória"),
    confirm_password: yup.string()
    .oneOf(
        [yup.ref("password")],
        "Senha precisa ser igual à senha anterior"
    ),
    phone_number: yup.string().required("Campo obrigatório *")
}).required();

export default schemaRegisterUser