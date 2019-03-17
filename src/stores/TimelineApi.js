import { listagem, comentario, like, notifica } from '../actions/actionCreator';

export default class TimelineApi {

    static comenta(fotoId, textoComentario) {
        return dispatch => {

            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({ texto: textoComentario }),
                headers: new Headers({
                    'Content-type': 'application/json'
                })
            };

            fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error('Não foi possível comentar');
                })
                .then(novoComentario => {
                    dispatch(comentario(fotoId, novoComentario));
                    return novoComentario;
                })
        }
    }

    static like(fotoId) {
        return dispatch => {
            fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, {
                method: 'POST',
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error("Não foi possível realizar o like da foto");
                    }
                })
                .then(liker => {
                    dispatch(like(fotoId, liker));
                    return liker;
                });
        }
    }

    static lista(urlPerfil) {
        return dispatch => {
            fetch(urlPerfil)
                .then(response => response.json())
                .then(fotos => {
                    dispatch(listagem(fotos));
                    return fotos;
                });
        }
    }

    static pesquisa(login) {
        return dispatch => {
            fetch(`http://localhost:8080/api/public/fotos/${login}`)
                .then(res => res.json())
                .then(fotos => {
                    if(fotos.length === 0){
                        dispatch(notifica('usuário não encontrado'));
                    }
                    dispatch(listagem(fotos));
                    return fotos;
                });
        }
    }
}