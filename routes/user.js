const express = require('express');
const router = express.Router();
const { findAll, addUser, logIn, uploadImage, addFavourite, deleteUser, updateUser, getUserById } = require('../controllers/user');
const { userValidation } = require('../middlewares/userValidation');
const { logInValidation } = require('../middlewares/logInValidation')
const { isAdmin } = require('../middlewares/isAuthenticated');
const { parser } = require('../helpers/imageUpload');

router.get('/', findAll);
router.post('/', userValidation, addUser);
router.post('/login', logInValidation, logIn);
router.delete('/', deleteUser);
router.patch('/', updateUser);

router.patch('/uploadImage/:id', parser, uploadImage);
router.post('/addFavourite', addFavourite);
router.get('/:id', getUserById);


module.exports = router;
