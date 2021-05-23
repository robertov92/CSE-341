const project1Routes = require('express').Router();
const shopControllers = require('../../controllers/project1');
const adminControllers = require('../../controllers/project1/admin');
const authControllers = require('../../controllers/project1/auth');
const isAuth = require('../../middleware/is-auth');

// auth 
project1Routes.get('/signup', authControllers.getSignup);
project1Routes.post('/signup', authControllers.postSignup);
project1Routes.get('/login', authControllers.getLogin);
project1Routes.post('/login', authControllers.postLogin);
project1Routes.post('/logout', authControllers.postLogout);


// admin contorller operations
project1Routes.get('/edit-product/:productId', isAuth, adminControllers.getEditProduct);
project1Routes.post('/edit-product', isAuth, adminControllers.postEditProduct);
project1Routes.get('/adminProds', isAuth, adminControllers.getAdminProds);
project1Routes.get('/add-product', isAuth, adminControllers.getAddProduct);
project1Routes.post('/add-product', isAuth, adminControllers.postAddProduct);
project1Routes.post('/delete-product', isAuth, adminControllers.postDeleteProduct);


// shop controller operations
project1Routes.get('/cart', isAuth, shopControllers.getCart);
project1Routes.post('/cart', isAuth, shopControllers.postCart);
project1Routes.post('/cart-delete-item', shopControllers.postCartDeleteProduct);
project1Routes.post('/create-order', isAuth, shopControllers.postOrder);
project1Routes.get('/orders', isAuth, shopControllers.getOrders);
project1Routes.get('/:productId', shopControllers.getProduct);
project1Routes.get('/', shopControllers.getIndex);

module.exports = project1Routes;