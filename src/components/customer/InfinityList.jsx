import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '../Grid'
import ProductCard from './ProductCard'
import { Pagination } from 'antd';

const InfinityList = props => {

    const perLoad = 6 // items each load
    const listRef = useRef(null)
    const [data, setData] = useState([])
    const [currentPage, setCurentPage] = useState(1)

    useEffect(() => {
        setData(props.data.slice(0, perLoad))
    }, [props.data])

    useEffect(() => {
        window.scrollTo(0, 0)
        const getItems = () => {
            const start = (currentPage - 1) * perLoad
            const end = currentPage * perLoad
            setData(props.data.slice(start, end))
        }
        getItems()
    }, [currentPage])

    const handleChange = (page) => {
        setCurentPage(page)
    }

    return (
        <div ref={listRef}>
            <Grid
                col={3}
                mdCol={2}
                smCol={1}
                gap={20}
            >
                {
                    data.map((item, index) => (
                        <ProductCard
                            key={index}
                            _id={item._id}
                            image01={item.image}
                            quantity={item.quantity}
                            name={item.name}
                            price={Number(item.price)}
                            discount={Number(item.discount)}
                            slug={item.name}
                        />
                    ))
                }
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    defaultCurrent={1}
                    pageSize={perLoad}
                    total={props.data.length}
                    current={currentPage}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

InfinityList.propTypes = {
    data: PropTypes.array.isRequired
}

export default InfinityList