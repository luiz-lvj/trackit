import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import {Day, Days, weekDays, selectedColors, unSelectedColors} from './DaysStyles';
import axios from 'axios';
import { IoTrashOutline } from "react-icons/io5";

export default function UserHabits(){

    const [habits, setHabits] = useState([]);
    const { loggedUser, setLoggeduSer } = useContext(UserContext);

    function loadHabits(){
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                "Authorization": `Bearer ${loggedUser.token}`
            }
        }
        const requestPromise = axios.get(url, config);
        requestPromise.then((request)=>{
            setHabits(request.data)
        })
    }

    useEffect(()=>{
        loadHabits();
    }, [])

    if(habits.length === 0){
        return(
            <UserHabitStyles>
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </UserHabitStyles>
        );
    }

    function deleteHabit(id){
        const confimation = window.confirm("Você tem certeza que deseja deletar esse hábito?");
        if(!confimation){
            return;
        }
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
        const config = {
            headers: {
                "Authorization": `Bearer ${loggedUser.token}`
            }
        }
        const requestPromise = axios.delete(url, config);
        requestPromise.then(()=>{
            alert('Seu hábito foi excluído com sucesso!');
            loadHabits();
        });
        requestPromise.catch(()=>{
            alert('Não conseguimos excluir seu hábito!');
        });
    }

    return(
        <UserHabitStyles>
            {habits.map((habit)=>{
                return(
                    <li key={habit.id}>
                        <HabitInfo>
                            <p>{habit.name}</p>
                            <Days>
                                {weekDays.map((day)=>{
                                    return(
                                        <Day key={day.id}
                                        border={habit.days.includes(day.id)
                                        ? selectedColors.border : unSelectedColors.border}

                                        background={habit.days.includes(day.id)
                                        ? selectedColors.background : unSelectedColors.background}

                                        color={habit.days.includes(day.id)
                                        ? selectedColors.color : unSelectedColors.color}
                                        >{day.name}</Day>
                                    );
                                })}
                            </Days>
                        </HabitInfo>
                        <Delete><IoTrashOutline onClick={()=>deleteHabit(habit.id)}/></Delete>
                    </li>
                );
            })}
            
        </UserHabitStyles>
    );
}

const UserHabitStyles = styled.ul`
    margin-top: 28px;
    p{
        color: #666666;
        font-size: 18px;
        display: inline-block;
        margin-bottom: 8px;
    }
    li{
        display: flex;
        justify-content: space-between;
        background: #FFFFFF;
        margin-bottom: 10px;
        padding: 13px;
    }
`;
const Delete = styled.li`
    display: flex;
    justify-content: right;
`;

const HabitInfo = styled.div`
    display: flex;
    flex-direction: column;
    ul li{
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
