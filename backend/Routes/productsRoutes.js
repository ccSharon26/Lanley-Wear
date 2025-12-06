const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
  upload
} = require('../controllers/productsController');

// GET all products
router.get('/', getProducts);

// GET single product
router.get('/:id', getProductById);

// POST product
router.post(
  '/',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'extraImages', maxCount: 3 }
  ]),
  addProduct
);

// PUT edit product
router.put(
  '/:id',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'extraImages', maxCount: 3 }
  ]),
  editProduct
);

// DELETE product
router.delete('/:id', deleteProduct);

module.exports = router;
