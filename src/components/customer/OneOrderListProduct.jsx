import React, { useContext } from "react";
import { OrderContext } from '../../contexts/OrderContext'
import numberWithCommas from '../../utils/numberWithCommas'

const OneOrderListProduct = () => {
    const { OrderState: { item } } = useContext(OrderContext)

    return (
        <div>
            {
                item && <div className="cart__item">
                    <div className="cart__item__image">
                        <img src={item.img} alt="" />
                    </div>
                    <div className="cart__item__info">
                        <div className="cart__item__info__name">
                            {/* <Link to={`/catalog/${item.slug}`}> */}
                            {`${item.productName} - ${item.color} - ${item.size}`}
                            {/* </Link> */}
                        </div>
                        <div className="cart__item__info__price">
                            {numberWithCommas(item.total)}
                        </div>
                        <div className="cart__item__info__quantity">
                            <div className="product__info__item__quantity">

                                <div className="product__info__item__quantity__input">
                                    {item.quantity}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            }
        </div>
    )
}

export default OneOrderListProduct