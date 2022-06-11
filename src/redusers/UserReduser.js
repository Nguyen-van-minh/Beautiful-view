export const UserReduser = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'USERS_LOADED_SUCCESS':
            return {
                ...state,
                listUser: payload,
                loading: false
            }
        case 'ADD_USERS_SUCCESS':
            return {
                ...state,
                listUser: [...state.listUser, payload]
            }
        case 'DELETE_USER':
            return {
                ...state,
                listUser: state.listUser.filter(user => user._id !== payload)
            }
        case 'UPDATE_USER':
            const newUsers = state.listUser.map(user =>
                user._id === payload._id ? payload : user
            )
            return {
                ...state,
                listUser: newUsers
            }

        default:
            return state
    }
}