const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "8tbh95gx5pdw8hfb",
    publicKey: "h5h3gd8mpyjjzfw9",
    privateKey: "b01d7fa211b66bfe59852511d95d64fb"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        // deviceData: deviceDataFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
}
