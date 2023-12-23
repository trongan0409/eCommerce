import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config, userId } from "../utils/AxiosConfig";
import { createAnOrder } from "../features/users/userSlide";
import { Button, Checkbox, Flex, Form, Tabs, Typography } from "antd";
import CreditCart from "./CreditCart";
import PayPalForm from "./PayPalForm";
import InformationForm from "./InformationForm";
import { LogosPaypal } from "../icons";
import CryptoFrom from "./CryptoFrom";

const { Title } = Typography;
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;
const base = "https://api-m.sandbox.paypal.com";

const shippingSchema = yup.object({
 firstname: yup.string().required("First Name is Required!"),
 lastname: yup.string().required("Last Name is Required!"),
 address: yup.string().required("Address Details are Required!"),
 state: yup.string().required("State is Required!"),
 city: yup.string().required("City is Required!"),
 country: yup.string().required("Country is Required!"),
 pincode: yup.number().required("Pincode is Required!"),
});

const Checkout = () => {
 const [formPlaceOrder] = Form.useForm();
 const [totalAmount, setTotalAmount] = useState(null);
 const [shippingInfo, setShippingInfo] = useState(null);
 const [paymentInfo, setPaymentInfo] = useState({
  razorpayPaymentId: "",
  razorpayOrderId: "",
 });
 const [cartProductState, setCartProductState] = useState([]);

 const [paymentMethod, setPaymentMethod] = useState([]);

 const dispatch = useDispatch();

 const cartState = useSelector((state) => state.auth.cartProducts);

 useEffect(() => {
  let sum = 0;
  for (let index = 0; index < cartState?.length; index++) {
   sum = sum + Number(cartState[index].quantity) * cartState[index].price;
   setTotalAmount(sum);
  }
 }, [cartState]);

 const formik = useFormik({
  initialValues: {
   firstname: "",
   lastname: "",
   address: "",
   state: "",
   city: "",
   country: "",
   pincode: "",
   other: "",
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
    price: cartState[index].price,
   });
  }
  setCartProductState(items);
 }, []);

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
  dispatch(
   createAnOrder({
    totalPrice: totalAmount,
    totalPriceAfterDiscount: totalAmount,
    orderItems: cartProductState,
    shippingInfo,
   })
  );
 };

 const onChange = (key) => {
  console.log(key);
 };

 const onPlaceOrder = React.useCallback((type, value) => {
  console.log("🚀 ~ file: Checkout.js:176 ~ onPlaceOrder ~ value:", value);
  console.log("🚀 ~ file: Checkout.js:176 ~ onPlaceOrder ~ type:", type);
 }, []);

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
        <h5 className='mb-3'>Payment on delivery</h5>
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
          <Link to='' className='button'>
           Continue to Shipping
          </Link>
          <button className='button' onClick={() => formPlaceOrder.submit()}>
           Place Order
          </button>
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
              src='../images/watch.jpg'
              className='img-fluid'
              alt='product'
             />
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
         );
        })}
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
 );
};

export default Checkout;
