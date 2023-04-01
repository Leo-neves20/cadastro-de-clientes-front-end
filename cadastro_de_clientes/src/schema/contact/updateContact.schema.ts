import * as yup from "yup";

const schemaUpdateContact = yup.object({
    name: yup.string(),
    email: yup.string().email(),
    phone_number: yup.string(),
})

export default schemaUpdateContact