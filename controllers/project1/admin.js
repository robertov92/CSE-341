const Product = require('../../models/project1/product');

// gets products to show in the 'Admin Products' page
exports.getAdminProds = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('pages/project1/adminProds', {
                prods: products,
                pageTitle: 'Admin Products'
            });
        })
        .catch(err => console.log(err));
};

// gets products (from JSON) to show in the 'Admin Products' page
// exports.getAdminProds = (req, res, next) => {
//    Product.fetchAll(products => {
//        res.render('pages/project1/adminProds', {
//            json_data: products,
//            pageTitle: "Admin Products"
//        });
//    });
// };

// gets 'Add Product' page
exports.getAddProduct = (req, res, next) => {
    res.render('pages/project1/add-product', {
        pageTitle: 'Add Product',
        editing: false
    });
};

// adds a product to database
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
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
        });
};

// adds a product (using JSON)
// exports.postAddProduct = (req, res, next) => {
//     const title = req.body.title;
//     const imageUrl = req.body.imageUrl;
//     const price = req.body.price;
//     const description = req.body.description;
//     const product = new Product(null, title, imageUrl, description, price);
//     product.save();
//     res.redirect('/project1/');
// };

// deletes a product from database
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            res.redirect('/project1/adminProds');
        })
        .catch(err => console.log(err));
};

// deletes product from JSON
// exports.postDeleteProduct = (req, res, next) => {
//    const prodId = req.body.productId;
//    Product.deleteById(prodId);
//    res.redirect('/project1/');
// };

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
                product: product
            });
        })
        .catch(err => console.log(err));
};

// edits a product in database
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            return product.save();
        })
        .then(() => {
            res.redirect('/project1/adminProds');
        })
        .catch(err => console.log(err));
};