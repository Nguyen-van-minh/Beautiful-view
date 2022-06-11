export const OrderReduser = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'ORDER_LOADED_SUCCESS':
            return {
                ...state,
                orders: payload,
                orderLoading: false
            }
        case 'All_LOADED_SUCCESS':
            return {
                ...state,
                orders: payload,
                orderLoading: false
            }
        case 'ORDER_ADD_SUCCESS':
            return {
                ...state,
                orders: [...state.orders, payload]
            }
        case 'DELETE_ORDER':
            return {
                ...state,
                orders: state.orders.filter(order => order._id !== payload)
            }
        case 'UPDATE_ORDER':
            const newOrder = state.orders.map(order => order._id === payload._id ? payload : order)
            return {
                ...state,
                orders: newOrder
            }

        case 'FIND_ORDER':
            return { ...state, order: payload }

        case 'SET_ITEM':
            return { ...state, item: payload }

        default:
            return state
    }
}