const axios = require("axios");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');
// const { Web3 } = require('web3');
// const { assert } = require("console");

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, private_KEY } = process.env;
// const apiKey = process.env['api_endpoint_KEY'];

// const network = 'goerli';
// const node = `https://go.getblock.io/3b39c90046e94a4ea151be5ae7114f91`;
// const web3 = new Web3(node);

const ecommerceAccount = {
    addr: '0xb8DC4ac84B648E15261B94f36Be0efc0a0cdf99E',
    privateKey: 'b6db0ed8a8be2278d1f0bf94ce2931b332dddbe8ced4389b8fe99dc40cb89bda'
}
const customerAccount = {
    addr: '0x39EF7396aF77514B1bC4A292259413f8b4a84d2E',
    privateKey: 'a577b1a923de24537bcceaf7b5ea851446a2d963814b796c53a6a9c348a6bf2f'
}

const base = "https://api-m.sandbox.paypal.com";

const createPaymentByCard = async (req, res) => {
    try {
        const { product, totalAmount } = req.body;
        const lineItems = product.map((products) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: products.product
                },
                unit_amount: Math.round(products.price * 100),
            },
            quantity: products.quantity,
        }))
        if (lineItems.length > 0) {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: 'https://d204-2402-9d80-448-f491-b1d5-6106-262a-2120.ngrok-free.app/purchase-order/card',
                cancel_url: 'https://d204-2402-9d80-448-f491-b1d5-6106-262a-2120.ngrok-free.app/cart'
            })
            res.json({ id: session.id })
        }
    } catch (error) {
        console.log(error);
    }
};

// Paypal

paypal.configure({
    mode: 'sandbox', // Change to 'live' for production
    client_id: PAYPAL_CLIENT_ID,
    client_secret: PAYPAL_CLIENT_SECRET,
});

const createPaymentByPaypal = async (req, res) => {
    const { shippingInfo, cartProductState, totalAmount } = req.body;
    const lineItems = cartProductState.map((products) => ({
        currency: 'USD',
        name: products.product,
        price: products.price.toString(),
        quantity: products.quantity,
    }))
    try {
        const paymentData = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: 'https://d204-2402-9d80-448-f491-b1d5-6106-262a-2120.ngrok-free.app/purchase-order/paypal',
                cancel_url: 'https://d204-2402-9d80-448-f491-b1d5-6106-262a-2120.ngrok-free.app/cart',
            },
            transactions: [
                {
                    item_list: {
                        items: [...lineItems]
                    },
                    amount: {
                        total: totalAmount,
                        currency: 'USD',
                    },
                    description: 'Payment by Paypal !!!',
                },
            ],
        };
        paypal.payment.create(paymentData, async (error, payment) => {
            if (error) {
                console.error(error);
                throw error;
            } else {
                console.log(payment)
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        const payment_url = payment.links[i].href;

                        res.json({ payment_url });
                    }
                }
            };
        });
    } catch (error) {
        console.log(error.message);
    }

    // await axios.get('/execute-payment', (req, res) => {
    //     const { paymentId, PayerID } = req.query;

    //     const executePaymentData = {
    //       payer_id: PayerID,
    //     };

    //     paypal.payment.execute(paymentId, executePaymentData, (error, payment) => {
    //       if (error) {
    //         console.error(error);
    //         throw error;
    //       } else {
    //         res.send('Payment successful!');
    //       }
    //     });
    //   });
}

const executePayment = (req, res) => {
    const { paymentId, PayerID } = req.query;

    const executePaymentData = {
        payer_id: PayerID,
    };

    paypal.payment.execute(paymentId, executePaymentData, (error, payment) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(payment)
            res.send('Payment successful!');
        }
    });
}

const createPaymentByCrypto = async (req, res) => {
    // const { accountAddress, accountKey } = req.body.info;
    // const amount = '0.00005';
    // const gasPrice = await web3.eth.getGasPrice();
    // const transaction = {
    //     from: customerAccount.addr,
    //     to: ecommerceAccount.addr,
    //     gas: 21000,
    //     gasPrice: gasPrice,
    //     value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
    //     chainId: 1,
    // };
    // const signedTx = await web3.eth.accounts.signTransaction(transaction, customerAccount.privateKey);
    // const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    // console.log('Transaction hash: ', receipt.transactionHash);

    // // const signTx = new Promise((resolve, reject) => {
    //     resolve(web3.eth.accounts.signTransaction(transaction, accountKey))
    // })
    // signTx.then(signedTx => {
    //     web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
    //         if (!error) {
    //             console.log('Transaction hash: ', hash)
    //         } else {
    //             console.log('Error: ', error)
    //         }
    //     })
    // })
    // const accountEcommerce = web3.eth.accounts.privateKeyToAccount(private_KEY);

    // const createSignedTx = async (rawTx) => {
    //     rawTx.gas = await web3.eth.estimateGas(rawTx);
    //     return await accountEcommerce.signTransaction(rawTx);
    // }

    // const sendSignedTx = async (signedTx) => {
    //     web3.sendSignedTransaction(signedTx.rawTransaction).then(console.log);
    // }

    // const amountTo = '0.0001';
    // const rawTx = {

    // }
    // const symbol = 'SHIBUSDT';
    // const action = 'BUY'
    // const price = getTickerPrice(symbol);
    // const transaction = makeTrade(symbol, price, action, quantity);
}

module.exports = {
    createPaymentByCard,
    createPaymentByPaypal,
    createPaymentByCrypto,
    executePayment
}