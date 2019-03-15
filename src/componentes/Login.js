
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class Login extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = { msg: this.props.location.query.msg };

        this.envia = this.envia.bind(this);
    }

    envia(evento) {
        evento.preventDefault();
        const requestInfo = {
            method: 'post',
            body: JSON.stringify({ login: this.login.value, senha: this.senha.value }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };
        fetch("http://localhost:8080/api/public/login", requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Não foi possivel fazer login!');
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                browserHistory.push('/timeline');
            })
            .catch(err => {
                this.setState({ msg: err.message });
            });
    }


    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo"> Instalura </h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia}>
                    <input type="text" ref={(input) => this.login = input} />
                    <input type="password" ref={(input) => this.senha = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}