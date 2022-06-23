import { createContext, useReducer } from "react";
import axios from 'axios'
import { ReviewReduser } from "../redusers/ReviewReduser";
import { apiUrl } from "./constants";


export const ReviewContext = createContext()

const ReviewContextProvider = ({ children }) => {

    const [ReviewState, dispatch] = useReducer(ReviewReduser, {
        reviews: [],
        reviewLoading: true
    })


    const getAllReview = async () => {
        try {
            const response = await axios.get(`${apiUrl}/review`)
            if (response.data.success) {
                dispatch({ type: 'REVIEW_LOADED_SUCCESS', payload: response.data.reviews })

            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }


    const addReview = async newReview => {
        try {
            const response = await axios.post(`${apiUrl}/review/addReview`, newReview)
            if (response.data.success) {
                dispatch({ type: 'REVIEW_ADD_SUCCESS', payload: response.data.review })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }


    const deleteReview = async reviewId => {
        console.log(reviewId)
        try {
            const response = await axios.delete(`${apiUrl}/review/${reviewId}`)
            if (response.data.success) {
                dispatch({ type: 'DELETE_REVIEW', payload: reviewId })
                console.log(response.data)
                return response.data.success
            }
        } catch (error) {
            console.log(error)
        }
    }



    const reviewContextData = { ReviewState, getAllReview, addReview, deleteReview }
    return (
        <ReviewContext.Provider value={reviewContextData}>
            {children}
        </ReviewContext.Provider>
    )
}

export default ReviewContextProvider