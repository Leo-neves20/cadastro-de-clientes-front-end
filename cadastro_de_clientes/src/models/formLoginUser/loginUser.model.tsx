import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useContext, useState } from "react"
import {VscEye, VscEyeClosed} from "react-icons/vsc"
import FormLoginUser from "./style.model"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import { iUserLoginData } from "../../interface/user.interface";
import schemaLoginUser from "../../schema/user/loginUser.schema";
import { SubmitHandler } from "react-hook-form/dist/types"
import { Link } from "react-router-dom";
import {contextObjAuthorization} from "../../context/authorization.context";

const FormLogin = () => {

    const [password, setPassword] = useState(false)

    const handleClickPassword = () => {
        setPassword(!password)
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm<iUserLoginData>({
        resolver: yupResolver(schemaLoginUser)
    });

    const {onLogin} = useContext(contextObjAuthorization)

    const onSubmit: SubmitHandler<iUserLoginData> = (data: iUserLoginData) => {
    
        onLogin(data)

    };

    return(
        <FormLoginUser onSubmit={handleSubmit(onSubmit)}>

            <h2>Login</h2>

            <div className="container-formLogin">

                <div className="container-input">

                    <label htmlFor="email">Email</label>
                    
                    <Input 
                        id="email" 
                        placeholder='Digite seu email' 
                        className="inputs-form-login"
                        focusBorderColor="color.secondary"
                        type={"email"}
                        {...register("email")}
                    />

                    <p className="error-message">{errors.email?.message}</p>

                </div>

                <div className="container-input">

                    <label htmlFor="password">Senha</label>

                    <InputGroup size='md' className="inputs-form-login">

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
            </div>
            <div className="container-buttons">

                <button type="submit" className="button primary">ENTRAR</button>

                <Link to={"/register"} className="button secondary">Ir para Cadastro</Link>

            </div>

        </FormLoginUser>
    )

}

export default FormLogin