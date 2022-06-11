export const SliderReduser = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'SLIDER_LOADED_SUCCESS':
            return {
                ...state,
                sliders: payload,
                sliderLoading: false
            }
        case 'SLIDER_ADD_SUCCESS':
            return {
                ...state,
                sliders: [...state.sliders, payload],

            }
        case 'DELETE_SLIDER':
            return {
                ...state,
                sliders: state.sliders.filter(sliders => sliders._id !== payload),
            }
        case 'UPDATE_SLIDER':
            const newSlider = state.sliders?.map(slider =>
                slider._id === payload._id ? payload : slider
            )
            return {
                ...state,
                sliders: newSlider,

            }
        case 'FIND_SLIDER':
            return { ...state, slider: payload }

        default:
            return state
    }
}