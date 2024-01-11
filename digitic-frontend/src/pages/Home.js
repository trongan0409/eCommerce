/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import { services } from '../utils/Data';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllBlogs } from '../features/Blogs/BlogSlide';
import { getAllProducts } from '../features/products/ProductSlice';
import { getUserCart } from '../features/users/userSlide';
import Card from '../components/Card';
import Brands from './homeComponent/Brands';
import Blogs from './homeComponent/Blogs';
import _ from 'lodash';

const Home = () => {
    const [isHiddentPopular, setHiddenPopular] = React.useState(false)
    const [isHiddentSpecial, setHiddenSpecial] = React.useState(false)
    const [isHiddentFeatured, setHiddenFeatured] = React.useState(false)
    const productState = useSelector((state) => state.product.product);

    const dispatch = useDispatch();

    const checkTagProduct = () => {
        const resultPopular = _.some(productState, { tags: 'popular' });
        const resultSpecial = _.some(productState, { tags: 'special' });
        const resultFeatured = _.some(productState, { tags: 'featured' });
        setHiddenPopular(resultPopular)
        setHiddenSpecial(resultSpecial)
        setHiddenFeatured(resultFeatured)
    }
    React.useEffect(() => {
        if (productState) {
            checkTagProduct()
        }
    }, [productState])

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllBlogs());
        dispatch(getUserCart())
    }, []);

    return (
        <>
            <Container class1='home-wrapper-1 py-5'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='main-banner position-relative py-3'>
                            <img src='images/main-banner-1.jpg' className='img-fluid rounded-3' alt='main banner' />
                            <div className='main-banner-content position-absolute'>
                                <h4>SUPPERCHARGED FOR PROS.</h4>
                                <h5>iPad S13+ Pro.</h5>
                                <p>From $999.00 or $41.62/mo.</p>
                                <Link>BUY NOW</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='d-flex flex-wrap justify-content-between align-items-center'>
                            <div className='small-banner position-relative py-3'>
                                <img src='images/catbanner-01.jpg' className='img-fluid rounded-3' alt='main banner' />
                                <div className='small-banner-content position-absolute'>
                                    <h4>best sale</h4>
                                    <h5>iPad S13+ Pro.</h5>
                                    <p>From $999.00 or<br /> $41.62/mo.</p>
                                </div>
                            </div>
                            <div className='small-banner position-relative py-3'>
                                <img src='images/catbanner-02.jpg' className='img-fluid rounded-3' alt='main banner' />
                                <div className='small-banner-content position-absolute'>
                                    <h4>NEW ARRIVAL</h4>
                                    <h5>Buy IPad Air</h5>
                                    <p>From $599 or<br /> $49.91/mo for 12 mo.</p>
                                </div>
                            </div>
                            <div className='small-banner position-relative py-3'>
                                <img src='images/catbanner-03.jpg' className='img-fluid rounded-3' alt='main banner' />
                                <div className='small-banner-content position-absolute'>
                                    <h4>NEW ARRIVAL</h4>
                                    <h5>Buy IPad Air</h5>
                                    <p>From $599 or<br /> $49.91/mo for 12 mo.</p>
                                </div>
                            </div>
                            <div className='small-banner position-relative py-3'>
                                <img src='images/catbanner-04.jpg' className='img-fluid rounded-3' alt='main banner' />
                                <div className='small-banner-content position-absolute'>
                                    <h4>NEW ARRIVAL</h4>
                                    <h5>Buy IPad Air</h5>
                                    <p>From $599 or<br /> $49.91/mo for 12 mo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1='py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='services d-flex align-items-center justify-content-between'>
                            {
                                services.map((i, j) => {
                                    return (
                                        <div className='d-flex align-items-center gap-15' key={j}>
                                            <img src={i.image} alt='services' />
                                            <div>
                                                <h6>{i.title}</h6>
                                                <p className='mb-0'>{i.tagline}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </Container>
            <Container class1='home-wrapper-2 pb-5'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='categories d-flex flex-wrap justify-content-between align-items-center'>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <h6>Cameras</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src='images/camera.jpg' alt='camera' />
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <h6>Smart Tv</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src='images/tv.jpg' alt='tv' />
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <h6>Smartwatches</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src='images/camera.jpg' alt='watch' />
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <h6>Smartwatches</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src='images/camera.jpg' alt='watch' />
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <h6>Cameras</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src='images/camera.jpg' alt='camera' />
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <h6>Smart Tv</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src='images/tv.jpg' alt='tv' />
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <h6>Smartwatches</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src='images/camera.jpg' alt='watch' />
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <h6>Smartwatches</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src='images/camera.jpg' alt='watch' />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            {isHiddentFeatured && <Container class1='featured-wrapper pb-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <h3 className='section-heading'>Featured Collection</h3>
                    </div>
                    <div className='row'>
                        {productState && productState?.map((item, index) => {
                            if (item.tags === 'featured') {
                                return (
                                    <Card dataProduct={item} grid={3} wishList={false} />
                                )
                            }
                        })}
                    </div>
                </div>
            </Container>}
            <Container class1='famous-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='famous-card bg-black'>
                            <div className='famous-content'>
                                <h5 className='text-light'>Big Screen</h5>
                                <h6 className='text-light'>Smart Watch Series 7</h6>
                                <p className='text-light'>From $399 or $16.62/mo for 24 mo.*</p>
                            </div>
                            <img src='images/famous-1.jpg' className='img-fluid' alt='famous' />
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='famous-card bg-white'>
                            <div className='famous-content'>
                                <h5>Big Screen</h5>
                                <h6>Smart Watch Series 7</h6>
                                <p>From $399 or $16.62/mo for 24 mo.*</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <img src='images/famous-2.jpg' width={173} className='img-fluid' alt='famous' />
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='famous-card bg-white'>
                            <div className='famous-content'>
                                <h5>Big Screen</h5>
                                <h6>Smart Watch Series 7</h6>
                                <p>From $399 or $16.62/mo for 24 mo.*</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <img src='images/smartphone.jpg' width={173} className='img-fluid' alt='famous' />
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='famous-card bg-white'>
                            <div className='famous-content'>
                                <h5>Big Screen</h5>
                                <h6>Smart Watch Series 7</h6>
                                <p>From $399 or $16.62/mo for 24 mo.*</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <img src='images/famous-4.jpg' width={173} className='img-fluid' alt='famous' />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            {isHiddentSpecial && (
                <Container class1='special-wrapper pb-5 home-wrapper-2'>
                    <div className='row'>
                        <div className='col-12'>
                            <h3 className='section-heading'>Special Products</h3>
                        </div>
                    </div>
                    <div className='row'>
                        {productState && productState?.map((item, index) => {
                            if (item.tags === 'special') {
                                return <SpecialProduct
                                    key={index}
                                    id={item?._id}
                                    brand={item?.brand}
                                    title={item?.title}
                                    totalrating={item?.totalrating.toString()}
                                    price={item?.price}
                                    sold={item?.sold}
                                    quantity={item?.quantity}
                                />
                            }
                        })}
                    </div>
                </Container>
            )}
            {isHiddentPopular && <Container class1='popular-wrapper pb-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <h3 className='section-heading'>Our Popular Products</h3>
                    </div>

                    {productState && productState?.map((item, index) => {
                        if (item.tags === 'popular') {
                            return (
                                <>
                                    <Card dataProduct={item} grid={3} key={index} wishList={false} />
                                </>
                            )
                        }
                    })}
                </div>
            </Container>}
            <Brands />
            <Blogs />
        </>
    )
}

export default Home;
