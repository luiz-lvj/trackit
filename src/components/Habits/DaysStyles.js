import styled from 'styled-components';

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
const Days = styled.ul`
    display: flex;
`;

const Day = styled.li`
    height: 30px;
    width: 30px;
    border: 1px solid ${props => props.border} !important;
    background: ${props => props.background} !important;
    color: ${props => props.color} !important;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-right: 3px;
`;

export  {Day, Days, weekDays, selectedColors, unSelectedColors};