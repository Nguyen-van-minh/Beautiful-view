import { createContext, useReducer } from "react";
import axios from 'axios'
import { ImageReduser } from "../redusers/ImageReduser";
import { apiUrl } from "./constants";


export const ImageContext = createContext()

const ImageContextProvider = ({ children }) => {
    //state
    const [imageState, dispatch] = useReducer(ImageReduser, {
        images: [],
        imagesLoading: true
    })

    // get all images
    const getAllImages = async (productID) => {
        resetImage()
        try {
            const response = await axios.post(`${apiUrl}/image/FindByProduct`, productID)
            if (response.data.success) {
                dispatch({ type: 'GET_ALL_IMAGES', payload: response.data.images })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //add
    const addImage = async newImage => {

        try {
            const response = await axios.post(`${apiUrl}/image/addImage`, newImage)
            if (response.data.success) {
                dispatch({ type: 'IMAGE_ADD_SUCCESS', payload: response.data.image })
                return response.data

            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //delete
    const deleteImage = async imageId => {
        try {
            const response = await axios.delete(`${apiUrl}/image/${imageId}`)
            if (response.data.success)
                dispatch({ type: 'DELETE_IMAGE', payload: imageId })
        } catch (error) {
            console.log(error)
        }
    }

    const resetImage = () => {
        try {
            dispatch({ type: 'RESET_IMAGE', payload: [] })
        } catch (error) {
            console.log(error)
        }
    }



    const imageContextData = { imageState, getAllImages, addImage, deleteImage, resetImage }
    return (
        <ImageContext.Provider value={imageContextData}>
            {children}
        </ImageContext.Provider>
    )
}

export default ImageContextProvider