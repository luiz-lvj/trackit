import { useContext, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import {Day, Days, weekDays, selectedColors, unSelectedColors} from './DaysStyles';

export default function CreateHabit(props){
    const [habitName, setHabitName] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const { loggedUser, setLoggedUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    function toggleSelection(id){
        if(loading){
            return;
        }
        if(selectedDays.includes(id)){
            const idx = selectedDays.indexOf(id);
            let tmpSelected = [...selectedDays];
            tmpSelected.splice(idx, 1);
            setSelectedDays(tmpSelected);
        }
        else {
            setSelectedDays([...selectedDays, id]);
        }
    }

    function endCreation(){
        setHabitName("");
        setSelectedDays("");
        props.setInCreation(false);
    }

    function createHabit(){
        setLoading(true);
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                "Authorization": `Bearer ${loggedUser.token}`
            }
        }
        const body = {
            name: habitName,
            days: selectedDays
        }
        const requestPromise = axios.post(url, body, config);
        requestPromise.then((request)=>{
            alert(`Hábito ${request.data.name} criado com sucesso!`);
            endCreation();
            setLoading(false);
        });
        requestPromise.catch(()=>{
            alert('Não conseguimos criar seu hábito. Tente novamente');
            setLoading(false);
        })
    }

    return(
        <CreationStyle>
            <input 
            placeholder="nome do hábito"
            value={habitName}
            onChange={e => setHabitName(e.target.value)}></input>
            <Days>
                {weekDays.map((day)=>{
                    return(
                        <Day key={day.id}
                        onClick = {()=>toggleSelection(day.id)}
                        border={selectedDays.includes(day.id)
                        ? selectedColors.border : unSelectedColors.border}

                        background={selectedDays.includes(day.id)
                        ? selectedColors.background : unSelectedColors.background}

                        color={selectedDays.includes(day.id)
                        ? selectedColors.color : unSelectedColors.color}
                        >{day.name}</Day>
                    );
                })}
            </Days>
            <CreationActions>
                <p onClick={endCreation}>Cancelar</p>
                <button onClick={createHabit} disabled={loading}>
                    {loading ?
                    <Loader type="ThreeDots" color="#FFFFFF" height={13} width={80} />
                    :"Salvar"}
                </button>
            </CreationActions>
        </CreationStyle>
    );
}

const CreationStyle = styled.div`
    height: 180px;
    background: #FFFFFF;
    margin-top: 20px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
    input{
        color: #DBDBDB;
        margin-bottom: 10px;
    }
    input::placeholder{
        color: #DBDBDB;
    }
`;

const CreationActions = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    width: 100%;
    p{
        color: #52B6FF;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }
    button{
        border: none;
        background: #52B6FF;
        border: none;
        width: 35px;
        color: #FFFFFF;
        width: 84px;
        height: 35px;
        border-radius: 5px;
        margin-left: 40px;
        cursor: pointer;
    }
    button:disabled{
        opacity: 0.7;
    }
`