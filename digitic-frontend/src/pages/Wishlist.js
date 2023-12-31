import React, { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProductWishlist } from '../features/users/userSlide';
import { userId } from '../utils/AxiosConfig';
import { addToWishlist } from '../features/products/ProductSlice';
import Card from '../components/Card';

const Wishlist = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getWishlistFromDB(userId);
    }, []);

    const getWishlistFromDB = async (userId) => {
        await dispatch(getUserProductWishlist(userId));
    }

    const wishlistState = useSelector((state) => state?.auth?.wishlistProducts?.wishlist);
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
                        return (
                            <Card dataProduct={item} grid={3} wishList={true} key={index} />
                        )
                    })}
                </div>
            </Container>
        </>
    )
}

export default Wishlist;
