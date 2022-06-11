export const ProductReduser = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'PRODUCT_LOADED_SUCCESS':
            return {
                ...state,
                products: payload,
                productLoading: false
            }
        case 'PRODUCT_BANCHAY_SUCCESS':
            return {
                ...state,
                SanPhamBanChay: payload,
            }
        case 'PRODUCT_PHOBIEN_SUCCESS':
            return {
                ...state,
                SanPhamPhoBien: payload,
            }
        case 'PRODUCT_ADD_SUCCESS':
            return {
                ...state,
                products: [...state.products, payload],

            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(products => products._id !== payload),


            }
        case 'UPDATE_PRODUCT':
            const newProduct = state.products?.map(product =>
                product._id === payload._id ? payload : product
            )
            return {
                ...state,
                products: newProduct,

            }
        case 'FIND_PRODUCT':
            return { ...state, product: payload }

        case 'FILTER_PRODUCT':
            return { ...state, filterProducts: payload }
        case 'RESULT_PRODUCT':
            return { ...state, resultProducts: payload }

        default:
            return state
    }
}