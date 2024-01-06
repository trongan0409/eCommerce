import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart, deleteCartProduct, updateCartProduct } from '../features/users/userSlide';
import { API_SERVER } from '../utils/AxiosConfig';
import { isArray } from 'lodash';

const Cart = () => {

    const dispatch = useDispatch();
    const userCartState = useSelector(state => state?.auth?.cartProducts);

    const [productUpdateDetail, setProductUpdateDetail] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);

    useEffect(() => {
        if (productUpdateDetail !== null) {
            dispatch(updateCartProduct({ cartItemId: productUpdateDetail?.cartItemId, quantity: productUpdateDetail?.quantity }));
            dispatch(getUserCart());
        }
    }, [dispatch, productUpdateDetail]);

    const deteteACartProduct = (id) => {
        dispatch(deleteCartProduct(id))
        dispatch(getUserCart());

    }

    useEffect(() => {
        let sum = 0;
        if (userCartState) {
            for (let index = 0; index < userCartState?.length; index++) {
                sum = sum + (Number(userCartState[index].quantity) * userCartState[index].price);
                setTotalAmount(sum);
            }
        } else {
            setTotalAmount(sum)
        }
    }, [userCartState])

    return (
        <>
            <Meta title={'Cart'} />
            <BreadCrumb title='Cart' />
            <Container class1='cart-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='cart-header py-3 d-flex justify-content-between align-items-center'>
                            <h4 className='cart-col-1'>Product</h4>
                            <h4 className='cart-col-2'>Price</h4>
                            <h4 className='cart-col-3'>Quantity</h4>
                            <h4 className='cart-col-4'>Total</h4>
                        </div>
                        {userCartState && isArray(userCartState) && userCartState?.map((item, index) => {
                            return (
                                <div key={index} className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'>
                                    <div className='cart-col-1 gap-30 d-flex align-items-center'>
                                        <div className='w-25'>
                                            <img src={`${API_SERVER}/image/${item.productId.images[0]}`} className='img-fluid' alt='product image' />
                                        </div>
                                        <div className='w-75'>
                                            <p>{item?.productId.title}</p>
                                            <p className='d-flex gap-3'>
                                                Color:
                                                <ul className='colors ps-0'>
                                                    <li style={{ backgroundColor: item?.color.title }}></li>
                                                </ul>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='cart-col-2'>
                                        <h5>${item?.price}</h5>
                                    </div>
                                    <div className='cart-col-3 d-flex gap-10 align-items-center'>
                                        <div><input
                                            className='form-control'
                                            type='number'
                                            min={1}
                                            max={10}
                                            name=''
                                            id=''
                                            value={productUpdateDetail?.quantity ? productUpdateDetail?.quantity : item?.quantity}
                                            onChange={(e) => setProductUpdateDetail({ cartItemId: item?._id, quantity: e.target.value })}
                                        ></input></div>
                                        <div> <AiFillDelete onClick={() => deteteACartProduct(item?._id)} className='text-danger' /> </div>
                                    </div>
                                    <div className='cart-col-4'>
                                        <h5>${item?.price * item?.quantity}</h5>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='col-12 py-2'>
                        <div className='d-flex justify-content-between align-items-baseline'>
                            <Link to='/product' className='button mt-4'>Continue To Shopping</Link>
                            {(totalAmount !== null || totalAmount !== 0) &&
                                <div className='d-flex flex-column align-items-end'>
                                    <h4>SubTotal: ${totalAmount}</h4>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <Link to='/checkout' className='button'>Checkout</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Cart;
