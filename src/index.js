import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './css/login.css';
import './css/reset.css';
import './css/timeline.css';
import { Route, Router, browserHistory } from 'react-router';
import { matchPattern } from 'react-router/lib/PatternUtils';
import Login from './componentes/Login';
import Logout from './componentes/Logout';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { timeline } from './reducers/timeline';
import { notificacao } from './reducers/header';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
const reducers = combineReducers({ timeline, notificacao });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));


function verificaAutenticacao(nextState, replace) {
    const resultado = matchPattern('/timeline(/:login)', nextState.location.pathname);
    const enderecoPrivadoTimeline = resultado.paramValues[0] === undefined;

    if (enderecoPrivadoTimeline && localStorage.getItem('auth-token') === null) {
        replace('/?msg=você precisa estar logado para acessar o endereço');
    }
}


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Login} />
            <Route path="/timeline(/:login)" component={App} onEnter={verificaAutenticacao} />
            <Route path="/logout" component={Logout} />
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
