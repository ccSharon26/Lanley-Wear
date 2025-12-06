const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Temp in-memory DB (later we can save to JSON or real DB)
let products = [];

/* -------------------- MULTER CONFIG -------------------- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

/* -------------------- GET ALL PRODUCTS -------------------- */
const getProducts = (req, res) => {
  res.json(products);
};

/* -------------------- GET PRODUCT BY ID -------------------- */
const getProductById = (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);

  if (!product) return res.status(404).json({ error: "Product not found" });
  
  res.json(product);
};

/* -------------------- ADD PRODUCT -------------------- */
const addProduct = (req, res) => {
  const { name, price, sizes, stock, mainCategory, subCategory, description } = req.body;

  const mainImage = req.files?.mainImage?.[0]?.filename || null;
  const extraImages = req.files?.extraImages?.map(f => f.filename) || [];

  const newProduct = {
    id: uuidv4(),
    name,
    price,
    sizes,
    stock,
    mainCategory,
    subCategory,
    description: description || "",

    // Backend representation
    mainImage,
    extraImages,

    // Combined for frontend
    images: [
      ...(mainImage ? [`/uploads/${mainImage}`] : []),
      ...extraImages.map(img => `/uploads/${img}`)
    ]
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

/* -------------------- EDIT PRODUCT -------------------- */
const editProduct = (req, res) => {
  const { id } = req.params;

  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  const old = products[index];

  const { name, price, sizes, stock, mainCategory, subCategory, description } = req.body;

  // Update images only if new ones uploaded
  const mainImage = req.files?.mainImage?.[0]?.filename || old.mainImage;
  const extraImages = req.files?.extraImages?.map(f => f.filename) || old.extraImages;

  const updated = {
    ...old,
    name,
    price,
    sizes,
    stock,
    mainCategory,
    subCategory,
    description,

    // Update backend image fields
    mainImage,
    extraImages,

    // Update frontend combined array
    images: [
      ...(mainImage ? [`/uploads/${mainImage}`] : []),
      ...extraImages.map(img => `/uploads/${img}`)
    ]
  };

  products[index] = updated;
  res.json(updated);
};

/* -------------------- DELETE PRODUCT -------------------- */
const deleteProduct = (req, res) => {
  const { id } = req.params;

  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  const prod = products[index];

  // Remove images from file system
  if (prod.mainImage) {
    fs.unlinkSync(path.join(__dirname, '../uploads', prod.mainImage));
  }

  prod.extraImages.forEach(img => {
    fs.unlinkSync(path.join(__dirname, '../uploads', img));
  });

  products.splice(index, 1);

  res.json({ message: "Product deleted" });
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
  upload
};
