import Header from '../utils/Header';
import Footer from '../utils/Footer';
import PageStyle from '../utils/PageStyle'
import { useContext, useState} from 'react';
import UserContext from '../contexts/UserContext';
import PercentageContext from '../contexts/PercentageContext';
import { useHistory } from 'react-router-dom';
import TodayHabits from './TodayHabits';
import styled from 'styled-components';

export default function TodayScreen(){
    const history = useHistory();
    const {loggedUser, setLoggedUser} = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const { percentageConcluded, setPercentageConcluded } = useContext(PercentageContext);
    const unDoneColorDark = "#BABABA";
    const doneColor = "#8FC549";

    if(!loggedUser.id){
        history.push("/");
        return "";
    }
    
    function getWeekDay(dayNumber){
        const weeekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        return weeekdays[dayNumber];
    }
    
    const date = new Date();
    const weekDay = getWeekDay(date.getDay());
    const monthDay = date.getDate();
    const month = date.getMonth() +1;

    function getConcludedPercentage(){
        let concluded = 0;
        habits.forEach((habit)=>{
            if(habit.done){
                concluded += 1;
            }
        });
        const percentage = Math.round(100*concluded/habits.length)/100;
        setPercentageConcluded(percentage);
        return percentage;
    }

    return(
        <PageStyle>
            <Header/>
            <h2>{weekDay}, {monthDay > 9 ? monthDay : '0' + monthDay}/ {month > 9 ? month : '0' + month}</h2>
            {habits[0] && getConcludedPercentage()*100 > 0
            ? <SubtitleInfo color={doneColor}>{habits[0] ? getConcludedPercentage()*100: ""}% dos hábitos concluídos</SubtitleInfo>
            : <SubtitleInfo color={unDoneColorDark}>Nenhum hábito concluído ainda</SubtitleInfo>
            }
            <TodayHabits habits={habits} setHabits={setHabits}/>
            <Footer/>
        </PageStyle>
    );
}

const SubtitleInfo = styled.p`
    display: block;
    margin-top: 6px;
    font-size: 18px;
    color: ${props => props.color}
`;

