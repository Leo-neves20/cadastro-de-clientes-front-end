import styled from  "styled-components";

export const Header = styled.header`

    background-color: var(--white);
    border-bottom: 1px solid var(--secondary);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;

    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
    }

    @media (min-width: 500px){
        height: 70px;

        .button.primary{
            height: 36px;
            width: 100px;
        }
    }

    @media (min-width: 1000px){
        height: 90px;

        .button.primary{
            height: 40px;
            width: 100px;
            font-size: 0.9rem;
        }
    }

    @media (min-width: 1330px){
        div{
           width: 1130px;
        }
    }
`