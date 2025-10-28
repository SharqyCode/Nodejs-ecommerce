
const express = require('express');
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protectLogOnly, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.use(protectLogOnly);

router.route('/')
  .get(restrictTo('admin'), getAllOrders)
  .post(createOrder);

router.route('/myOrders').get(getMyOrders);

router.route('/:id').patch(restrictTo('admin'), updateOrderStatus);

module.exports = router;
