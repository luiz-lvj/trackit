import styled from 'styled-components';
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import PageStyle from '../utils/PageStyle';
import { useHistory } from 'react-router';
import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { IoAdd } from "react-icons/io5";
import CreateHabit from './CreateHabit';
import UserHabits from './UserHabits';

export default function HabitScreen(){
    const history = useHistory();
    const { loggedUser } = useContext(UserContext);
    const [inCreation, setInCreation] = useState(false);

    if(!loggedUser.id){
        history.push("/");
        return "";
    }

    return(
        <PageStyle>
            <Header/>
            <PageTop>
                <h2>Meus Hábitos</h2>
                <div onClick={()=>setInCreation(true)}><IoAdd color={'#FFFFFF'} size={'27px'}/></div>
            </PageTop>
            {inCreation ? <CreateHabit setInCreation={setInCreation}/> : ""}
            <UserHabits/>
            <Footer/>
        </PageStyle>
    );
}

const PageTop = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    div{
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;