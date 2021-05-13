const project1Routes = require('express').Router();
const controllers = require('../../controllers/project1/index');


project1Routes.get('/', controllers.getIndex);

project1Routes.get('/adminProds', controllers.getAdminProds);

project1Routes.get('/add-product', controllers.getAddProduct);

project1Routes.post('/add-product', controllers.postAddProduct);

project1Routes.post('/delete-product', controllers.postDeleteProduct);

module.exports = project1Routes;