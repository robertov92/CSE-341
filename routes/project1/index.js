const project1Routes = require('express').Router();
const { check, body } = require('express-validator/check');
const shopControllers = require('../../controllers/project1');
const adminControllers = require('../../controllers/project1/admin');
const authControllers = require('../../controllers/project1/auth');
const isAuth = require('../../middleware/is-auth');
const User = require('../../models/project1/user');




// auth 
project1Routes.get('/reset/:token', authControllers.getNewPassword);
project1Routes.post('/new-password', authControllers.postNewPassword);
project1Routes.get('/signup', authControllers.getSignup);
project1Routes.post('/signup', [check('email')
    .isEmail().withMessage('Please enter a valid email')
    .custom((value, { req }) => {
        return User.findOne({ email: value })
            .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Email already exists, please pick a different one');
                }
            });
    }),
    body('password', 'Please enter a password with only numbers and text, and at least 4 characters long').isLength({ min: 4 }).isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords have to match!')
        }
        return true;
    })
], authControllers.postSignup);
project1Routes.get('/login', authControllers.getLogin);
project1Routes.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password', 'Please enter a password with only numbers and text, and at least 4 characters long').isLength({ min: 4 }).isAlphanumeric()
], authControllers.postLogin);
project1Routes.post('/logout', authControllers.postLogout);
project1Routes.get('/reset', authControllers.getReset);
project1Routes.post('/reset', authControllers.postReset);



// admin contorller operations
project1Routes.get('/edit-product/:productId', isAuth, adminControllers.getEditProduct);
project1Routes.post('/edit-product', isAuth, [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description').isLength({ min: 8, max: 400 }).trim()
], adminControllers.postEditProduct);
project1Routes.get('/adminProds', isAuth, adminControllers.getAdminProds);
project1Routes.get('/add-product', isAuth, adminControllers.getAddProduct);
project1Routes.post('/add-product', isAuth, [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description').isLength({ min: 8, max: 400 }).trim()
], adminControllers.postAddProduct);
project1Routes.post('/delete-product', isAuth, adminControllers.postDeleteProduct);



// shop controller operations
project1Routes.get('/catalog', shopControllers.getCatalog);
project1Routes.get('/cart', isAuth, shopControllers.getCart);
project1Routes.post('/cart', isAuth, shopControllers.postCart);
project1Routes.post('/cart-delete-item', shopControllers.postCartDeleteProduct);
project1Routes.post('/create-order', isAuth, shopControllers.postOrder);
project1Routes.get('/orders', isAuth, shopControllers.getOrders);
project1Routes.get('/:productId', shopControllers.getProduct);
project1Routes.get('/', shopControllers.getIndex);




module.exports = project1Routes;