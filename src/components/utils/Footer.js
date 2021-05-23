import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

export default function Footer(){
    const value = 0.75
    return(
        <FooterStyle>
            <Link to="/habitos">Hábitos</Link>

            <Link to="/hoje"><ContainerProgress>
                <CircularProgressbar value={value} maxValue={1} text={"Hoje"}
                background
                backgroundPadding={6}
                styles={buildStyles({
                        backgroundColor: "#3e98c7",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                })}/>
            </ContainerProgress></Link>

            <Link to="/historico">Histórico</Link>            
        </FooterStyle>
    );
}

const FooterStyle = styled.div`
    position: fixed;
    bottom: 0;
    right:0;
    left: 0;
    height: 70px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 36px;
    padding-right: 36px;
    a{
        text-decoration: none;
        color: #52B6FF;
        font-size: 18px;
    }
`;
const ContainerProgress = styled.div`
    height: 91px;
    width: 91px;
    position: fixed;
    bottom: 19px;
    right: calc(50% - 45.5px);
`;