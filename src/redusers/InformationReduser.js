export const InformationReduser = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'INFORMATION_LOADED_SUCCESS':
            return {
                ...state,
                informations: payload,
                informationLoading: false
            }
        case 'INFORMATION_ADD_SUCCESS':
            return {
                ...state,
                informations: [...state.informations, payload]
            }
        case 'UPDATE_INFORMATION':
            const newInformation = state.informations.map(information =>
                information._id === payload._id ? payload : information
            )
            return {
                ...state,
                informations: newInformation
            }
        case 'FIND_INFORMATION':
            return { ...state, information: payload }

        default:
            return state
    }
}