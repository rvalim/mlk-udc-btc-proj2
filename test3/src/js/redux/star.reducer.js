import * as types from './star.actions.types'

function StarReducer(state = [], action) {
    var params = action.params
    console.log('entrou no reducer', state, params);

    switch (action.type) {
        case types.REGISTER:
            return [
                ...state,
                {
                    name: params.name,
                    story: params.story,
                    ra: params.ra,
                    dec: params.dec,
                    cent: params.cent
                }
            ]
        case types.GET_STAR:
            return [
                ...state,
                {
                    tokenId: params.tokenId,
                }
            ]
        case types.PUT_FOR_SALE:
        case types.BUY_STAR:
            return [
                ...state,
                {
                    tokenId: params.tokenId,
                    price: params.price
                }
            ]
        default:
            return state
    }
}


export default StarReducer