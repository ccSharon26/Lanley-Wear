const { Pool } = require('pg');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL missing in .env");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Create table if missing
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      sku TEXT,
      name TEXT NOT NULL,
      description TEXT,
      price NUMERIC(10,2) DEFAULT 0,
      stock INT DEFAULT 0,
      pr_sent INT DEFAULT 0,
      image_url TEXT,
      size TEXT,
      category TEXT,
      color TEXT,
      featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer_name TEXT,
      customer_phone TEXT,
      customer_email TEXT,
      shipping_address TEXT,
      shipping_notes TEXT,
      status TEXT DEFAULT 'pending',
      total NUMERIC(12,2) DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INT REFERENCES orders(id) ON DELETE CASCADE,
      product_id INT REFERENCES products(id),
      product_name TEXT,
      price NUMERIC(10,2),
      qty INT,
      size TEXT
    );

    CREATE TABLE IF NOT EXISTS sales (
      id SERIAL PRIMARY KEY,
      order_id INT REFERENCES orders(id),
      product_id INT,
      qty INT,
      total_price NUMERIC(12,2),
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS pr_packages (
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES products(id),
      quantity INT,
      sent_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Ensure missing columns exist (safe even if table exists)
  const columns = [
    `ALTER TABLE products ADD COLUMN IF NOT EXISTS size TEXT;`,
    `ALTER TABLE products ADD COLUMN IF NOT EXISTS color TEXT;`,
    `ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT;`,
    `ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;`,
    `ALTER TABLE products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;`,
    `ALTER TABLE products ADD COLUMN IF NOT EXISTS pr_sent BOOLEAN DEFAULT false;`
  ];

  for (const q of columns) {
    try {
      await pool.query(q);
    } catch (err) {
      console.log("Column check error:", err.message);
    }
  }

  console.log("✅ DB initialized (tables + columns ready).");
}

initDB().catch(e => console.error(e));

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
