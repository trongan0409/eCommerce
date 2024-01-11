import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Color from '../components/Color';
import Container from '../components/Container';

const CompareProduct = () => {
    return (
        <>
            <Meta title={'Compare Product'} />
            <BreadCrumb title='Compare Product' />
            <Container class1='compare-product-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='compare-product-cart position-relative'>
                            <img src='images/cross.svg' className='position-absolute cross' alt='cross' />
                            <div className='product-cart-image img-fluid'>
                                <img src='images/watch.jpg' alt='watch' />
                            </div>
                            <div className='compare-product-details'>
                                <h5 className='title'>Honor T1 7.0 1GB RAM 8GB ROM 7 Inch With Wi-fi + 3G Tablet</h5>
                                <h6 className='price mt-3'>$100.00</h6>
                                <div>
                                    <div className='product-detail'>
                                        <h5>Brand:</h5>
                                        <p>Havels</p>
                                    </div>
                                    <div className='product-detail'>
                                        <h5>Type:</h5>
                                        <p>Watch</p>
                                    </div>
                                    <div className='product-detail'>
                                        <h5>Availablity:</h5>
                                        <p>In Stock</p>
                                    </div>
                                    <div className='product-detail'>
                                        <h5>Color:</h5>
                                        <Color />
                                    </div>
                                    <div className='product-detail'>
                                        <h5>Size:</h5>
                                        <div className='d-flex gap-10'>
                                            <p>S</p>
                                            <p>M</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='compare-product-cart position-relative'>
                            <img src='images/cross.svg' className='position-absolute cross' alt='cross' />
                            <div className='product-cart-image img-fluid'>
                                <img src='images/watch.jpg' alt='watch' />
                            </div>
                            <div className='compare-product-details'>
                                <h5 className='title'>Honor T1 7.0 1GB RAM 8GB ROM 7 Inch With Wi-fi + 3G Tablet</h5>
                                <h6 className='price mt-3'>$100.00</h6>
                                <div>
                                    <div className='product-detail'>
                                        <h5>Brand:</h5>
                                        <p>Havels</p>
                                    </div>
                                    <div className='product-detail'>
                                        <h5>Type:</h5>
                                        <p>Watch</p>
                                    </div>
                                    <div className='product-detail'>
                                        <h5>Availablity:</h5>
                                        <p>In Stock</p>
                                    </div>
                                    <div className='product-detail'>
                                        <h5>Color:</h5>
                                        <Color />
                                    </div>
                                    <div className='product-detail'>
                                        <h5>Size:</h5>
                                        <div className='d-flex gap-10'>
                                            <p>S</p>
                                            <p>M</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default CompareProduct;