const express=require('express');
const router=express.Router();
const category=require('../controllers/category');



router.get('/',category.findAllCategories);
router.post('/',category.policy,category.addCategory);
router.delete('/:id',category.deleteCategoryById);
router.delete('/',category.deleteAllCategories);
router.put('/:id',category.updateCategory);
router.get('/:id',category.findById);


module.exports=router;