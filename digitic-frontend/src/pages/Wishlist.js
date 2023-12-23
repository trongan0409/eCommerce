import React, { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProductWishlist } from '../features/users/userSlide';
import { userId } from '../utils/AxiosConfig';
import { addToWishlist } from '../features/products/ProductSlice';

const Wishlist = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getWishlistFromDB(userId);
    }, []);

    const getWishlistFromDB = async (userId) => {
        await dispatch(getUserProductWishlist(userId));
    }

    const wishlistState = useSelector((state) => state?.auth?.wishlistProduct?.wishlist);
    console.log('check wishlist: ', wishlistState);

    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id));
        setTimeout(() => {
            dispatch(getUserProductWishlist(id));
        }, 300)
    }

    return (
        <>
            <Meta title={'Wishlist'} />
            <BreadCrumb title='Wishlist' />
            <Container class1='wishlist-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    {wishlistState && wishlistState.length === 0 &&
                        <div className='text-center'>Wishlist is Empty</div>
                    }
                    {wishlistState && wishlistState?.map((item, index) => {
                        console.log(wishlistState);
                        return (
                            <div className='col-3' key={index}>
                                <div className='wishlist-card position-relative'>
                                    <img src='images/cross.svg' onClick={() => removeFromWishlist(item?._id)} className='position-absolute cross' alt='cross' />
                                    <div className='wishlist-card-image'>
                                        <img src='images/watch.jpg' className='img-fluid w-100' alt='watch' />
                                    </div>
                                    <div className='py-3 px-3'>
                                        <h5 className='title'>{item?.title}</h5>
                                        <h6 className='price'>${item?.price}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </>
    )
}

export default Wishlist;
