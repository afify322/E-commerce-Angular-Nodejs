const {customeError} = require('../helpers/errorHandeler');
const { Product } = require('../models/product');
const { Category } = require('../models/category');

module.exports = {
    addProduct: async (req, res, next) => {
        

        
        const { body: { name, description, image, brand, price, category, countInStock, rating, dateCreated, isFeatured } } = req;
        const _category = await Category.findById(category);

        if(!_category) return res.status(400).send('Invalid Category');

        const product = await new Product({ name, description, image, brand, price, category, countInStock, rating, dateCreated, isFeatured });
         await product.save();
        res.status(200).json({ success: true, product });

    },

    findAllProduct: async (req, res,next) => {

        const {name,description,brand,priceMax,priceMin,ratingMax,ratingMin}=req.query;
        
            let {page ,limit} = req.query;
            const size=await Product.count().exec();
            const skip = (page || 1 - 1) *(limit || 10);
            const pages=Math.ceil(+size/+(limit || 10));

            const products = await Product.find({name: {$regex: name ?? "", $options: 'i'},
            description:{$regex: description ?? "",$options:'i'},
            price:{ $gt: priceMin??0, $lt: priceMax??200 },
            rating:{ $gt: ratingMin??0, $lt: ratingMax ??6}})
            .populate('category').limit(limit).skip(skip).exec();

            if(size==0)return next(customeError({status:400,message:"Products not found"}))
            return res.status(200).json({ success: true, products,pages,size });
     
    },

    findProductById: async (req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            next(customeError({ statusCode: 404, message: "To Do Not Found", code: "NOTFOUND-ERROR" }));
        }
        res.status(200).json({ success: true, product });
    },

    findProductByCategory: async (req, res) => {
        const { id } = req.params;
        let {page,size} = req.query;
        if(!page){
            page = 1;
        }
        if(!size){
            size = 9;
        }
        const limit = parseInt(size);
        const skip = (page - 1) *size;
         const category = await Category.findOne({_id : id});
          if(!category){
          throw customeError({ statusCode: 404, message: "Category Not Found", code: "NOTFOUND-ERROR" });
         }
        const products = await Product.find({ category: id }).limit(limit).skip(skip);

        if (!products) {

            throw customeError({ statusCode: 404, message: "Products Not Found", code: "NOTFOUND-ERROR" });
        }
        res.status(200).json({ success: true, products });
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
