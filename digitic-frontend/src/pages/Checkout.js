/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_SERVER, base_url, config, userId } from "../utils/AxiosConfig";
import { createAnOrder, deleteUserCart } from "../features/users/userSlide";
import { Button, Checkbox, Flex, Form, Tabs, Typography } from "antd";
import CreditCart from "./CreditCart";
import InformationForm from "./InformationForm";
import { LogosPaypal } from "../icons";
import CryptoFrom from "./CryptoFrom";
import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
  const [formPlaceOrder] = Form.useForm();
  const [totalAmount, setTotalAmount] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    jsonResponse: "No response",
    httpStatusCode: "Payment on delivery",
  });
  const [cartProductState, setCartProductState] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState('1');
  const [hiddenPlaceOrder, setHinddenPlaceOrder] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartState = useSelector((state) => state.auth.cartProducts);
  console.log(cartState)

  useEffect(() => {
    let sum = 0;
    cartState?.map((item) => {
      console.log('object', item)
      sum = Number(item?.quantity) * item?.price;
    })
    // console.log(sum)
    // for (let index = 0; index < cartState?.length; index++) {
    //   sum = sum + Number(cartState[index]?.quantity) * cartState[index]?.price;
    // }
    setTotalAmount(sum);
  }, [cartState]);

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
  }, [cartState]);

  const paymentOnDelivery = async (value) => {
    const response = await dispatch(
      createAnOrder({
        totalPrice: totalAmount,
        totalPriceAfterDiscount: totalAmount,
        orderItems: cartProductState,
        shippingInfo: value,
        paymentInfo,
      })
    );
    if (response) {
      dispatch(deleteUserCart());

      navigate('/purchase-order');
    }
  }

  const paymentByCard = async (value) => {
    setPaymentInfo({
      jsonResponse: 'Payment by Credit Card',
      httpStatusCode: 'Success'
    });
    await dispatch(
      createAnOrder({
        totalPrice: totalAmount,
        totalPriceAfterDiscount: totalAmount,
        orderItems: cartProductState,
        shippingInfo: value,
        paymentInfo,
      })
    );
    const stripe = await loadStripe('pk_test_51OTqMmIwXVtBHszWKTAlIVkRgDXV8ijtiwDx5pA3LKrEhWoci0VpT2WDw6yA6do7aYj5pjsLiweuzvegWYkoq3EF00NUsGEINS');
    const headers = {
      "Content-Type": "application/json"
    }
    const { data: session } = await axios.post(`${base_url}user/order/checkout-by-card`, { totalAmount: totalAmount, product: cartProductState }, { headers: headers })
    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })
    if (result.error) {
      return console.log(result.error)
    }
  }

  const paymentByPaypal = async (info) => {
    setPaymentInfo({
      jsonResponse: 'Payment by Paypal',
      httpStatusCode: 'success'
    });
    const response = await axios.post(`${base_url}user/order/checkout-by-paypal`, { shippingInfo: info, cartProductState, totalAmount }, { headers: config });
    console.log(response);
  }

  const onChange = (key) => {
    setHinddenPlaceOrder(false)
    setPaymentMethod(key);
    if (key === '3') return setHinddenPlaceOrder(true)
  };

  const onPlaceOrder = React.useCallback((type, value) => {
    if (paymentMethod === '1') paymentOnDelivery(value);
    if (paymentMethod === '2') paymentByCard(value);
    if (paymentMethod === '3') paymentByPaypal(value);
    // if (paymentMethod === '4') paymentByPaypal(value);
  }, [paymentMethod]);

  const items = [
    {
      key: "1",
      label: "Payment on delivery",
      children: <Checkbox checked={true}>Cash on delivery</Checkbox>,
    },
    {
      key: "2",
      label: "Payment by Credit Card",
      children: <CreditCart form={formPlaceOrder} onPlaceOrder={onPlaceOrder} />,
    },
    {
      key: "3",
      label: "Payment by Paypal",
      children: (
        <Flex justify='center' style={{ margin: "50px 0" }}>
          <Button
            size='large'
            style={{ backgroundColor: "#ffc447", padding: "0 100px" }}
            type='primary'
            icon={<LogosPaypal />}
            onClick={() => formPlaceOrder.submit()}
          >
            PayPal
          </Button>
        </Flex>
      ),
    },
    {
      key: "4",
      label: " Payment with Cryptocurrency",
      children: <CryptoFrom form={formPlaceOrder} onPlaceOrder={onPlaceOrder} />,
    },
  ];

  return (
    <>
      <Container class1='checkout-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-7'>
            <div className='checkout-left-data'>
              <div className='website-name'>
                <h3>Dev Corner</h3>
                <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label='breadcrumb'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to='/cart' className='text-dark'>
                        Cart
                      </Link>
                    </li>{" "}
                    &nbsp; /
                    <li className='breadcrumb-item active' aria-current='page'>
                      Infomation
                    </li>{" "}
                    &nbsp; /<li className='breadcrumb-item active'>Shipping</li> &nbsp; /
                    <li className='breadcrumb-item active' aria-current='page'>
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className='title total'>Contact Infomation</h4>
                <p className='user-details total'>Doan Trong An(doanan114@gmail.com)</p>
                <h4 className='mb-3'>Shipping Address</h4>
                <InformationForm form={formPlaceOrder} onPlaceOrder={onPlaceOrder} />
                <h5 className='mb-3'>Payment Gateway</h5>
                {/*  */}
                <Tabs
                  defaultActiveKey='1'
                  style={{ margin: "0 0 100px" }}
                  items={items}
                  onChange={onChange}
                />
                {/*  */}
                <div className='w-100'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <Link to='/cart' className='text-dark'>
                      <BiArrowBack className='me-2 mb-0' />
                      Return to Cart
                    </Link>
                    <Link to='/product' className='button'>
                      Continue to Shopping
                    </Link>
                    {!hiddenPlaceOrder &&
                      <button type="submit" className='button' onClick={() => formPlaceOrder.submit()}>
                        Place Order
                      </button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-5'>
            <div className='border-bottom py-4'>
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='d-flex justify-content-between align-items-center gap-10 mb-2'
                    >
                      <div className='w-75 d-flex gap-10'>
                        <div className='position-relative' style={{ width: "33%" }}>
                          <span
                            style={{ top: "-8px", right: "-5px" }}
                            className='badge bg-secondary text-white rounded-circle p-1 position-absolute'
                          >
                            {item?.quantity}
                          </span>
                          <img
                            src={`${API_SERVER}/image/${item.productId.images[0]}`}
                            className='img-fluid'
                            alt='product'
                          />
                        </div>
                        <div className=''>
                          <h5 className='total-price'>{item?.productId?.title}</h5>
                          {/* <p className='total-price'>{item?.color?.title}</p> */}
                          <ul className='colors ps-0 mb-[7px]'>
                            <li style={{ backgroundColor: item?.color?.title }}></li>
                          </ul>
                        </div>
                      </div>
                      <div className=''>
                        <h5 className='total-price'>${item?.price * item?.quantity}</h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className='pt-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='total'>SubTotal</p>
                <p className='total-price'>${totalAmount ? totalAmount : 0}</p>
              </div>
            </div>
            {/* <div className='border-bottom py-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='mb-0 total'>Shipping</p>
                <p className='mb-0 total-price'>$3</p>
              </div>
            </div> */}
            <div className='d-flex justify-content-between align-items-center py-4'>
              <h4 className='total'>Total</h4>
              <h5 className='total-price'>${totalAmount ? totalAmount : 0}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
