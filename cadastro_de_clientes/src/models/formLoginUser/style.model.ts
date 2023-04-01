import styled from "styled-components";

const FormLoginUser = styled.form`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid var(--secondary);
    margin-top: 80px;

    h2{
        color: var(--black);
        font-size: 1.5rem;
        font-weight: 700;
        margin: 25px 0px 10px 0px;
    }

    .container-formLogin{
        width: 90%;
    }

    .container-input{
        label{
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--gray-3);
            margin-left: 3px;
        }

        .inputs-form-login{
            margin-top: 3px;
        }

        margin: 13px 0px;

        .error-message{
            color: red;
            font-size: 0.7rem;
        }
    }

    .container-buttons{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;

        .button.primary{
            background-color: var(--primary);
            width: 90%;
            height: 35px;
            margin-top: 20px;
            font-size: 0.9rem;
        }

        .button.secondary{
            width: 90%;
            height: 35px;
            font-size: 0.9rem;
            margin: 15px 0px 40px 0px;
        }

        
    }

    @media (min-width: 500px){

        width: 450px;

    }

`

export default FormLoginUser