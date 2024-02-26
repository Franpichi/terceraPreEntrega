const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.post('/:cid/purchase', CartController.purchaseCart);

module.exports = router;
