import React, { Component } from 'react';
import FotoItem from './FotoItem';
import TimelineApi from '../stores/TimelineApi';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = { fotos: [] };
        this.login = this.props.login;
    }

    componentDidMount() {
        this.carregaFotos(this.props);
    }

    componentWillMount() {
        this.props.store.subscribe(() => {
            this.setState({ fotos: this.props.store.getState() });
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
        // TimelineApi.lista(urlPerfil, this.props.store);
        this.props.store.dispatch(TimelineApi.lista(urlPerfil));
        // this.props.store.lista(urlPerfil)
    }

    like(fotoId) {
        this.props.store.dispatch(TimelineApi.like(fotoId));
    }

    comenta(fotoId, comentario) {
        this.props.store.dispatch(TimelineApi.comenta(fotoId, comentario));
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