import Header from '../utils/Header';
import Footer from '../utils/Footer';
import PageStyle from '../utils/PageStyle'
import { useContext} from 'react';
import UserContext from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import TodayHabits from './TodayHabits';

export default function TodayScreen(){
    const history = useHistory();
    const {loggedUser, setLoggedUser} = useContext(UserContext);

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
    return(
        <PageStyle>
            <Header/>
            <h2>{weekDay}, {monthDay > 9 ? monthDay : '0' + monthDay}/ {month > 9 ? month : '0' + month}</h2>
            <TodayHabits/>
            <Footer/>
        </PageStyle>
    );
}

