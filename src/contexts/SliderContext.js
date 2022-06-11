import { createContext, useReducer } from "react";
import axios from 'axios'
import { SliderReduser } from "../redusers/SliderReduser";
import { apiUrl } from "./constants";


export const SliderContext = createContext()

const SliderContextProvider = ({ children }) => {
    //state
    const [sliderState, dispatch] = useReducer(SliderReduser, {
        sliders: [],
        sliderLoading: true
    })

    // get all products
    const getAllSlider = async () => {
        try {
            const response = await axios.get(`${apiUrl}/slider`)
            if (response.data.success) {
                dispatch({ type: 'SLIDER_LOADED_SUCCESS', payload: response.data.sliders })
                // console.log(response.data.products)
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //add
    const addSlider = async newSlider => {

        try {
            const response = await axios.post(`${apiUrl}/slider/addSlider`, newSlider)
            if (response.data.success) {
                dispatch({ type: 'SLIDER_ADD_SUCCESS', payload: response.data.slider })
                return response.data

            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //delete
    const deleteSlider = async sliderId => {
        try {
            const response = await axios.delete(`${apiUrl}/slider/${sliderId}`)
            if (response.data.success)
                dispatch({ type: 'DELETE_SLIDER', payload: sliderId })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    // Update 
    const updateSlider = async (id, updateData) => {
        try {
            const response = await axios.put(
                `${apiUrl}/slider/${id}`,
                updateData
            )
            if (response.data.success) {
                dispatch({ type: 'UPDATE_SLIDER', payload: response.data.slider })
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }

    const findSlider = sliderId => {
        const slider = sliderState.sliders.find(slider => slider._id === sliderId)
        dispatch({ type: 'FIND_SLIDER', payload: slider })
    }
    //productContextData
    const sliderContextData = { sliderState, getAllSlider, addSlider, deleteSlider, updateSlider, findSlider }
    return (
        <SliderContext.Provider value={sliderContextData}>
            {children}
        </SliderContext.Provider>
    )
}

export default SliderContextProvider