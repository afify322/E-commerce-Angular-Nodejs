const { default: mongoose } = require('mongoose');
const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({

    name: {
        type: "string",
        required: true
    },
    description: {
        type: "string",
        required: true
    },
    image: {
        type: "string",
        // required: true
    },
    brand: {
        type: "string",
        // required:true
    },
    price: {
        type: "number",
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },

    countInStock: {
        type: "number",
        required: true,
        min:0,
        max:255
    },
    rating: {
        type: "number",
        min: 0,
        max: 5,
        default:0
        // required:true
    },
    dateCreated: {
        type: Date, default: Date.now(), required: true
    },
    isFeatured: {
        type: "boolean",
        default: false
    }

})

exports.Product = model("Product", ProductSchema);