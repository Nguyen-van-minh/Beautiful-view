import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import numberWithCommas from '../../utils/numberWithCommas'
import { ProductContext } from "../../contexts/ProductContext";
import { ImageContext } from '../../contexts/ImageContext';
import { ReviewContext } from "../../contexts/ReviewContext"

const ProductCard = props => {

    const { findProduct } = useContext(ProductContext)
    const { getAllImages } = useContext(ImageContext)
    const { getAllReview } = useContext(ReviewContext)

    const chooseProduct = async (productID) => {
        await findProduct(productID)
        await getAllImages({ productID: productID })
        getAllReview()
    }


    return (
        <div className="product-card">
            <Link to={`/product-details`}>

                <div onClick={() => chooseProduct(props._id)} className="product-card__image">
                    {props.quantity === 0 ?
                        <div style={{ zIndex: 100, color: 'red', position: 'absolute', top: 0, left: '45%' }}>
                            <span>Hết hàng</span>
                        </div>
                        :
                        null
                    }

                    <img src={props.image01} alt="" />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {numberWithCommas(props.discount)}
                    <span className="product-card__price__old">
                        <del>{numberWithCommas(props.price)}</del>
                    </span>
                </div>
            </Link>
            <div className="product-card__btn">
                <Link to={`/product-details`}>
                    <Button
                        onClick={() => chooseProduct(props._id)}
                        size="sm"
                        icon="bx bx-cart"
                        animate={true}
                    >
                        chọn mua
                    </Button>
                </Link>
            </div>
        </div>
    )
}

// ProductCard.propTypes = {
//     img01: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     slug: PropTypes.string.isRequired,
// }

export default ProductCard