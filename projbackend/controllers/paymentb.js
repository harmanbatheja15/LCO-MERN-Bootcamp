const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "merchantId",
    publicKey: "publicKey",
    privateKey: "privateKey"
});

exports.getToken = (req, res) => {
    try {
        gateway?.clientToken?.generate({}, (err, response) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    }
    catch (err) { console.log(err) }
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
