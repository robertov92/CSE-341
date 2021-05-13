const Product = require('../../models/project1/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('pages/project1', {
            json_data: products
        });
    });
};

exports.getAdminProds = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('pages/project1/adminProds', {
            json_data: products
        });
    });
};

exports.getAddProduct = (req, res, next) => {
    res.render('pages/project1/add-product');
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/project1/');
};