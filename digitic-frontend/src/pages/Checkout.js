import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { config, userId } from '../utils/AxiosConfig';
import { createAnOrder } from '../features/users/userSlide';

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;
const base = "https://api-m.sandbox.paypal.com";

const shippingSchema = yup.object({
    firstname: yup.string().required('First Name is Required!'),
    lastname: yup.string().required('Last Name is Required!'),
    address: yup.string().required('Address Details are Required!'),
    state: yup.string().required('State is Required!'),
    city: yup.string().required('City is Required!'),
    country: yup.string().required('Country is Required!'),
    pincode: yup.number().required('Pincode is Required!'),
});

const Checkout = () => {

    const [totalAmount, setTotalAmount] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState({
        razorpayPaymentId: '',
        razorpayOrderId: ''
    });
    const [cartProductState, setCartProductState] = useState([]);

    const [paymentMethod, setPaymentMethod] = useState([]);

    const dispatch = useDispatch();

    const cartState = useSelector(state => state.auth.cartProducts);

    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum + (Number(cartState[index].quantity) * cartState[index].price);
            setTotalAmount(sum);
        }
    }, [cartState]);

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            address: '',
            state: '',
            city: '',
            country: '',
            pincode: '',
            other: ''
        },
        validationSchema: shippingSchema,
        onSubmit: async (values) => {
            await setShippingInfo(values);
            checkOutHandler();
        },
    });

    // const loadScript = (src) => {
    //     return new Promise((resolve, reject) => {
    //         const script = document.createElement('script');
    //         script.src = src;
    //         script.onload = () => {
    //             resolve(true)
    //         };
    //         script.onerror = () => {
    //             resolve(false)
    //         };
    //         document.body.appendChild(script)
    //     })
    // };

    useEffect(() => {
        let items = [];
        for (let index = 0; index < cartState?.length; index++) {
            items.push({
                product: cartState[index].productId._id,
                quantity: cartState[index].quantity,
                color: cartState[index].color._id,
                price: cartState[index].price
            })
        };
        setCartProductState(items);
    }, [])

    // const checkOutHandler = async () => {
    //     const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    //     if (!res) {
    //         alert('load failed');
    //         return;
    //     };

    //     const result = await axios.post('http://localhost:5000/api/user/order/checkout', '', userId);
    //     if (!result) {
    //         alert('something wrong');
    //         return;
    //     }

    //     const { amount, id: order_id, currency } = result.data.order;

    //     const options = {
    //         key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
    //         amount: amount,
    //         currency: currency,
    //         name: "Doan Trong An",
    //         description: "Test Transaction",
    //         order_id: order_id,
    //         handler: async function (response) {
    //             const data = {
    //                 orderCreationId: order_id,
    //                 razorpayPaymentId: response.razorpay_payment_id,
    //                 razorpayOrderId: response.razorpay_order_id,
    //             };

    //             const result = await axios.post("http://localhost:5000/api/user/order/paymentVerification", { amount: totalAmount + 5 }, { headers: config });

    //             setPaymentInfo({
    //                 razorpayPaymentId: response.razorpay_payment_id,
    //                 razorpayOrderId: response.razorpay_order_id,
    //             });

    //             dispatch(createAnOrder({
    //                 totalPrice: totalAmount,
    //                 totalPriceAfterDiscount: totalAmount,
    //                 orderItems: cartProductState,
    //                 paymentInfo,
    //                 shippingInfo
    //             }))
    //         },
    //         prefill: {
    //             name: "Doan Trong An",
    //             email: "doanan114@gmail.com",
    //             contact: "9999999999",
    //         },
    //         notes: {
    //             address: "Soumya Dey Corporate Office",
    //         },
    //         theme: {
    //             color: "#61dafb",
    //         },
    //     };
    // }

    const checkOutHandler = async () => {
        // const result = await axios.post(
        //     "http://localhost:5000/api/user/order/checkout",
        //     { amount: totalAmount + 5 },
        //     { headers: config }
        // );
        // console.log('check result: ', result);
        dispatch(createAnOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            shippingInfo
        }))
    }

    return (
        <>
            <Container class1='checkout-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-7'>
                        <div className='checkout-left-data'>
                            <div className='website-name'>
                                <h3>Dev Corner</h3>
                                <nav style={{ '--bs-breadcrumb-divider': '>' }} aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to='/cart' className='text-dark'>Cart</Link></li> &nbsp; /
                                        <li className="breadcrumb-item active" aria-current="page">Infomation</li> &nbsp; /
                                        <li className="breadcrumb-item active">Shipping</li> &nbsp; /
                                        <li className="breadcrumb-item active" aria-current="page">Payment</li>
                                    </ol>
                                </nav>
                                <h4 className='title total'>Contact Infomation</h4>
                                <p className='user-details total'>Doan Trong An(doanan114@gmail.com)</p>
                                <h4 className='mb-3'>Shipping Address</h4>
                                <form onSubmit={formik.handleSubmit} action='' className='d-flex flex-wrap gap-15 justify-content-between'>
                                    <div className='w-100'>
                                        <select
                                            name='country'
                                            value={formik.values.country}
                                            onChange={formik.handleChange('country')}
                                            onBlur={formik.handleBlur('country')}
                                            defaultValue={'default'}
                                            className='form-control form-select'
                                            id=''
                                        >
                                            <option value='' selected disabled>Select Country</option>
                                            <option value='vietnam'>Viet Nam</option>
                                            <option value='usa'>USA</option>
                                        </select>
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.country && formik.errors.country}
                                        </div>
                                    </div>

                                    <div className='flex-grow-1'>
                                        <input
                                            name='firstname'
                                            value={formik.values.firstname}
                                            onChange={formik.handleChange('firstname')}
                                            onBlur={formik.handleBlur('firstname')}
                                            type='text'
                                            placeholder='First Name (Optional)'
                                            className='form-control'
                                        />
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.firstname && formik.errors.firstname}
                                        </div>
                                    </div>
                                    <div className='flex-grow-1'>
                                        <input
                                            name='lastname'
                                            value={formik.values.lastname}
                                            onChange={formik.handleChange('lastname')}
                                            onBlur={formik.handleBlur('lastname')}
                                            type='text'
                                            placeholder='Last Name'
                                            className='form-control'
                                        />
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.lastname && formik.errors.lastname}
                                        </div>
                                    </div>
                                    <div className='w-100'>
                                        <input
                                            name='address'
                                            value={formik.values.address}
                                            onChange={formik.handleChange('address')}
                                            onBlur={formik.handleBlur('address')}
                                            type='text'
                                            placeholder='Address'
                                            className='form-control'
                                        />
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.address && formik.errors.address}
                                        </div>
                                    </div>
                                    <div className='w-100'>
                                        <input
                                            name='other'
                                            value={formik.values.other}
                                            onChange={formik.handleChange('other')}
                                            onBlur={formik.handleBlur('other')}
                                            type='text'
                                            placeholder='Apartment, suite, etc. (optional)'
                                            className='form-control'
                                        />
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.other && formik.errors.other}
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            name='city'
                                            value={formik.values.city}
                                            onChange={formik.handleChange('city')}
                                            onBlur={formik.handleBlur('city')}
                                            type='text'
                                            placeholder='City'
                                            className='form-control'
                                        />
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.city && formik.errors.city}
                                        </div>
                                    </div>
                                    <div className='flex-grow-1'>
                                        <select
                                            name='state'
                                            value={formik.values.state}
                                            onChange={formik.handleChange('state')}
                                            onBlur={formik.handleBlur('state')}
                                            defaultValue={'default'}
                                            className='form-control form-select'
                                            id=''
                                        >
                                            <option value='' selected disabled>State</option>
                                            <option value='state1'>State 1</option>
                                            <option value='state2'>State 2</option>
                                        </select>
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.state && formik.errors.state}
                                        </div>
                                    </div>
                                    <div className='flex-grow-1'>
                                        <input
                                            name='pincode'
                                            value={formik.values.pincode}
                                            onChange={formik.handleChange('pincode')}
                                            onBlur={formik.handleBlur('pincode')}
                                            type='text'
                                            placeholder='ZIP Code'
                                            className='form-control'
                                        />
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.pincode && formik.errors.pincode}
                                        </div>
                                    </div>
                                    <div className='d-flex w-100'>
                                        <div className='paymentMethod d-block'>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentmmethod"
                                                    id="paymentmmethod1"
                                                    value='delivery'
                                                    onClick={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <label className="form-check-label" for="paymentmmethod1">
                                                    Payment on delivery
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentmmethod"
                                                    id="paymentmmethod2"
                                                    value='creditcart'
                                                    onClick={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <label className="form-check-label" for="paymentmmethod2">
                                                    Payment by Credit Card
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentmmethod"
                                                    id="paymentmmethod3"
                                                    value='paypal'
                                                    onClick={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <label className="form-check-label" for="paymentmmethod3">
                                                    Payment by Paypal
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentmmethod"
                                                    id="paymentmmethod4"
                                                    value='crypto'
                                                    onClick={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <label className="form-check-label" for="paymentmmethod4">
                                                    Payment with Cryptocurrency
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-100'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <Link to='/cart' className='text-dark'>
                                                <BiArrowBack className='me-2 mb-0' />Return to Cart
                                            </Link>
                                            <Link to='' className='button'>Continue to Shipping</Link>
                                            <button className='button' type='submit'>Place Order</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-5'>
                        <div className='border-bottom py-4'>
                            {
                                cartState && cartState?.map((item, index) => {
                                    return (
                                        <div key={index} className='d-flex justify-content-between align-items-center gap-10 mb-2'>
                                            <div className='w-75 d-flex gap-10'>
                                                <div className='position-relative' style={{ width: '33%' }}>
                                                    <span
                                                        style={{ top: '-8px', right: '-5px' }}
                                                        className='badge bg-secondary text-white rounded-circle p-1 position-absolute'>
                                                        {item?.quantity}
                                                    </span>
                                                    <img src='../images/watch.jpg' className='img-fluid' alt='product' />
                                                </div>
                                                <div className=''>
                                                    <h5 className='total-price'>{item?.productId?.title}</h5>
                                                    <p className='total-price'>{item?.color?.title}</p>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <h5 className='total-price'>${item?.price * item?.quantity}</h5>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='pt-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='total'>SubTotal</p>
                                <p className='total-price'>${totalAmount ? totalAmount : 0}</p>
                            </div>
                        </div>
                        <div className='border-bottom py-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='mb-0 total'>Shipping</p>
                                <p className='mb-0 total-price'>$3</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center py-4'>
                            <h4 className='total'>Total</h4>
                            <h5 className='total-price'>${totalAmount ? totalAmount + 3 : 0}</h5>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Checkout;
