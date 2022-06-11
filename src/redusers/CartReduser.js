export const CartReduser = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'CART_LOADED_SUCCESS':
            return {
                ...state,
                items: payload,
                cartLoading: false
            }
        case 'CART_ADD_SUCCESS':
            return {
                ...state,
                items: [...state.items, payload]
            }
        case 'DELETE_CART':
            return {
                ...state,
                items: state.items.filter(items => items._id !== payload)
            }
        case 'DELETE_ALL_ITEMS':
            return {
                items: []
            }
        case 'UPDATE_CART':
            const newCart = state.items.map(item =>
                item._id === payload._id ? payload : item
            )
            return {
                ...state,
                items: newCart
            }

        default:
            return state
    }
}