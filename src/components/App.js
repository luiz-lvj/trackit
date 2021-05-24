import React, { useState } from 'react';
import GlobalStyle from './resetCSS';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Login/Register';
import UserContext from './contexts/UserContext';
import TodayScreen from './Today/TodayScreen';
import HabitScreen from './Habits/HabitScreen';
import PercentageContext from './contexts/PercentageContext';
import LoginLocalContext from './contexts/LoginLocalContext';

export default function App(){
    const [loggedUser, setLoggedUser] = useState({});
    const [percentageConcluded, setPercentageConcluded] = useState(0);
    const loginLocalName = "loginTrackIt";
    return(
        <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
            <PercentageContext.Provider value={{ percentageConcluded, setPercentageConcluded }}>
                <LoginLocalContext.Provider value={loginLocalName}>
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
                            <Route path="/hoje" exact>
                                <TodayScreen/>
                            </Route>
                            <Route path="/habitos" exact>
                                <HabitScreen/>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </LoginLocalContext.Provider>
            </PercentageContext.Provider>
        </UserContext.Provider>
    );
}