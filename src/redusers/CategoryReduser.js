export const CategoryReduser = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'CATEGORY_LOADED_SUCCESS':
            return {
                ...state,
                categorys: payload,
                categoryLoading: false
            }
        case 'CATEGORY_ADD_SUCCESS':
            return {
                ...state,
                categorys: [...state.categorys, payload]
            }
        case 'DELETE_CATEGORY':
            return {
                ...state,
                categorys: state.categorys.filter(categorys => categorys._id !== payload)
            }
        case 'UPDATE_CATEGORY':
            const newCategory = state.categorys.map(category =>
                category._id === payload._id ? payload : category
            )
            return {
                ...state,
                categorys: newCategory
            }

        default:
            return state
    }
}