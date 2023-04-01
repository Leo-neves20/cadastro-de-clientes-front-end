import * as yup from "yup";

const schemaUpdateUser = yup.object({
    name: yup.string(),
    email: yup.string().email(),
    phone_number: yup.string(),
})

export default schemaUpdateUser

