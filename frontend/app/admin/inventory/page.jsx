"use client";
import { useEffect, useState } from "react";

export default function Inventory() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2">
            <img src={p.img} alt={p.name} className="h-48 w-full object-cover rounded-lg"/>
            <h2 className="font-bold text-lg">{p.name}</h2>
            <p className="text-primary font-semibold">KSh {p.price}</p>
            <p>Sizes: {p.sizes}</p>
            <p>Stock: {p.stock}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleDelete(p.id)} className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
