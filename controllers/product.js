const {customeError} = require('../helpers/errorHandeler');
const { Product } = require('../models/product');
const { Category } = require('../models/category');

module.exports = {
    addProduct: async (req, res, next) => {
        
        
        let { body: { name, description, image, brand, price, category, countInStock, rating, dateCreated, isFeatured } } = req;
        const _category = await Category.findById(category);
        const exist=await Product.findOne({name:name});
        if(exist)return res.status(400).json({success:false,message:"Product Name Already exists"})

        if(!_category) return res.status(400).send('Invalid Category');
        image=req.file.path
        const product = await new Product({ name, description, image, brand, price, category, countInStock, rating, dateCreated, isFeatured });
         await product.save();
        res.status(200).json({ success: true, product });

    },

    findAllProduct: async (req, res,next) => {

     
        let {page ,limit} = req.query;
        const {name,description,brand,priceMax,priceMin,ratingMax,ratingMin}=req.query;
        limit = limit || 10;
        page = page || 1;
        const skip = (page - 1) *(limit);
        const productsPromise =  Product.find({}).and({name: {$regex: name ?? "", $options: 'i'},
        description:{$regex: description ?? "",$options:'i'},
        price:{ $gte: priceMin??0, $lte: priceMax??20000 },
        rating:{ $gte: ratingMin??0, $lte: ratingMax ??6}}).populate('category');
        const sizePromise=productsPromise.clone();

        const products=await productsPromise.limit(limit).skip(skip);
        const size=await sizePromise.count();
       
        const pages=Math.ceil(+size/+(limit));
        if (products.length==0) {

            throw customeError({ statusCode: 404, message: "Products Not Found", code: "NOTFOUND-ERROR" });
        }
        res.status(200).json({ success: true, products,pages,size });
     
    },

    findProductById: async (req, res,next) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            next(customeError({ statusCode: 404, message: "To Do Not Found", code: "NOTFOUND-ERROR" }));
        }
        res.status(200).json({ success: true, product });
    },

    findProductByCategory: async (req, res,next) => {
        const { id } = req.params;
        let {page ,limit} = req.query;
        const {name,description,brand,priceMax,priceMin,ratingMax,ratingMin}=req.query;
        limit = limit || 10;
        page = page || 1;
        const skip = (page - 1) *(limit);
        const category = await Category.findOne({_id : id});
        if(!category){
            throw customeError({ statusCode: 404, message: "Category Not Found", code: "NOTFOUND-ERROR" });
        }
        const productsPromise =  Product.find({ category: id }).and({name: {$regex: name ?? "", $options: 'i'},
        description:{$regex: description ?? "",$options:'i'},
        price:{ $gte: priceMin??0, $lte: priceMax??20000 },
        rating:{ $gte: ratingMin??0, $lte: ratingMax ??6}}).populate('category');
        const sizePromise=productsPromise.clone();

        const products=await productsPromise.limit(limit).skip(skip);
        const size=await sizePromise.count();
       
        const pages=Math.ceil(+size/+(limit));
        if (products.length==0) {

            throw customeError({ statusCode: 404, message: "Products Not Found", code: "NOTFOUND-ERROR" });
        }
        res.status(200).json({ success: true, products,pages,size });
    },
    EditProductById: async (req, res, next) => {
        
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });
        if (!product) {
            throw customeError({ statusCode: 404, message: "Product Not Found", code: "NOTFOUND-ERROR" });
        }

        res.status(200).json({ success: true, product });

    },
    deleteProduct: async (req, res, next) => {
        const { id } = req.params;
        const product = await Product.findByIdAndRemove(id);
        if (!product) {
            throw customeError({ statusCode: 404, message: "ToDo Not Found", code: "NOTFOUND-ERROR" });
        }
        res.status(200).json({ success: true, product });


    },
}
