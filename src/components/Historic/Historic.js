import PageStyle from '../utils/PageStyle';
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import styled from 'styled-components';

export default function Historic(){
    const [today, setToday] = useState(new Date());
    const history = useHistory();
    const {loggedUser} = useContext(UserContext);
    const [daysHabits, setDaysHabits] = useState([]);
    useEffect(()=>{
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
        const config = {
            headers: {
                "Authorization": `Bearer ${loggedUser.token}`
            }
        }
        const requestPromise = axios.get(url, config);
        requestPromise.then((request)=>{
            setDaysHabits(request.data);
        });
        requestPromise.catch(()=>{
            alert('Houve um problema com o calendário');
        })
    });
    if(!loggedUser.id){
        history.push("/hoje");
        return "";
    }
    if(!daysHabits[0]){
        return(
            <PageStyle>
                <h2>Carregando o calendário</h2>
            </PageStyle>
        );
    }

    const daysFullyDone = daysHabits.filter((day)=>{
        for(let habit in day.habits){
            if(!habit.done){
                return false;
            }
        }
        return true;
    }).map((day)=>day.day.replace("/", " "));

    const daysNotFullyDone = daysHabits.filter((day)=>{
        let allDone = true;
        for(let habit in day.habits){
            if(!habit.done){
                allDone = false;
            }
        }
        return allDone;
    }).map((day)=>day.day.replace("/", " "));

    /* Calendário Ainda não estilizado de acordo com os hábitos */

    return(
        <PageStyle>
            <Header/>
                <h2>Histórico</h2>
                <ContainerCalendar>
                    <Calendar
                    value={today}
                    onChange={setToday}
                    />
                </ContainerCalendar>
                
            <Footer/>
        </PageStyle>
    );
}

const ContainerCalendar = styled.div`
    margin-top: 15px;
`;