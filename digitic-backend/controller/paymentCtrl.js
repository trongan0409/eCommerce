const axios = require("axios");

// const Razorpay = require('razorpay');

// const instance = new Razorpay({
//     key_id: 'dsadas',
//     key_secret: 'dasdas'
// })

// const checkout = async (req, res) => {

//     const { amount } = req.body;

//     const option = {
//         amount: amount * 100,
//         currency: 'USD'
//     };

//     const order = await instance.orders.create(option);

//     res.json({
//         success: true,
//         order
//     })
// }

// const paymentVerification = async (req, res) => {
//     const { razorpayOrderId, razorpayPaymentId } = req.body;
//     res.json({
//         razorpayOrderId,
//         razorpayPaymentId
//     })
// }

// Paypal

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";
console.log({ PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET })

const generateAccessToken = async () => {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
            PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
        ).toString("base64");
        const response = await axios({
            method: "POST",
            url: `${base}/v1/oauth2/token`,
            data: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        })
        return response.data.access_token;
    } catch (error) {
        console.log("🚀 ~ file: paymentCtrl.js:62 ~ generateAccessToken ~ error:", error)
        res.status(500).json(error);

    }
};

const checkout = async (req, res) => {
    try {
        const { amount } = req.body;
        console.log("🚀 ~ file: paymentCtrl.js:68 ~ checkout ~ amount:", typeof amount.toLocaleString('en-US'))
        // const { jsonResponse, httpStatusCode } = await createOrder(cart);
        // res.status(httpStatusCode).json(jsonResponse);
        const accessToken = await generateAccessToken();
        console.log("🚀 ~ file: paymentCtrl.js:72 ~ checkout ~ accessToken:", accessToken)
        const url = `${base}/v2/checkout/orders`;
        console.log("🚀 ~ file: paymentCtrl.js:75 ~ checkout ~ url:", url)
        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: amount.toLocaleString('en-US'),
                    },
                },
            ],
        };
        // const response = await axios({
        //     method: "POST",
        //     url: `${base}/v2/checkout/orders`,
        //     data: (payload),
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        // })


        console.log("🚀 ~ file: paymentCtrl.js:100 ~ checkout ~ response.data:", response)
        return handleResponse(response.data);
    } catch (error) {
        console.log("🚀 ~ file: paymentCtrl.js:98 ~ checkout ~ error:", error.message)
        res.status(500).json(error);

    }
};

async function handleResponse(response) {
    try {
        return {
            response,
            // httpStatusCode: response.status,
        };
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    checkout,
    // paymentVerification
}