export const ImageReduser = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'GET_ALL_IMAGES':
            return {
                ...state,
                images: payload,
                imagesLoading: false
            }
        case 'IMAGE_ADD_SUCCESS':
            return {
                ...state,
                images: [...state.images, payload],

            }
        case 'DELETE_IMAGE':
            return {
                ...state,
                images: state.images.filter(image => image._id !== payload),
            }

        case 'RESET_IMAGE':
            return {
                ...state,
                images: [],
            }



        default:
            return state
    }
}