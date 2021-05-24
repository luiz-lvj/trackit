import { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import LoginLocalContext from '../contexts/LoginLocalContext';
import UserContext from '../contexts/UserContext';
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import PageStyle from '../utils/PageStyle';

export default function UserPage(){
    const {loggedUser, setLoggedUser } = useContext(UserContext);
    const history = useHistory();
    const { loginLocalName } = useContext(LoginLocalContext);
    if(!loggedUser.id){
        history.push("/hoje");
        return "";
    }

    function logoutUser(){
        setLoggedUser({});
        localStorage.removeItem(loginLocalName);
        history.push("/");
    }

    return(
        <PageStyle>
            <h2>Seu Perfil</h2>
            <Header/>
            <ContainerInfo>
                <ImgProfile src={loggedUser.image}></ImgProfile>
                <h2>{loggedUser.name}</h2>
            </ContainerInfo>
            
            
            <Logout onClick={()=> logoutUser()}>Sair do TrackIt</Logout>
            <Footer/>
        </PageStyle>
    )
}

const ImgProfile = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 100px;
    margin-bottom: 50px;
    margin-top: 50px;
        
`;
const ContainerInfo = styled.div`
    text-align: center;
    h2{
        font-size: 25px;
        font-weight: bold;
        color: #666666;
    }
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