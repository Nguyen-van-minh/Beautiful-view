import React, { useContext, useEffect, useState } from 'react'
import Section, { SectionTitle, SectionBody } from '../../components/Section'
import Grid from '../../components/Grid'
import { ProductContext } from "../../contexts/ProductContext";
import { ImageContext } from '../../contexts/ImageContext';

import ProductCard from '../../components/customer/ProductCard'
import ProductView from '../../components/customer/ProductView'
import Header from '../../components/customer/Header';
import Review from '../../components/customer/Reviews';
import { ReviewContext } from "../../contexts/ReviewContext";

const ProductDetails = props => {

    const { productState: { product, products } } = useContext(ProductContext)
    const { imageState: { images } } = useContext(ImageContext)
    const { ReviewState: { reviews } } = useContext(ReviewContext)

    const [dataReview, setDateReview] = useState(
        reviews.filter(review => review?.productId === product?._id)
    )


    useEffect(() => {
        window.scrollTo(0, 0)
        setDateReview(
            reviews.filter(review => review?.productId === product?._id)
        )
    }, [product, reviews])

    const getProducts = (count) => {
        const max = products?.length - count
        const min = 0
        const start = Math.floor(Math.random() * (max - min) + min)
        return products?.slice(start, start + count)
    }

    const relatedProducts = getProducts(8)

    return (
        <>
            <Header />
            <div className="container">
                <div className="main">
                    <Section>
                        <SectionBody>
                            <ProductView images={images} product={product} />
                        </SectionBody>
                    </Section>
                    <Section>
                        <Review dataReview={dataReview} />
                    </Section>
                    <Section>
                        <SectionTitle>
                            Khám phá thêm
                        </SectionTitle>
                        <SectionBody>
                            <Grid
                                col={4}
                                mdCol={2}
                                smCol={1}
                                gap={20}
                            >
                                {
                                    relatedProducts?.map((item, index) => (
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
                        </SectionBody>
                    </Section>
                </div>
            </div>
        </>

    )
}

export default ProductDetails