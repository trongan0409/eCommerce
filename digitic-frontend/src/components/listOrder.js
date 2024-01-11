/* eslint-disable jsx-a11y/img-redundant-alt */
import moment from 'moment';
import React from 'react'
import { setStatus } from './setStatusOrder';
import { OrderStyled } from './styledOrderlist';
import { Empty, Image, Spin, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { API_SERVER } from '../utils/AxiosConfig';
import { getAllProducts } from '../features/products/ProductSlice';

const ListOrder = ({ dataState }) => {
    const productState = useSelector((state) => state.product.product);
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    if (dataState?.length === 0 || productState?.length === 0) return <Empty />
    return (
        <OrderStyled>
            {dataState?.map((item, key) => {
                const { color, label } = setStatus(item.orderStatus);
                return (
                    <div key={key}>
                        <div className='top'>
                            <div className='created'>
                                <p>{moment(item.createdAt).format("DD/MM/YYYY")}</p>
                            </div>
                            <div className='status'>
                                <Tag color={color}>{label.toUpperCase()}</Tag>
                            </div>
                        </div>
                        <div className='prod'>
                            {item?.orderItems.map((item, index) => {
                                const productInfo = productState?.filter(e => e._id === item.product)
                                return (
                                    <div className='prod__item' key={index}>
                                        <div className='info-prod'>
                                            <img src={`${API_SERVER}/image/${productInfo?.[0]?.images?.[0]}`} className='img-fluid' alt='product image' />
                                            <div className='content'>
                                                <p className='name'>{productInfo[0]?.title}</p>
                                                <p className='quantity'>Quantity: {item.quantity}</p>
                                                {/* <p className='color'>
                                                            Color:
                                                            <span
                                                                style={{ backgroundColor: item.color }}
                                                            >{item.color}</span>
                                                        </p> */}
                                            </div>
                                        </div>
                                        <div className='price'>
                                            <p>
                                                <strong>Price</strong>:{" "}<span>${item.price}</span>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className='total'>
                            <p>
                                <strong>Payment method</strong>:{" "}
                                <span>
                                    {item.paymentInfo.jsonResponse}
                                </span>
                            </p>
                            <p className='price'>
                                <strong>Total price</strong>:{" "}
                                <span>${item.totalPriceAfterDiscount}</span>
                            </p>
                        </div>
                    </div>
                );
            })}
        </OrderStyled>
    )
}

export default ListOrder;
