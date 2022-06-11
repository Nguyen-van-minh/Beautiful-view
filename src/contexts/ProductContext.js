import { createContext, useReducer } from "react";
import axios from 'axios'
import { ProductReduser } from "../redusers/ProductReducer";
import { apiUrl } from "./constants";


export const ProductContext = createContext()

const ProductContextProvider = ({ children }) => {
    //state
    const [productState, dispatch] = useReducer(ProductReduser, {
        products: [],
        productLoading: true,
    })

    // get all products
    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/product`)
            if (response.data.success) {
                dispatch({ type: 'PRODUCT_LOADED_SUCCESS', payload: response.data.products.reverse() })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }
    // get ban chay
    const banchay = async () => {
        try {
            const response = await axios.get(`${apiUrl}/product/banchay`)
            if (response.data.success) {
                dispatch({ type: 'PRODUCT_BANCHAY_SUCCESS', payload: response.data.products })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    // get ban chay
    const phobien = async () => {
        try {
            const response = await axios.get(`${apiUrl}/product/phobien`)
            if (response.data.success) {
                dispatch({ type: 'PRODUCT_PHOBIEN_SUCCESS', payload: response.data.products })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //add
    const addProduct = async newProduct => {

        try {
            const response = await axios.post(`${apiUrl}/product/addProduct`, newProduct)
            if (response.data.success) {
                dispatch({ type: 'PRODUCT_ADD_SUCCESS', payload: response.data.product })
                console.log(response.data.product)
                return response.data

            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //delete
    const deleteProduct = async productId => {
        try {
            const response = await axios.delete(`${apiUrl}/product/${productId}`)
            if (response.data.success)
                dispatch({ type: 'DELETE_PRODUCT', payload: productId })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    // Update 
    const updateProduct = async (id, updateData) => {
        try {
            const response = await axios.put(
                `${apiUrl}/product/${id}`,
                updateData
            )
            if (response.data.success) {
                dispatch({ type: 'UPDATE_PRODUCT', payload: response.data.product })
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }

    const findProduct = productId => {
        const product = productState.products.find(product => product._id === productId)
        dispatch({ type: 'FIND_PRODUCT', payload: product })
    }

    const filter = async name => {
        let filterProducts = []
        if (!name) {
            filterProducts = []
        }
        else {
            filterProducts = await productState.products.filter((val) => {
                if (val.name.toLowerCase().includes(name.toLowerCase())) {
                    return val
                }
            })
        }

        dispatch({ type: 'FILTER_PRODUCT', payload: filterProducts })
    }

    const searchResult = async resultData => {
        dispatch({ type: 'RESULT_PRODUCT', payload: resultData })
    }
    //productContextData
    const productContextData = { productState, getAllProducts, addProduct, deleteProduct, updateProduct, findProduct, filter, searchResult, banchay, phobien }
    return (
        <ProductContext.Provider value={productContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider