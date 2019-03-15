import React, { Component } from 'react';
import FotoItem from './FotoItem';
import LogicaTimeline from '../logicas/LogicaTimeline';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = { fotos: [] };
        this.login = this.props.login;
        this.logicaTimeline = new LogicaTimeline([]);
    }

    componentDidMount() {
        this.carregaFotos(this.props);
    }

    componentWillMount() {
        this.logicaTimeline.subscribe(fotos => {
            this.setState({ fotos: fotos });
        })
    }

    componentWillReceiveProps(nextProps) {
        this.carregaFotos(nextProps)
    }

    carregaFotos(props) {
        let urlPerfil;
        if (props.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        }
        else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${props.login}`;
        }
        
        this.logicaTimeline.lista(urlPerfil)
    }

    like(fotoId) {
        this.logicaTimeline.like(fotoId);
    }

    comenta(fotoId, comentario) {
        this.logicaTimeline.comenta(fotoId, comentario);
    }

    render() {
        return (
            <div className="fotos container">

                {
                    this.state.fotos.map(foto => {
                        return <FotoItem key={foto.id} foto={foto} like={this.like.bind(this)} comenta={this.comenta.bind(this)} />
                    })
                }

            </div>
        );
    }
}