const Product = require('../../models/project1/product');
const Order = require('../../models/project1/order');

// gets 'Shop' page
exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('pages/project1', {
                prods: products,
                pageTitle: 'Shop'
            });
        });
};

// get a single product for the detail view
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('pages/project1/product-detail', {
                product: product,
                pageTitle: product.title
            });
        })
        .catch(err => console.log(err));
};

// gets card page
exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render('pages/project1/cart', {
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
};

// adds product to cart
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/project1/cart');
        })
        .catch(err => {
            console.log(err);
        });
};

// deletes product from cart
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/project1/cart');
        })
        .catch(err => console.log(err));
};

// saves cart into order collection
exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: {...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/project1/orders');
        })
        .catch(err => console.log(err));
};

// gets orders to be displayed
exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('pages/project1/orders', {
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};