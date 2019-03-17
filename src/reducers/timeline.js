//REDUCER
export function timeline(state = [], action) {
    if (action.type === 'LISTAGEM') {
        return action.fotos;
    }

    if (action.type === 'COMENTARIO') {
        const fotoId = action.fotoId;
        const novoComentario = action.novoComentario;

        const fotoAchada = state.find(foto => foto.id === fotoId)
        fotoAchada.comentarios.push(novoComentario);

        return state;
    }

    if (action.type === 'LIKE') {
        const fotoAchada = state.find(foto => foto.id === action.fotoId);
        fotoAchada.likeada = !fotoAchada.likeada;

        const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === action.liker.login);

        if (possivelLiker === undefined) {
            fotoAchada.likers.push(action.liker);
        } else {
            const likers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== action.liker.login);
            fotoAchada.likers = likers
        }


        return state;
    }

    return state;
}