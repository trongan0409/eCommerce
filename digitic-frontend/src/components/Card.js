/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { API_SERVER } from '../utils/AxiosConfig';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../features/products/ProductSlice';
import { getUserProductWishlist } from '../features/users/userSlide';
import { message } from 'antd';

const Card = ({ dataProduct, grid, wishList = false }) => {
    const dispatch = useDispatch()

    const addToWish = (id) => {
        dispatch(addToWishlist(id));
        message.success('Add product successfully')
    }
    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id));
        message.success('Product deletion was successful')
        setTimeout(() => {
            dispatch(getUserProductWishlist(id));
            window.location.reload()
        }, 500)
    }


    return (
        <div className={`gr-${grid}`}>
            <div className='product-card position-relative'>
                <div className='wishlist-icon position-absolute'>
                    {wishList ?
                        <button className='border-0 bg-transparent' onClick={() => removeFromWishlist(dataProduct?._id)}>
                            <img src='/images/cross.svg' alt='cross' style={{ width: 15 }} />
                        </button>
                        :
                        <button className='border-0 bg-transparent' onClick={() => { addToWish(dataProduct?._id) }}>
                            <img src={`/images/wish.svg`} alt='wishlist' />
                        </button>
                    }
                </div>
                <div className='product-image'>
                    {dataProduct.images.slice(0, 2).map((image, index) =>
                        <img key={index} src={`${API_SERVER}/image/${image}`} style={{ width: '100%' }} className='img-fluid' alt='product-image' />
                    )}
                </div>
                <div style={{ padding: 15 }}>
                    <div className='product-details'>
                        <h6 className='brand'>{dataProduct?.brand}</h6>
                        <h5 className='product-title'>
                            {dataProduct?.title}
                        </h5>
                        <ReactStars count={5} size={24} activeColor='#ffd700' value={dataProduct?.totalrating.toString()} edit={false} />
                        <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`} dangerouslySetInnerHTML={{ __html: dataProduct?.description }}></p>
                        <p className='price'>${dataProduct?.price}</p>

                    </div>
                    <div className='action-bar position-absolute'>
                        <div className='d-flex flex-column gap-15'>
                            <button className='border-0 bg-transparent'>
                                <img src='/images/prodcompare.svg' alt='compare' />
                            </button>
                            <Link to={'/product/' + dataProduct?._id} className='border-0 bg-transparent'>
                                <img src='/images/view.svg' alt='view' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
