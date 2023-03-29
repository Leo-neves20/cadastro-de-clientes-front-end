import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import FormRegisterUser from "./style.model"
import {VscEye, VscEyeClosed} from "react-icons/vsc"
import {BsTelephone} from "react-icons/bs"
import { useForm } from "react-hook-form"
import { SubmitHandler } from "react-hook-form/dist/types"
import { yupResolver } from '@hookform/resolvers/yup';
import {Link} from "react-router-dom"
import schemaRegisterUser from "../../schema/registerUser.schema"
import { UserData } from "../../interface/user.interface"

const FormRegister = () => {
    
    const [password, setPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(false)
    
    const handleClickPassword = () => {
        setPassword(!password)
    }

    const handleClickConfirmPassword = () => {
        setConfirmPassword(!confirmPassword)
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm<UserData>({
        resolver: yupResolver(schemaRegisterUser)
    });

    const onSubmit: SubmitHandler<UserData> = (data: UserData) => {

        const {name, email, password, phone_number} = data

        console.log({name, email, password, phone_number})

    };
    
    return (
        <FormRegisterUser onSubmit={handleSubmit(onSubmit)}>

            <h2>CADASTRO</h2>

            <div className="container-formRegister">

                <div className="container-input">

                    <label htmlFor="name">Nome</label>

                    <Input 
                        id="name" 
                        placeholder='Digite seu nome' 
                        className="inputs-form-register"
                        focusBorderColor="color.secondary"
                        {...register("name")}
                    />

                    <p className="error-message">{errors.name?.message}</p>

                </div>

                <div className="container-input">

                    <label htmlFor="email">Email</label>
                    
                    <Input 
                        id="email" 
                        placeholder='Digite seu email' 
                        className="inputs-form-register"
                        focusBorderColor="color.secondary"
                        type={"email"}
                        {...register("email")}
                    />

                    <p className="error-message">{errors.email?.message}</p>

                </div>

                <div className="container-input">

                    <label htmlFor="password">Senha</label>

                    <InputGroup size='md' className="inputs-form-register">

                        <Input
                            id="password"
                            pr='4.5rem'
                            type={password ? 'text' : 'password'}
                            placeholder='Digite sua senha'
                            focusBorderColor="color.secondary"
                            {...register("password")}
                        />

                        <InputRightElement width='4.5rem'>

                            <button 
                                type="button" 
                                onClick={handleClickPassword}
                            >
                                {password ? <VscEyeClosed /> : <VscEye />}
                            </button>

                        </InputRightElement>


                    </InputGroup>
                    
                    <p className="error-message">{errors.password?.message}</p>

                </div>

                <div className="container-input">

                    <label htmlFor="confirm-password">Confirmar Senha</label>

                    <InputGroup 
                        size='md' 
                        className="inputs-form-register"
                    >

                        <Input
                            id="confirm-password"
                            pr='4.5rem'
                            type={confirmPassword ? 'text' : 'password'}
                            placeholder='Confirmar senha'
                            focusBorderColor="color.secondary"
                            {...register("confirm_password")}
                        />

                        <InputRightElement width='4.5rem'>
                            <button 
                                type="button" 
                                onClick={handleClickConfirmPassword}
                            >
                                {confirmPassword ? <VscEyeClosed /> : <VscEye />}
                            </button>
                        </InputRightElement>


                    </InputGroup>

                    <p className="error-message">{errors.confirm_password?.message}</p>

                </div>

                <div className="container-input">

                    <label htmlFor="phoneNumber">Número de Telefone</label>

                    <InputGroup id="phoneNumber" className="inputs-form-register">

                        <InputLeftElement
                            pointerEvents='none'
                            children={<BsTelephone color='gray.300' />}
                            id="phoneNumber"
                        />

                        <Input 
                            type='tel' 
                            placeholder='Digite seu número...'
                            focusBorderColor="color.secondary"
                            {...register("phone_number")}
                        />

                    </InputGroup>

                    <p className="error-message">{errors.phone_number?.message}</p>

                </div>

            </div>

            <div className="container-buttons">

                <button type="submit" className="button primary">CADASTRAR</button>

                <Link to={"/"} className="button secondary">Ir para Login</Link>

            </div>

        </FormRegisterUser>
    )

}

export default FormRegister