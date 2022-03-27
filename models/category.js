const { Schema,model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: "string",
        required: true
    },
    icon: {
        type: "string",
        // required: true
    },
    image: {
        type: "string",
        // required: true
    },
},{timestamps:true});

exports.Category=model("Category",CategorySchema)