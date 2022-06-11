import React, { useCallback, useState, useEffect, useRef, useContext } from 'react'

import CheckBox from '../../components/CheckBox'
import Header from '../../components/customer/Header'

import colors from '../../assets/fake-data/product-color'
import size from '../../assets/fake-data/product-size'
import Button from '../../components/customer/Button'
import InfinityList from '../../components/customer/InfinityList'
import Footer from '../../components/customer/Footer'

import { ProductContext } from "../../contexts/ProductContext";
import { CategoryContext } from "../../contexts/CategoryContext";

const SearchResult = () => {

    const { productState: { resultProducts } } = useContext(ProductContext)
    const { CategoryState: { categorys }, getAllCategory } = useContext(CategoryContext)

    useEffect(() => {
        getAllCategory()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const initFilter = {
        category: [],
        color: [],
        size: []
    }

    const [productsCatalog, setProductsCatalog] = useState(resultProducts)

    const [filter, setFilter] = useState(initFilter)

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case "CATEGORY":
                    setFilter({ ...filter, category: [...filter.category, item._id] })
                    break
                case "COLOR":
                    setFilter({ ...filter, color: [...filter.color, item.color] })
                    break
                case "SIZE":
                    setFilter({ ...filter, size: [...filter.size, item.size] })
                    break
                default:
            }
        } else {
            switch (type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item._id)
                    setFilter({ ...filter, category: newCategory })
                    break
                case "COLOR":
                    const newColor = filter.color.filter(e => e !== item.color)
                    setFilter({ ...filter, color: newColor })
                    break
                case "SIZE":
                    const newSize = filter.size.filter(e => e !== item.size)
                    setFilter({ ...filter, size: newSize })
                    break
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    const updateProducts = useCallback(
        () => {
            let temp = resultProducts

            if (filter.category.length > 0) {
                temp = temp.filter(e => filter.category.includes(e.categoryID))
            }

            if (filter.color.length > 0) {
                temp = temp.filter(e => {
                    const check = e.color.find(color => filter.color.includes(color))
                    return check !== undefined
                })
            }

            if (filter.size.length > 0) {
                temp = temp.filter(e => {
                    const check = e.size.find(size => filter.size.includes(size))
                    return check !== undefined
                })
            }

            setProductsCatalog(temp)
        },
        [filter, resultProducts],
    )

    useEffect(() => {
        updateProducts()
    }, [updateProducts])

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')

    return (
        <div>
            <Header />
            <div className="container">
                <div className="main">
                    <div className="catalog">
                        <div className="catalog__filter" ref={filterRef}>
                            <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                                <i className="bx bx-left-arrow-alt"></i>
                            </div>
                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__title">
                                    danh mục sản phẩm
                                </div>
                                <div className="catalog__filter__widget__content">
                                    {
                                        categorys.map((item, index) => (
                                            <div key={index} className="catalog__filter__widget__content__item">
                                                <CheckBox
                                                    label={item.name}
                                                    onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                                    checked={filter.category.includes(item._id)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__title">
                                    màu sắc
                                </div>
                                <div className="catalog__filter__widget__content">
                                    {
                                        colors.map((item, index) => (
                                            <div key={index} className="catalog__filter__widget__content__item">
                                                <CheckBox
                                                    label={item.display}
                                                    onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                                    checked={filter.color.includes(item.color)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__title">
                                    kích cỡ
                                </div>
                                <div className="catalog__filter__widget__content">
                                    {
                                        size.map((item, index) => (
                                            <div key={index} className="catalog__filter__widget__content__item">
                                                <CheckBox
                                                    label={item.display}
                                                    onChange={(input) => filterSelect("SIZE", input.checked, item)}
                                                    checked={filter.size.includes(item.size)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__content">
                                    <Button size="sm" onClick={clearFilter}>xóa bộ lọc</Button>
                                </div>
                            </div>
                        </div>
                        <div className="catalog__filter__toggle">
                            <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                        </div>
                        <div className="catalog__content">
                            <h3 style={{ texAlign: 'center', color: '#fcaf17', fontFamily: 'svn-gilroy bold' }}>KẾT QUẢ TÌM KIẾM</h3>
                            <InfinityList
                                data={productsCatalog}
                            />
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SearchResult