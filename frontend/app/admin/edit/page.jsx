"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "../../../lib/config";
import { fetchJSON } from "../../../lib/api";

export default function AdminEditList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const data = await fetchJSON("/products");
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (!products.length) return <p className="text-center mt-10">No products available</p>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin - Edit Products</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2">
            <img
              src={
                p.mainImage
                  ? `${API_BASE_URL}/uploads/${p.mainImage}`
                  : "/image1.png"
              }
              className="h-48 w-full object-cover rounded-lg"
            />

            <h2 className="font-bold text-lg">{p.name}</h2>
            <p className="text-gray-500">KSh {p.price}</p>
            <p className="text-gray-500">Stock: {p.stock}</p>

            <Link href={`/admin/edit/${p.id}`}>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent mt-2">
                Edit Product
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
