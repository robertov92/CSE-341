const project1Routes = require('express').Router();
const shopControllers = require('../../controllers/project1/index');
const adminControllers = require('../../controllers/project1/admin');
const authControllers = require('../../controllers/project1/auth');

// auth 
project1Routes.get('/login', authControllers.getLogin);
project1Routes.post('/login', authControllers.postLogin);

// admin contorller operations
project1Routes.get('/edit-product/:productId', adminControllers.getEditProduct);
project1Routes.post('/edit-product', adminControllers.postEditProduct);
project1Routes.get('/adminProds', adminControllers.getAdminProds);
project1Routes.get('/add-product', adminControllers.getAddProduct);
project1Routes.post('/add-product', adminControllers.postAddProduct);
project1Routes.post('/delete-product', adminControllers.postDeleteProduct);


// shop controller operations
project1Routes.get('/cart', shopControllers.getCart);
project1Routes.post('/cart', shopControllers.postCart);
project1Routes.post('/cart-delete-item', shopControllers.postCartDeleteProduct);
project1Routes.post('/create-order', shopControllers.postOrder);
project1Routes.get('/orders', shopControllers.getOrders);
project1Routes.get('/:productId', shopControllers.getProduct);
project1Routes.get('/', shopControllers.getIndex);

module.exports = project1Routes;