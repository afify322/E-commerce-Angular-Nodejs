const express = require('express');
const router = express.Router();
const Product = require('../controllers/product');
const {productValidation} = require('../middlewares/productValidation');
const {parser} = require('../helpers/imageUpload')

router.get('/', Product.findAllProduct);
router.get('/:id',Product.findProductById);
router.get('/category/:id',Product.findProductByCategory);
router.post('/',parser, Product.addProduct);
router.patch('/:id', Product.EditProductById);
router.delete('/:id', Product.deleteProduct);



module.exports = router;
