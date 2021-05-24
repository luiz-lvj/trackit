import styled from 'styled-components';
import { useContext} from 'react';
import UserContext from '../contexts/UserContext';
import { useHistory } from 'react-router';

export default function Header(){
    const history = useHistory()
    const {loggedUser, setLoggedUser} = useContext(UserContext);
    return(
        <HeaderStyle>
            <h1>TrackIt</h1>
            <img src={loggedUser.image} alt="" onClick={()=>history.push("/perfil")}></img>
        </HeaderStyle>
    );
}

const HeaderStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 18px;
    padding-right: 18px;
    h1{
        font-family: 'Playball', cursive;
        font-size: 39px;
        color: #FFFFFF;
    }
    img{
        height: 51px;
        width: 51px;
        border-radius: 51px;
    }
`;

