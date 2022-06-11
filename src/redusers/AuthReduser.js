export const authReduser = (state, action) => {
    const { type, payload: { isAuthenticated, user, isCustomer } } = action

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
                isCustomer,
            }
        default:
            return state
    }
}