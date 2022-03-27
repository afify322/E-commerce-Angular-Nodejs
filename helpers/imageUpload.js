const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const fileFilter = (req, file, cb) => {
  if(file){
  if (
    file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' 
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}};

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'E-commerce',
    format: async (req, file) => 'png' || 'jpg' || 'jpeg', // supports promises as well
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

exports.parser = multer({ storage, fileFilter }).single('image')