const express = require('express');
const cors = require('cors');
const productsRoutes = require('./routes/productsRoutes');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Products API
app.use('/products', productsRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
