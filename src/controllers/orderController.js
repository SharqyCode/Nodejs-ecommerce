

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Order = require('../models/Order');
const Product = require('../models/Product')


exports.createOrder = catchAsync(async (req, res, next) => {
  const { items, user } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "Order must contain at least one item",
    });
  }

  const detailedItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) return null;
      return {
        product: item.product,
        quantity: item.quantity,
        price: product.price,
      };
    })
  );

  if (detailedItems.includes(null)) {
    return res.status(400).json({
      status: "fail",
      message: "One or more products not found",
    });
  }

  const totalPrice = detailedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user,
    items: detailedItems,
    totalPrice,
  });

  return res.status(201).json({
    status: "success",
    data: { order },
  });
});


exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).populate({
    path: 'items.product',
    select: 'name price'
  })
    .populate({
      path: 'user',
      select: 'name email'
    });;

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders
    }
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find().populate({
    path: 'items.product',
    select: 'name price'
  })
    .populate({
      path: 'user',
      select: 'name email'
    });
  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders
    }
  });
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );

  if (!order) return next(new AppError('Order not found', 404));

  res.status(200).json({
    status: 'success',
    data: { order }
  });
});
