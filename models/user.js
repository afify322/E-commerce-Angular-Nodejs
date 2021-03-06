const { Schema, model, Types } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const jwtConvert = promisify(jwt.sign);
const UserSchema = new Schema({

    name: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true,
        unique: true
    },
    password: {
        type: "string"
    },
    image: {
        type: "string"
    },
    street: {
        type: "string"
    },
    apartment: {
        type: "string"
    },
    city: {
        type: "string"
    },
    zip: {
        type: "string"
    },
    country: {
        type: "string"
    },
    phone: {
        type: "string"
    },
    isAdmin: {
        type: "boolean",
        default: false
    },
    favourite: [{
        type: Types.ObjectId,
        ref: 'Product'
    }]

})

UserSchema.pre('save', async function (req, res) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);


})
UserSchema.methods.comparePasswords = async function (password) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
}

UserSchema.statics.createToken = async (user) => {
    user = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }
    return await jwtConvert(user, process.env.SECRET_KEY, { expiresIn: "23d" });
}


exports.User = model("User", UserSchema);