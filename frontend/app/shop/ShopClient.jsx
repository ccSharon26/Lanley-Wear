"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function ShopClient({ products }) {
  const [mainCategory, setMainCategory] = useState('All');
  const [subCategory, setSubCategory] = useState('All');

  const mainCategories = ['All', 'Men', 'Women', 'Unisex'];
  const subCategories = ['All', 'Beachwear', 'Warmwear', 'Casual', 'Formal'];

  const filtered = products.filter(p => 
    (mainCategory === 'All' || p.mainCategory === mainCategory) &&
    (subCategory === 'All' || p.subCategory === subCategory)
  );

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>

      {/* Filters */}
      <div className="mb-4">
        <span className="mr-2 font-semibold">Main Category:</span>
        {mainCategories.map(cat => (
          <button key={cat} onClick={() => setMainCategory(cat)}
            className={`px-3 py-1 rounded-lg mr-2 mb-2 ${mainCategory === cat ? 'bg-primary text-white' : 'bg-grayish hover:bg-primary hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <span className="mr-2 font-semibold">Subcategory:</span>
        {subCategories.map(sub => (
          <button key={sub} onClick={() => setSubCategory(sub)}
            className={`px-3 py-1 rounded-lg mr-2 mb-2 ${subCategory === sub ? 'bg-primary text-white' : 'bg-grayish hover:bg-primary hover:text-white'}`}>
            {sub}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {filtered.map(item => (
          <Link key={item.id} href={`/product/${item.id}`}>
            <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl cursor-pointer">
              <div className="h-64 bg-gray-300 flex items-center justify-center">
                {item.images?.length > 0 ? <img src={item.images[0]} className="h-full w-full object-cover" /> : "No Image"}
              </div>
              <div className="p-4">
                <h2 className="font-bold text-lg">{item.name}</h2>
                <p className="text-primary font-semibold">KSh {item.price}</p>
                <p className={`font-semibold mt-2 ${item.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
