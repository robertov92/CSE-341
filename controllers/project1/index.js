const Product = require('../../models/project1/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('pages/project1', {
            json_data: products,
            pageTitle: "Shop"
        });
    });
};

exports.getAdminProds = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('pages/project1/adminProds', {
            json_data: products,
            pageTitle: "Admin Products"
        });
    });
};

exports.getAddProduct = (req, res, next) => {
    res.render('pages/project1/add-product', {
        pageTitle: "Add Product"
    });
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

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/project1/');
};