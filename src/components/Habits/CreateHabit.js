import { useContext, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import axios from 'axios';

export default function CreateHabit(props){
    const [habitName, setHabitName] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const { loggedUser, setLoggedUser } = useContext(UserContext);

    const weekDays = [
        { name: "D", id: 0 },
        { name: "S", id: 1 },
        { name: "T", id: 2 },
        { name: "Q", id: 3 },
        { name: "Q", id: 4 },
        { name: "S", id: 5 },
        { name: "S", id: 6 }
    ]

    const selectedColors = {
        border: "#CFCFCF",
        background: "#CFCFCF",
        color: "#FFFFFF"
    }
    
    const unSelectedColors = {
        border: "#D5D5D5",
        background: "#FFFFFF",
        color: "#DBDBDB"
    }

    function toggleSelection(id){
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
                <button onClick={createHabit}>Salvar</button>
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
    }
    input::placeholder{
        color: #DBDBDB;
    }
`;

const Days = styled.ul`
    display: flex;
`;

const Day = styled.li`
    height: 30px;
    width: 30px;
    border: 1px solid ${props => props.border};
    background: ${props => props.background};
    color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-right: 3px;
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
`