import React, { useState } from 'react';
import GlobalStyle from './resetCSS';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Login/Register';
import UserContext from './contexts/UserContext';

export default function App(){
    const [loggedUser, setLoggedUser] = useState({});
    return(
        <UserContext.Provider value={{ loggedUser, setLoggedUser }}>

        <React.Fragment>
            <GlobalStyle/>
        </React.Fragment>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Login/>
                </Route>
                <Route path="/cadastro" exact>
                    <Register/>
                </Route>

            </Switch>
        </BrowserRouter>

        </UserContext.Provider>
    );
}