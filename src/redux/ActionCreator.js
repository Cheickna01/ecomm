import * as ActionType from './ActionTypes'

export const addToCart = (product) =>({
    type : ActionType.ADD_TO_CART,
    payload : {
        product : product
    }
})

export const addQuantity = (id) =>({
    type : ActionType.ADD_QUANTITY,
    payload : {
        id : id
    }
})

export const removeQuantity = (id) =>({
    type : ActionType.REMOVE_QUANTITY,
    payload : {
        id : id
    }
})

export const removeToCart = (id) =>({
    type : ActionType.REMOVE_TO_CART,
    payload : {
        id : id
    }
})

