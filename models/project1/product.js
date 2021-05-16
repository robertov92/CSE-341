/********************************************************
 * The following code saves products to a database
 ********************************************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);

/********************************************************
 * The following code saves products to a JSON file
 * Used for Prove03, but not anymore
 ********************************************************/

// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//     path.dirname(process.mainModule.filename),
//     'data',
//     'project1.json'
// );

// const getProductsFromFile = cb => {
//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             cb([]);
//         } else {
//             cb(JSON.parse(fileContent));
//         }
//     });
// };

// module.exports = class Product {
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }
//     save() {
//         getProductsFromFile(products => {
//             this.id = Math.random().toString();
//             products.push(this);
//             fs.writeFile(p, JSON.stringify(products), err => {
//                 console.log(err);
//             });
//         });
//     }

//     static deleteById(id) {
//         getProductsFromFile(products => {
//             const updatedProducts = products.filter(prod => prod.id !== id);
//             fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//                 console.log(err);
//             });
//         });
//     }

//     static fetchAll(cb) {
//         getProductsFromFile(cb);
//     }

// };