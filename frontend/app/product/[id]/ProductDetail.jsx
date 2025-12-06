"use client";
import { useState } from "react";
import { API_BASE_URL } from "../../../lib/config";

export default function ProductDetail({ product }) {
  // build image URLs: main then extras
  const images = [
    ...(product.mainImage ? [`${API_BASE_URL}/uploads/${product.mainImage}`] : []),
    ...(product.extraImages?.map(f => `${API_BASE_URL}/uploads/${f}`) ?? [])
  ];

  const fallback = ["/image1.png"];
  const allImages = images.length ? images : fallback;
  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  return (
    <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-8">
      {/* Images Section */}
      <div>
        <div className="h-96 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden mb-4">
          <img src={selectedImage} alt={product.name} className="h-full w-full object-cover" />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4">
          {allImages.map((img, index) => (
            <div
              key={index}
              className={`h-24 w-24 border rounded-lg cursor-pointer overflow-hidden ${selectedImage === img ? 'border-primary' : 'border-gray-300'}`}
              onClick={() => setSelectedImage(img)}
            >
              <img src={img} alt={`Thumbnail ${index}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-primary font-semibold text-xl mb-2">KSh {product.price}</p>
          <p className="text-sm text-gray-500 mb-2">Sizes: {product.sizes}</p>
          <p className={`font-semibold mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          <p className="text-gray-700 mb-6">{product.description || "No description available."}</p>
        </div>

        <div className="flex gap-4">
          <button
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors"
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
          <button
            className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-primary transition-colors"
            disabled={product.stock === 0}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
