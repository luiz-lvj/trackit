import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { IoCheckmarkSharp } from "react-icons/io5";
import axios from 'axios';

export default function TodayHabits(){
    const {loggedUser, setLoggedUser} = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [habitsAvailable, setHabitsAvailable] = useState(false);
    const [disableSelection, setDisableSelection] = useState(false);

    const doneColor = "#8FC549";
    const unDoneColorLight = "#EBEBEB";
    const unDoneColorDark = "#BABABA";
    const normalTextColor = "#666666";

    useEffect(()=>{
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const config = {
            headers: {
                "Authorization": `Bearer ${loggedUser.token}`
            }
        }
        const requestPromise = axios.get(url, config);
        setHabitsAvailable(false)
        requestPromise.then((request)=>{
            setHabits(request.data);
            console.log(request);
            alert('foi');
            setHabitsAvailable(true);
        })
        requestPromise.catch(()=>{
            alert('não foi');
            setHabitsAvailable(true);
        })
    },[]);

    function checkHabit(id){
        if(disableSelection){
            return;
        }
        setDisableSelection(true);
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
        const config = {
            headers: {
                "Authorization": `Bearer ${loggedUser.token}`
            }
        }
        const body = {}
        const requestPromise = axios.post(url,body, config);
        requestPromise.then(()=>{
            const tmpHabits = [...habits]
            tmpHabits.forEach((habit)=>{
                if(habit.id === id){
                    habit.done = true;
                }
            });
            setHabits(tmpHabits);
            setDisableSelection(false);
        });
        requestPromise.catch(()=>{
            alert('Não foi possível marcar seu hábito como feito');
            setDisableSelection(false);
        });
    }

    function unCheckHabit(id){
        if(disableSelection){
            return;
        }
        setDisableSelection(true);
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
        const config = {
            headers: {
                "Authorization": `Bearer ${loggedUser.token}`
            }
        }
        const body = {}
        const requestPromise = axios.post(url,body, config);
        requestPromise.then(()=>{
            const tmpHabits = [...habits]
            tmpHabits.forEach((habit)=>{
                if(habit.id === id){
                    habit.done = false;
                }
            });
            setHabits(tmpHabits);
            setDisableSelection(false);
        });
        requestPromise.catch((request)=>{
            alert('Não foi possível desmarcar seu hábito como feito');
            setDisableSelection(false);
            console.log(request)
        });
    }

    

    if(!habitsAvailable){
        return(
            <HabitsStyles>
                <HabitInfo>
                    <h3>Carregando seus Hábitos de hoje</h3>
                </HabitInfo>
            </HabitsStyles>
        );
    }
    /* Voltar AQUIIIIIIII */
    function getConcludedHabits(){
        let concluded = 0;
        habits.forEach((habit)=>{
            if(habit.done){
                concluded += 1;
            }
        });
        return Math.round(concluded/habits.length());
    }
    return(
        <HabitsStyles>
            {habits.map((habit)=>{
                return(
                    <li key={habit.id}>
                        <HabitInfo>
                            <h3>{habit.name}</h3>
                            <p>Sequência atual: <SequenceStyle color={doneColor}>
                                {habit.currentSequence} dias</SequenceStyle></p>
                            <p>Seu recorde: <SequenceStyle color={
                                habit.currentSequence === habit.highestSequence && habit.done
                                ? doneColor
                                : normalTextColor 
                            }>{habit.highestSequence} dias</SequenceStyle></p>
                        </HabitInfo>
                        <BoxSelection 
                        color={habit.done ? doneColor: unDoneColorLight}
                        onClick={habit.done 
                        ? ()=> unCheckHabit(habit.id)
                        : ()=> checkHabit(habit.id)}>
                            <IoCheckmarkSharp color={'#FFFFFF'} size={'36px'}/>
                        </BoxSelection>
                    </li>
                );
            })}
            {/*<li>
                <HabitInfo>
                    <h3>Ler capítulo do livro aaaaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaa</h3>
                    <p>Sequência atual: <SequenceStyle color={doneColor}>4 dias</SequenceStyle></p>
                    <p>Seu recorde: <SequenceStyle color={
                        habit
                    }>5 dias</SequenceStyle></p>
                </HabitInfo>
                <BoxSelection color={false ? doneColor: unDoneColorLight}>
                    <IoCheckmarkSharp color={'#FFFFFF'} size={'36px'}/>
                </BoxSelection>
                </li>*/}
        </HabitsStyles>
    );
}

const HabitsStyles = styled.ul`
    margin-top: 28px;
    li{
        background: #FFFFFF;
        border-radius: 5px;
        padding: 14px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
`;

const BoxSelection = styled.div`
    background: ${props => props.color};
    width: 69px;
    height: 69px;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HabitInfo = styled.div`
    max-width: 220px;
    overflow: hidden;
    h3{
        color: #666666;
        font-size: 20px;
        display: block;
        margin-bottom: 8px;
    }
    p{
        color: #666666;
        font-size: 13px;
    }
`;

const SequenceStyle = styled.span`
    color: ${props => props.color}
`;