export const ReviewReduser = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'REVIEW_LOADED_SUCCESS':
            return {
                ...state,
                reviews: payload,
                reviewLoading: false
            }
        case 'REVIEW_ADD_SUCCESS':
            return {
                ...state,
                reviews: [...state.reviews, payload]
            }
        case 'DELETE_REVIEW':
            return {
                ...state,
                reviews: state.reviews.filter(review => review._id !== payload)
            }


        default:
            return state
    }
}