import { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import LoginLocalContext from '../contexts/LoginLocalContext';
import UserContext from '../contexts/UserContext';

export default function UserPage(){
    const {loggedUser, setLoggedUser } = useContext(UserContext);
    const history = useHistory();
    const { loginLocalName } = useContext(LoginLocalContext);

    function logoutUser(){
        setLoggedUser({});
        localStorage.removeItem(loginLocalName);
        history.push("/");
    }

    return(
        <StyledUserPage>
            <img src={loggedUser.image}></img>
            <h2>{loggedUser.name}</h2>
            <GoBack onClick={()=> history.push("/hoje")}>Voltar para Hoje</GoBack>
            <Logout onClick={()=> logoutUser()}>Sair do TrackIt</Logout>
        </StyledUserPage>
    )
}

const StyledUserPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 30px;
    img{
        width: 200px;
        height: 200px;
        border-radius: 100px;
        margin-bottom: 50px;
        margin-top: 50px;
    }
    h2{
        font-size: 25px;
        font-weight: bold;
        color: #666666;
    }
`;

const GoBack = styled.button`
    border: none;
    color: #FFFFFF;
    font-weight: bold;
    background: #8FC549;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
`;

const Logout = styled.button`
    border: none;
    color: #FFFFFF;
    font-weight: bold;
    background: red;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
`;