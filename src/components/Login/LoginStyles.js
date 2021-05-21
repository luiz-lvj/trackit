import styled from 'styled-components';

export const LoginScreen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 36px;
    padding-left: 36px;
    padding-top: 68px;
    img{
        width: 180px;
        height: 178px;
        margin-bottom: 33px;
    }
`;

export const FormUser = styled.div`
    display: flex;
    flex-direction: column;
    form{
        display: flex;
        flex-direction: column;
        margin-bottom: 25px;
        width: 100%;
        align-items: center;
    }
    form input{
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        height: 45px;
        padding-left: 4px;
        margin-bottom: 6px;
        font-size: 20px;
        color:#DBDBDB;
        width: 100%;
        max-width: 303px;
    }
    form input::placeholder{
        color: #DBDBDB;
    }
    form input:disabled{
        background: #F2F2F2;
    }
    form button{
        border: none;
        border-radius: 5px;
        background: #52B6FF;
        height: 45px;
        color: #FFFFFF;
        font-size: 21px;
        width: 100%;
        max-width: 303px;
    }
    form button:disabled{
        opacity: 0.7;
    }
    a{
        color: #52B6FF;
        font-size: 13px;
        text-align: center;
    }

`;