import styled from 'styled-components';

export const ContainerGroup = styled.div`

    .ListGroupConteinerInformations{
        display: flex;
        flex-direction: column;
        font-size: 12px;

        .ListGroupItemInformations{
            display: flex;
            flex-direction: row;
            width: 20%;

            img{
                border-radius: 1000px;
                width: 50px;
            }   

            div.informations {
                margin-left: 5px;
                max-width: 200px;
                overflow: auto;

                    p.nome{
                    margin-bottom: 0px;
                }
                
            }
            .iconDelete{
                color: red;
                cursor: pointer;
                width: 20px;
                height: 15px;
                position: absolute;
                margin-left: 80%;
            }
        }
    }
`;