import styled from  "styled-components";

export const UserInformations = styled.section`

    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--secondary);

    .container{
        width: 89%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0px;
        
        .container__Information{
            display: flex;
            align-items: center;
            width: 60%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;

            div{
                width: 100%;
                display: flex;

                h2{
                    font-weight: 600;
                    color: var(--primary);
                    font-size: 1.1rem;
                    margin-left: 3px;
                    width: 90%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                
                .userIcon{
                    font-size: 22px;
                }
            }

            .phoneNumber{
                font-size: 0.9rem;
            }

            .email{
                font-size: 0.9rem;
                margin-top: 3px;
            }

            .phoneNumber, .email{

                display: block;
                width: 100%;
                margin-left: 10px;

                color: var(--gray-2);

                strong{
                    font-weight: 500;
                    color: var(--primary);
                }

            }

        }

        .userConfigIcon{
            font-size: 22px;
            transition: 0.5s;

            &:hover{
                color: var(--secondary);
                animation:  gearAnimation 4s linear infinite;
            }

            @keyframes gearAnimation{
                0%{
                    transform: rotate(360deg);
                }

            }
        }
    }

    @media (min-width: 1000px){

        height: 90px;

        .container{
            width: 89%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0px;
        
            .container__Information{
                div{

                    .userIcon{
                        font-size: 27px;
                    }

                    h2{

                        font-size: 1.25rem;
                        margin-left: 7px;
                    }
                }
            }

            .userConfigIcon{
                font-size: 27px;
            }
        }

    }

    @media (min-width: 1330px){
        .container{
            width: 1140px;
        }
    }

`