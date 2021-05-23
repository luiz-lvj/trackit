import logo from '../../img/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { LoginScreen, FormUser } from './LoginStyles';
import { useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

export default function Register(){
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    function registerUser(event){
        event.preventDefault();
        const url= "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
        const body = {
            email: email,
            password: password,
            image: image,
            name: name
        }

        const requestRegister = axios.post(url, body);
        requestRegister.then((request)=>{
            setLoading(false);
            setEmail("");
            setPassword("");
            setName("");
            setImage("");
            setLoading("");
            history.push("/");
        });
        requestRegister.catch(()=>{
            setLoading(false);
            setEmail("");
            setPassword("");
            setName("");
            setImage("");
            setLoading("");
            alert("Ops, não conseguimos te cadastrar. Tente novamente");
        })
    }

    return(
        <LoginScreen>
            <img src={logo} alt="" />
            <FormUser>
                <form onSubmit={registerUser}>
                    <input type="email" placeholder="email" value={email}
                    onChange={e => setEmail(e.target.value)} disabled={loading} ></input>

                    <input type="password" placeholder="senha" value={password}
                    onChange={e => setPassword(e.target.value)} disabled={loading}></input>

                    <input type="text" placeholder="nome" value={name}
                    onChange={e => setName(e.target.value)} disabled={loading}></input>

                    <input type="text" placeholder="foto" value={image}
                    onChange={e => setImage(e.target.value)} disabled={loading}></input>
                    
                    <button type="submit"onClick={()=>setLoading(true)} disabled={loading}>
                    {loading ?
                    <Loader type="ThreeDots" color="#FFFFFF" height={13} width={80} />
                    : "Cadastrar"}</button>
                </form>
                <Link to="/">Já tem uma conta? Faça login!</Link>
            </FormUser>
        </LoginScreen>
    );
}