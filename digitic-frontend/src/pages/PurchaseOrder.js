import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersUser } from '../features/users/userSlide';
import ListOrder from '../components/listOrder';
import { Tabs } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { base_url, config } from '../utils/AxiosConfig';

const PurchaseOrder = () => {
    const { type: typeOrder } = useParams()
    const location = useLocation()
    const dispatch = useDispatch();
    const [dataState, setDataState] = React.useState([])
    const userOrders = useSelector((state) => state.auth.listOrders);
    useEffect(() => {
        dispatch(getOrdersUser());
        if (typeOrder === 'card') {
        } else if (typeOrder === 'paypal') {
            axios.get(`${base_url}user/order/paypal-success${location.search}`, { headers: config })
        }
    }, [dispatch, typeOrder]);





    const onChangeTabs = (key) => {
        let result = []
        switch (key) {
            case '2':
                result = userOrders.filter(e => e.orderStatus === 'Comfirming')
                break;
            case '3':
                result = userOrders.filter(e => e.orderStatus === 'Delivering')
                break;
            case '4':
                result = userOrders.filter(e => e.orderStatus === 'Delivered')
                break;
            case '5':
                result = userOrders.filter(e => e.orderStatus === 'Canceled')
                break;
            default:
                result = userOrders;
                break;
        }
        setDataState(result);
    }

    React.useEffect(() => {
        onChangeTabs('1')
    }, [])

    const items = [
        {
            key: "1",
            label: "All orders",
            children: <ListOrder dataState={userOrders} />,
        },
        {
            key: "2",
            label: "Confirmming",
            children: <ListOrder dataState={dataState} />,
        },
        {
            key: "3",
            label: "Delivering",
            children: <ListOrder dataState={dataState} />,
        },
        {
            key: "4",
            label: "Delivered",
            children: <ListOrder dataState={dataState} />,
        },
        {
            key: "5",
            label: "Canceled",
            children: <ListOrder dataState={dataState} />,
        },
    ];
    return (
        <>
            <Meta title={'Purchase order'} />
            <BreadCrumb title='Purchase order' />
            <Container class1='policy-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='policy'>
                            <Tabs
                                defaultActiveKey='1'
                                style={{ margin: "0 0 50px" }}
                                items={items}
                                tabBarStyle={{
                                    margin: '0 20px'
                                }}
                                onChange={onChangeTabs}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default PurchaseOrder
