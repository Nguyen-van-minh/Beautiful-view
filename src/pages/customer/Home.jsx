import React, { useContext, useEffect } from 'react'
import Header from '../../components/customer/Header'
import Footer from '../../components/customer/Footer'
import HeroSlider from '../../components/customer/Slider'
import { SliderContext } from '../../contexts/SliderContext'
import Section, { SectionTitle, SectionBody } from '../../components/Section'
import Grid from '../../components/Grid'
import { ProductContext } from "../../contexts/ProductContext";
import ProductCard from '../../components/customer/ProductCard'
import { Link } from 'react-router-dom'
import { InformationContext } from "../../contexts/InformationContext";
import policy from '../../assets/fake-data/policy'
import PolicyCard from '../../components/customer/PolicyCard'

const Home = () => {
    const { sliderState: { sliders }, getAllSlider } = useContext(SliderContext)
    const { productState: { products, SanPhamBanChay, SanPhamPhoBien }, getAllProducts, banchay, phobien } = useContext(ProductContext)
    const { InformationState: { informations }, getInformation } = useContext(InformationContext)


    useEffect(() => {
        getAllSlider()
        getAllProducts()
        getInformation()
        banchay()
        phobien()
    }, [])


    return (
        <div>
            <Header />
            <div className="container">
                <div className="main">

                    <HeroSlider
                        data={sliders}
                        control={true}
                        auto={true}
                        timeOut={5000}
                    />
                    {/* policy section */}
                    <Section>
                        <SectionBody>
                            <Grid
                                col={4}
                                mdCol={2}
                                smCol={1}
                                gap={20}
                            >
                                {
                                    policy.map((item, index) => <div key={index}>
                                        <PolicyCard
                                            name={item.name}
                                            description={item.description}
                                            icon={item.icon}
                                        />
                                    </div>)
                                }
                            </Grid>
                        </SectionBody>
                    </Section>
                    {/* end policy section */}
                    {/* ============================= hot produuct */}
                    <Section>
                        <SectionTitle>
                            Sản phẩm bán chạy
                        </SectionTitle>
                        <SectionBody>
                            <Grid
                                col={4}
                                mdCol={2}
                                smCol={1}
                                gap={20}
                            >
                                {
                                    SanPhamBanChay?.map((item, index) => (
                                        <ProductCard
                                            key={index}
                                            _id={item._id}
                                            image01={item.image}
                                            name={item.name}
                                            price={Number(item.price)}
                                            discount={Number(item.discount)}
                                            quantity={item.quantity}
                                            slug={item.name}
                                        />
                                    ))
                                }
                            </Grid>
                        </SectionBody>
                    </Section>

                    <Section>
                        <SectionTitle>
                            sản phẩm mới
                        </SectionTitle>
                        <SectionBody>
                            <Grid
                                col={4}
                                mdCol={2}
                                smCol={1}
                                gap={20}
                            >
                                {
                                    products?.slice(0, 8).map((item, index) => (
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


                    {/* banner */}
                    <Section>
                        <SectionBody>
                            <Link to="/catalog">
                                {
                                    informations && informations?.map((item, index) => (
                                        <img key={index} src={item.bannerImage} alt="banner" />
                                    ))
                                }
                            </Link>
                        </SectionBody>
                    </Section>
                    {/* end banner */}


                    <Section>
                        <SectionTitle>
                            phổ biến
                        </SectionTitle>
                        <SectionBody>
                            <Grid
                                col={4}
                                mdCol={2}
                                smCol={1}
                                gap={20}
                            >
                                {
                                    SanPhamPhoBien?.map((item, index) => (
                                        <ProductCard
                                            key={index}
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
            <Footer />
        </div>
    )
}

export default Home
