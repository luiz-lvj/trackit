import logo from '../../img/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { LoginScreen, FormUser } from './LoginStyles';
import { useContext, useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import UserContext from '../contexts/UserContext';
import LoginLocalContext from '../contexts/LoginLocalContext';

export default function Login(){
    const history = useHistory();

    const {loggedUser, setLoggedUser} = useContext(UserContext);
    const { loginLocalName } = useContext(LoginLocalContext);

    const [emailUser, setEmailUser] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [loading, setLoading] = useState(false);

    if(loggedUser.id){
        history.push("/hoje");
        return "";
    }

    function loginUser(event){
        event.preventDefault();
        const url="https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        const data={
            email: emailUser,
            password: passwordUser
        }
        const loginRequest = axios.post(url, data);
        loginRequest.then((request)=>{
            setLoading(false);
            setLoggedUser(request.data);
            setEmailUser("");
            setPasswordUser("");
            saveLogin(request.data);
        });
        loginRequest.catch(()=>{
            setLoading(false);
            setEmailUser("");
            setPasswordUser("");
            alert("Não foi possível logar. Tente novamente");
        });
    }

    function saveLogin(userData){
        
        const strData = JSON.stringify(userData);
        localStorage.setItem(loginLocalName, strData);
    }

    function getSavedLogin(){
        const loginStr = localStorage.getItem(loginLocalName);
        if(!loginStr){
            return;
        }
        const loginObj = JSON.parse(loginStr);
        setLoggedUser(loginObj);
        history.push("/hoje");
    }
    getSavedLogin();

    return(
        <LoginScreen>
            <img src={logo} alt="" />
            <FormUser>
                <form onSubmit={loginUser}>
                    <input type="email" placeholder="email" value={emailUser}
                    onChange={e => setEmailUser(e.target.value)} disabled={loading}></input>

                    <input type="password" placeholder="senha" value={passwordUser}
                    onChange={e=> setPasswordUser(e.target.value)} disabled={loading}></input>

                    <button type="submit" onClick={()=>setLoading(true)} disabled={loading}>
                    {loading ?
                    <Loader type="ThreeDots" color="#FFFFFF" height={13} width={80} />
                    :"Entrar"}</button>
                </form>
                <Link to="/cadastro" onClick={e => loading ? e.preventDefault() : ""}>Não tem uma conta? Cadastre-se!</Link>
            </FormUser>
        </LoginScreen>
    );
}

