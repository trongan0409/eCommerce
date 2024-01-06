const axios = require("axios");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentByCard = async (req, res) => {
    try {
        const { userInfo, product, totalAmount } = req.body;
        const lineItems = product.map((products) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: products.product
                },
                unit_amount: Math.round(totalAmount * 100),
            },
            quantity: products.quantity,
        }))
        if (lineItems.length > 0) {
            stripe
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: 'http://localhost:3000/purchase-order',
                cancel_url: 'http://localhost:3000/cart'
            })
            res.json({ id: session.id })
        }
    } catch (error) {
        console.log(error);
    }
};

// Paypal

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

const createPaymentByPaypal = async (req, res) => {
    try {
        const cart = req.body;
        console.log(cart)
        const { jsonResponse, httpStatusCode } = await createOrder(cart);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
}

const createOrder = async (cart) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    // const lineItems = cart.cartProductState.map((products) => ({
    //     product_data: {
    //         name: products.product,
    //         quantity: products.quantity,
    //         price: products.price
    //     }
    // }))
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: cart.totalAmount,
                },
                //items: lineItems,
            },
        ],
    };
    const response = await axios(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    });
    return handleResponse(response);
};

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
        res.status(500).json(error);
    }
};

async function handleResponse(response) {
    try {
        const jsonResponse = await response.json();
        return {
            jsonResponse,
            httpStatusCode: response.status,
        };
    } catch (err) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}


module.exports = {
    createPaymentByCard,
    createPaymentByPaypal
}