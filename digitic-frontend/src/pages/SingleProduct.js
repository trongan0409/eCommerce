/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import ReactStars from 'react-rating-stars-component';
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import { TbGitCompare } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import Container from '../components/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAProduct } from '../features/products/ProductSlice';
import { toast } from 'react-toastify';
import { addProductToCart, getUserCart } from '../features/users/userSlide';
import { API_SERVER } from '../utils/AxiosConfig';

const SingleProduct = () => {

    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1)
    const [alreadyAdded, setAlreadyAdded] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productState = useSelector(state => state.product.singleProduct);
    const cartState = useSelector(state => state.auth.cartProducts);

    useEffect(() => {
        dispatch(getAProduct(getProductId));
    }, [])

    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) {
            if (getProductId === cartState[index]?.productId?._id) {
                setAlreadyAdded(true)
            }
        }
    }, [])

    const getProductId = location.pathname.split('/')[2];

    const [orderedProduct, setOrderedProduct] = useState(true);

    const uploadCart = async () => {
        if (color === null) {
            toast.error('Please choose color');
            return false;
        } else {
            await dispatch(addProductToCart({
                productId: productState?._id,
                quantity,
                color,
                price: productState?.price
            }));
            await dispatch(getUserCart())
            navigate('/cart');
        }
    }

    const props = { width: 595, height: 500, zoomWidth: 500, };

    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    return (
        <>
            <Meta title={'Product name'} />
            <BreadCrumb title='Product name' />
            <Container class1='main-product-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='main-product-image'>
                            <div className=''>
                                <ReactImageZoom {...props} img={`${API_SERVER}/image/${productState?.images[0]}`} />
                            </div>
                        </div>
                        <div className='other-product-images d-flex flex-wrap gap-15'>
                            {productState && productState?.images.map((item, index) => {
                                return (
                                    <div>
                                        <img src={`${API_SERVER}/image/${item}`} style={{ height: 100, width: '100%' }} className='img-fluid' alt='' />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='main-product-details'>
                            <div className='border-bottom'>
                                <h3 className='title'>{productState?.title}</h3>
                            </div>
                            <div className='border-bottom py-3'>
                                <p className='price'>${productState?.price}</p>
                                <div className='d-flex align-items-center gap-10'>
                                    <ReactStars count={5} size={20} activeColor='#ffd700' value={productState?.totalrating} edit={false} />
                                    <p className='mb-0 mt-0'>(2 Reviews)</p>
                                </div>
                            </div>
                            <div className='py-3'>
                                {/* <div className='d-flex gap-10 align-items-center my-2'>
                                    <h6>Type: </h6><p className='product-data'>zcxzcxz</p>
                                </div> */}
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h6>Brand: </h6><p className='product-data'>{productState?.brand}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h6>Category: </h6><p className='product-data'>{productState?.category}</p>
                                </div>
                                {/* <div className='d-flex gap-10 align-items-center my-2'>
                                    <h6>Tags: </h6><p className='product-data'>{productState?.tags}</p>
                                </div> */}
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h6>Availability: </h6><p className='product-data'>123 In Stock</p>
                                </div>
                                {/* <div className='d-flex gap-10 align-items-center my-2'>
                                    <h6>Size: </h6>
                                    <div className='d-flex gap-15'>
                                        <span className='border border-1 bg-white text-dark border-secondary px-3 py-1'>S</span>
                                        <span className='border border-1 bg-white text-dark border-secondary px-3 py-1'>M</span>
                                        <span className='border border-1 bg-white text-dark border-secondary px-3 py-1'>L</span>
                                    </div>
                                </div> */}
                                {alreadyAdded === false &&
                                    <>
                                        <div className='d-flex gap-10 align-items-center my-2'>
                                            <h6>Color: </h6>
                                            <Color setColor={setColor} colorData={productState?.color} />
                                        </div>
                                    </>
                                }
                                <div className='d-flex flex-row gap-15 align-items-center mt-2 mb-3'>
                                    {alreadyAdded === false &&
                                        <>
                                            <h6>Quantity: </h6>
                                            <div>
                                                <input
                                                    type='number'
                                                    min={1}
                                                    max={10}
                                                    className='form-control'
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    value={quantity}
                                                />
                                            </div>
                                        </>
                                    }
                                    <div className={alreadyAdded ? 'ms-0 d-flex align-items-center gap-30' : 'ms-5 d-flex align-items-center gap-30'}>
                                        <button
                                            type='button'
                                            className='button border-0'
                                            onClick={() => alreadyAdded ? navigate('/cart') : uploadCart()}
                                        >
                                            {alreadyAdded ? 'Go to Cart' : 'Add to Cart'}
                                        </button>
                                        <button className='button buynow'>Buy Now</button>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-15'>
                                    <div>
                                        <a href=''> <TbGitCompare className='fs-3 me-2' /> Add to Compare</a>
                                    </div>
                                    <div>
                                        <a href=''><AiOutlineHeart className='fs-3 me-2' />Add to Wishlist</a>
                                    </div>
                                </div>
                                {/* <div className='d-flex gap-10 flex-column my-3'>
                                    <h6>Shipping & Returns: </h6>
                                    <p className='product-data'>English texts for beginners to practice reading and comprehension online and for free.</p>
                                </div> */}
                                <div className='d-flex gap-10 align-items-center mt-3'>
                                    <h6>Product Link: </h6>
                                    <a href='javascript:void(0);'
                                        style={{ marginBottom: '6px' }}
                                        onClick={() => { copyToClipboard(window.location.href) }}>
                                        Copy Link
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Container class1='description-wrapper py-5 home-wrapper-2'>
                    <div className='row'>
                        <div className='col-12'>
                            <h4>Description</h4>
                            <div className='bg-white p-3'>
                                <p dangerouslySetInnerHTML={{ __html: productState?.description }}></p>
                            </div>
                        </div>
                    </div>
                </Container>
                <Container class1='reviews-wrapper home-wrapper-2'>
                    <div className='row'>
                        <div className='col-12'>
                            <h3>Review</h3>
                            <div className='review-inner-wrapper'>
                                <div className='review-head d-flex justify-content-between align-items-end'>
                                    <div>
                                        <h4 className='mb-3'>Customer Reviews</h4>
                                        <div className='d-flex gap-10 align-items-center'>
                                            <ReactStars count={5} size={20} activeColor='#ffd700' value={4} edit={false} />
                                            <p className='mb-0'>Base on 2 Reviews</p>
                                        </div>
                                    </div>
                                    {orderedProduct &&
                                        <div>
                                            <a href='' className='text-dark text-decoration-underline'>Write a review</a>
                                        </div>
                                    }
                                </div>
                                <div className='review-form py-4'>
                                    <h4>Write a review</h4>
                                    <form action='' className='d-flex flex-column gap-15'>
                                        <div>
                                            <ReactStars count={5} size={20} activeColor='#ffd700' value={4} edit={true} />
                                        </div>
                                        <div>
                                            <textarea name='' className='w-100 form-control' id='' cols='30' rows='4' placeholder='Comment'></textarea>
                                        </div>
                                        <div className='d-flex justify-content-end'>
                                            <button className='button border-0'>Submit Review</button>
                                        </div>
                                    </form>
                                </div>
                                <div className='reviews mt-4'>
                                    <div className='review'>
                                        <div className='d-flex gap-10 align-items-center'>
                                            <h6 className='mb-0'>TrongAn</h6>
                                            <ReactStars count={5} size={20} activeColor='#ffd700' value={4} edit={false} />
                                        </div>
                                        <p className='mt-3'>English texts for beginners to practice reading and comprehension online and for free. Practicing your comprehension of written English will both improve your vocabulary and understanding of grammar and word order. The texts below are designed to help you develop while giving you an instant evaluation of your progress.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                <Container class1='popular-wrapper py-5 home-wrapper-2'>
                    <div className='row'>
                        <div className='col-12'>
                            <h3 className='section-heading'>Our Popular Products</h3>
                        </div>
                    </div>
                    <div className='row'>
                        {/* <div className='col-2'>
                                        <div className='card'></div>
                                    </div>
                                    <div className='col-2'>
                                        <div className='card'></div>
                                    </div> */}
                        <ProductCard />
                        <ProductCard />
                    </div>
                </Container>
            </Container>
        </>
    )
}
export default SingleProduct;
