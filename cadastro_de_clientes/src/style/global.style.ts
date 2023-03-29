import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    :root{
        --white:  #ffffff;
        --gray-0: #d0d0d0;
        --gray-1: #a2a2a2;
        --gray-2: #777777;
        --gray-3: #4e4e4e;
        --black:  #000000;

        --primary:   #263640;
        --secondary: #7C92A6;
        --tertiary:  #516373;
    }

    *{
        margin: 0;
        border: none;
        box-sizing: border-box;
        list-style: none;
        font-family: 'Inter', sans-serif;
        text-decoration: none;
    }

    .button.primary{
        background-color: var(--primary);
        color: var(--white);
        border-radius: 14px;
        height: 34px;
        width: 90px;
        transition: 0.3s;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover{
            background-color: var(--secondary);
            transition: 0.3s;
        }
    }
    .button.secondary{
        background-color: var(--gray-3);
        color: var(--white);
        border-radius: 14px;
        height: 34px;
        width: 90px;
        transition: 0.3s;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover{
            background-color: var(--gray-2);
            transition: 0.3s;
        }
    }

`

export default GlobalStyle