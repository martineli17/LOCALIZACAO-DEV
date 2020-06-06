import styled from 'styled-components';

export const ContainerMap = styled.div`
    .Map{
        display: flex;
        justify-content: center;

        .Avatar{
            border-radius: 100px;
            width: 35px;
            height: 35px;
        }
    }
`;

export const ModalActions = {
    backgroundColor: "rgba(0,0,0,0.8)",
}

export const ModalContentText = {
    color: "gray",
}

export const ModalTitle = {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    color: "white",
}