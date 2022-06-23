import { createContext, useReducer } from "react";
import axios from 'axios'
import { CategoryReduser } from "../redusers/CategoryReduser";
import { apiUrl } from "./constants";


export const CategoryContext = createContext()

const CategoryContextProvider = ({ children }) => {
    //state
    const [CategoryState, dispatch] = useReducer(CategoryReduser, {
        categorys: [],
        categoryLoading: true
    })

    // get all 
    const getAllCategory = async () => {
        try {
            const response = await axios.get(`${apiUrl}/category`)
            if (response.data.success) {
                dispatch({ type: 'CATEGORY_LOADED_SUCCESS', payload: response.data.categorys })

            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    // add
    const addCategory = async newCategory => {
        try {
            const response = await axios.post(`${apiUrl}/category/addCategory`, newCategory)
            if (response.data.success) {
                dispatch({ type: 'CATEGORY_ADD_SUCCESS', payload: response.data.category })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //delete
    const deleteCategory = async categoryId => {
        try {
            const response = await axios.delete(`${apiUrl}/category/${categoryId}`)
            if (response.data.success)
                dispatch({ type: 'DELETE_CATEGORY', payload: categoryId })
        } catch (error) {
            console.log(error)
        }
    }


    // Update 
    const updateCategory = async updatedCategory => {
        try {
            const response = await axios.put(
                `${apiUrl}/category/${updatedCategory._id}`,
                updatedCategory
            )
            if (response.data.success) {
                dispatch({ type: 'UPDATE_CATEGORY', payload: response.data.category })
                console.log(response.data)
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }




    //tContextData
    const categoryContextData = { CategoryState, getAllCategory, addCategory, deleteCategory, updateCategory }
    return (
        <CategoryContext.Provider value={categoryContextData}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider