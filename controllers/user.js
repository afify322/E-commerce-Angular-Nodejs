const { default: mongoose } = require('mongoose');
const { customeError } = require('../helpers/errorHandeler');
const { User } = require('../models/user');


exports.addUser = async (req, res, next) => {
  const { body } = req;
  let user = await new User(body);
  await user.save();
  return res.status(201).json({ success: true, user: { name: user.name, email: user.email, isAdmin: user.isAdmin } })
}

exports.logIn = async (req, res, next) => {
  const { body: { email, password } } = req;

  let user = await User.findOne({ email: email }).select('password email isAdmin');
  if(!user)return next(customeError({ status: 400, message: "invalid Email or Password" }));

  let isValid=await user.comparePasswords(password);
  if (isValid) {
    let token = await User.createToken(user);
    return res.status(200).json({ success: true, user:{_id:user.id,email:user.email,isAdmin:user.isAdmin},token });
  }
  return next(customeError({ status: 400, message: "invalid Email or Password" }));
}

exports.uploadImage = async (req, res, next) => {
  const { params: id } = req;
  const { file } = req;
  if (!file) {
    return next(customeError({ status: 400, message: "Image is required" }));
  }
  let user = await User.findByIdAndUpdate(mongoose.Types.ObjectId(id), { image: file.path }).select('-password');
  res.status(201).json({ success: true, user });
}


exports.findAll = async (req, res, next) => {
  let {page ,limit} = req.query;
            const size=await User.count().exec();
            const skip = (page || 1 - 1) *(limit || 10);
            const pages=Math.ceil(+size/+(limit || 10));

  let users = await User.find().select('-password').populate('favourite').skip(skip).limit(limit).exec();
  if (users.length == 0) {
    return res.status(404).json({ success: true, message: "Users not found" })
  }
  res.status(200).json({ success: true, users,pages,size });
}


exports.updateUser = async (req, res, next) => {
  const { body } = req;
  const { params: { id } } = req;
  let user = await User.findByIdAndUpdate(id, body);
  if (!user) {
    return next(customeError({ status: 404, message: "User not found" }))
  }
  return res.status(200).json({ success: true, user })
}

exports.deleteUser = async (req, res, next) => {
  const { params: { id } } = req;
  let user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(customeError({ status: 404, message: "User not found" }))
  }
  return res.status(200).json({ success: true, user });
}

exports.getUserById = async (req, res) => {
  const { params: {id} } = req;
  let user = await User.findOne({_id:id}).select('-password').populate('favourite');
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" })
  }
  res.status(200).json({ success: true, user });
}

exports.addFavourite = async (req, res, next) => {
  const { body: { productId, userId } } = req;
  let product = await User.updateOne({ _id: userId }, { $push: { favourite: productId } });
  res.status(200).json({ success: true, message: "Favourite was Added successfuly" });
}





