import React, { Component } from 'react';
import FotoItem from './FotoItem';
import TimelineApi from '../stores/TimelineApi';
import { connect } from 'react-redux';

class Timeline extends Component {

    constructor(props) {
        super(props);
        this.login = this.props.login;
    }

    componentDidMount() {
        this.carregaFotos(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login !== this.login) {
            this.login = nextProps.login;
            this.carregaFotos(nextProps)
        }
    }

    carregaFotos(props) {
        let urlPerfil;
        if (props.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        }
        else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${props.login}`;
        }
        this.props.lista(urlPerfil);
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.props.fotos.map(foto => {
                        return <FotoItem key={foto.id} foto={foto} like={this.props.like} comenta={this.props.comenta} />
                    })
                }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return { fotos: state.timeline }
}
const mapDispatchToProps = dispatch => {
    return {
        like: fotoId => {
            dispatch(TimelineApi.like(fotoId));
        },
        comenta: (fotoId, comentario) => {
            dispatch(TimelineApi.comenta(fotoId, comentario));
        },
        lista : (urlPerfil)=> {
            dispatch(TimelineApi.lista(urlPerfil));
        }
    }
}
const TimeLineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);


export default TimeLineContainer