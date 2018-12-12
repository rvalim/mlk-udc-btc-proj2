import * as types from './star.actions.types'

export function registerStar(star){
    return {type: types.REGISTER, params: star}
}

export function putForSale(params){
    return {type: types.PUT_FOR_SALE, params}
}

export function buyStar(params){
    console.log('entrou no action', params);
    return {type: types.BUY_STAR, params}
}

export function getStar(tokenId){
    return {type: types.GET_STAR, params: tokenId}
}