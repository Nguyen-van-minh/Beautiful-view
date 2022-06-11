import React, { useState, useEffect, useContext } from 'react'
import { ProductContext } from "../../contexts/ProductContext";
import { Link } from 'react-router-dom'
import numberWithCommas from '../../utils/numberWithCommas'
import { ImageContext } from '../../contexts/ImageContext';

const Search = () => {
    const { productState: { filterProducts }, filter, findProduct, searchResult } = useContext(ProductContext)
    const { getAllImages } = useContext(ImageContext)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setSearchTerm('')
    }, [])

    useEffect(() => {
        filter(searchTerm)
    }, [searchTerm])

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value)

        // if (typingTimeoutRef.current) {
        //     clearTimeout(typingTimeoutRef.current)
        // }

        // typingTimeoutRef.current = setTimeout(() => {
        //     const formValue = {
        //         searchTerm: value
        //     }
        // handleFilterChange(formValue)
        // }, 700)
    }

    // const handleFilterChange = (newFilter) => {
    //     filter(newFilter.searchTerm)
    // }
    const chooseProduct = async (productID) => {
        await findProduct(productID)
        await getAllImages({ productID: productID })
        setSearchTerm('')
        filter("")
    }

    return (
        <div style={{ position: 'relative' }} className="header__menu__item">
            <div className='search__container'>
                <input className='search__container__input' type='text' placeholder='Tìm sản phẩm...'
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <i style={{ fontSize: 30, paddingTop: 3, backgroundColor: 'yellow', borderTopRightRadius: 8, borderBottomRightRadius: 8 }} className="bx bx-search"></i>
            </div>

            {filterProducts?.length !== 0 && (
                <div className="result-box box_Shadow">
                    {filterProducts?.slice(0, 4).map((value, key) => {
                        return (
                            <div onClick={() => chooseProduct(value._id)} className="result-box__item" key={key} >
                                <Link to={`/product-details`}>
                                    <div className='result-box__img'>
                                        <img src={value.image} alt='product' />
                                    </div>
                                    <div className='result-box__title'>{value.name} </div>
                                    <div className='result-box__price'>{numberWithCommas(value.price)}đ</div>
                                </Link>
                            </div>
                        );
                    })}
                    <Link to='/search-result'>
                        <div onClick={() => searchResult(filterProducts)} className='result-box__note'><span>Xem tất cả ({filterProducts?.length})</span></div>
                    </Link>

                </div>
            )}
        </div>
    )
}

export default Search

