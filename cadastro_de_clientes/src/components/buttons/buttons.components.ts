import styled, {css} from "styled-components";

const Button = styled.button`

    ${({type}: any) =>{

        switch(type){
            case "primary":
                return css`
                    background-color: var(--secondary);
                    color: var(--white);
                    border-radius: 4px;
                `
        }

    }}

`

export default Button