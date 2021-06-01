const Product = require('../../models/project1/product');
const { validationResult } = require('express-validator/check');

// gets products to show in the 'Admin Products' page
exports.getAdminProds = (req, res, next) => {
    Product.find({ userId: req.user._id })
        .then(products => {
            res.render('pages/project1/adminProds', {
                prods: products,
                pageTitle: 'Admin Products'
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// gets 'Add Product' page
exports.getAddProduct = (req, res, next) => {
    res.render('pages/project1/add-product', {
        pageTitle: 'Add Product',
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: []
    });
};

// adds a product to database
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('pages/project1/add-product', {
            pageTitle: 'Add Product',
            editing: false,
            hasError: true,
            product: { title, imageUrl, price, description },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    });

    product
        .save()
        .then(() => {
            res.redirect('/project1/adminProds');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// deletes a product from database
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteOne({ _id: prodId, userId: req.user._id })
        .then(() => {
            res.redirect('/project1/adminProds');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// gets and populates edit page (which is also the add page)
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('pages/project1/add-product', {
                pageTitle: 'Edit Product',
                editing: editMode,
                product: product,
                hasError: false,
                errorMessage: null,
                validationErrors: []
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// edits a product in database
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('pages/project1/add-product', {
            pageTitle: 'Edit Product',
            editing: true,
            hasError: true,
            product: { title: updatedTitle, imageUrl: updatedImageUrl, price: updatedPrice, description: updatedDesc, _id: prodId },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    Product.findById(prodId)
        .then(product => {
            if (product.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/project1/');
            }
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            return product.save().then(() => {
                res.redirect('/project1/adminProds');
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};