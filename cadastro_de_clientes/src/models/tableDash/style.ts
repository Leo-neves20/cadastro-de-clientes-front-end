import styled from "styled-components";

export const Table = styled.table`

    margin: 25px 15px 0px 15px;
    width: 100%;

    thead{
        tr{
            th{

                border: 1px solid var(--primary);
                background-color: var(--tertiary);
                color: var(--white);
                min-width: 30px;
                white-space: nowrap;
            }
        }
    }

    tbody{
        tr{
            td{
                border: 1px solid black;
                white-space: nowrap;
                padding: 4px 9px;
                font-weight: 500;
            }
        }

        tr:nth-child(even) {
            background: #7c92a657;
        }

        .buttonsTable{
           div{

                display: flex;
                justify-content: center;
                align-items: center;

                button{
                    display: block;
                }

                .editContactButton{
                    color: #1aaee4;
                    font-size: 1.125rem;
                    margin-right: 5px;
                    cursor: pointer;
                }

                .deleteContactButton{
                    color: red;
                    font-size: 1.125rem;
                    margin-left: 5px;
                    cursor: pointer;
                }
           }
        }
    }

    @media (min-width: 1300px){
        width: 1260px;
    }


`

