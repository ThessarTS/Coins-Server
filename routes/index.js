const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const CoinController = require('../controllers/coinController')
const midtransClient = require('midtrans-client');
const authentication = require('../middlewares/Authentication')

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.get('/coins', CoinController.getAllAssets)

router.use(authentication)

router.post('/midtrans-token', async (req, res, next) => {
    try {
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY
        });
        let parameter = {
            "transaction_details": {
                "order_id": 'TRANSACTION_' + Math.floor(10000 + Math.random() * 90000),
                "gross_amount": req.body.amount
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "first_name": req.user.username,
                "email": req.user.email,
            }
        };

        const midtransToken = await snap.createTransaction(parameter)
        res.status(201).json(midtransToken)
    } catch (error) {
        next(error)
    }
})

router.get('/finduser', UserController.findUser)

router.post('/mycoins', CoinController.addToMyCoins)

router.get('/mycoins', CoinController.getAllMyCoins)



















module.exports = router