import PubSub from 'pubsub-js';

export default class LogicaTimeline {

    constructor(fotos) {
        this.fotos = fotos;
    }

    subscribe(callback) {
        PubSub.subscribe('timeline', (topico, fotos) => {
            callback(fotos)
        })

    }

    comenta(fotoId, comentario) {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ texto: comentario }),
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
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId)
                fotoAchada.comentarios.push(novoComentario);
                PubSub.publish('timeline', this.fotos);
            })
    }

    like(fotoId) {
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
                debugger;
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
                fotoAchada.likeada = !fotoAchada.likeada;

                const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);

                if (possivelLiker === undefined) {
                    fotoAchada.likers.push(liker);
                } else {
                    const likers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
                    fotoAchada.likers = likers
                }

                PubSub.publish('timeline', this.fotos);
            });
    }

    lista(urlPerfil) {
        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                this.fotos = fotos;
                PubSub.publish('timeline', fotos);
            });
    }

}