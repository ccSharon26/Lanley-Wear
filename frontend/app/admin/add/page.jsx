"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    price: "",
    sizes: "",
    stock: 0,
    mainImage: null,
    extraImages: [],
    mainCategory: "Men",
    subCategory: "Casual",
    description: ""
  });

  const mainCategories = ["Men", "Women", "Unisex"];
  const subCategories = ["Beachwear", "Warmwear", "Casual", "Formal"];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleMainImage = (e) => setForm({ ...form, mainImage: e.target.files[0] });
  const handleExtraImages = (e) => setForm({ ...form, extraImages: Array.from(e.target.files) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("sizes", form.sizes);
    data.append("stock", form.stock);
    data.append("mainCategory", form.mainCategory);
    data.append("subCategory", form.subCategory);
    data.append("description", form.description);

    if (form.mainImage) data.append("mainImage", form.mainImage);
    form.extraImages.forEach(file => data.append("extraImages", file));

    try {
      const res = await fetch("http://localhost:5000/products", { method: "POST", body: data });
      if (!res.ok) throw new Error("Failed to add product");
      alert("Product added!");
      router.push("/admin/edit");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="border p-3 rounded-lg"/>
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="border p-3 rounded-lg"/>
        <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="Sizes (comma-separated)" className="border p-3 rounded-lg"/>
        <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock Quantity" className="border p-3 rounded-lg"/>

        <label>Main Image</label>
        <input type="file" accept="image/*" onChange={handleMainImage} className="border p-2 rounded-lg"/>
        <label>Extra Images (thumbnails)</label>
        <input type="file" accept="image/*" multiple onChange={handleExtraImages} className="border p-2 rounded-lg"/>

        <select name="mainCategory" value={form.mainCategory} onChange={handleChange} className="border p-3 rounded-lg">
          {mainCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select name="subCategory" value={form.subCategory} onChange={handleChange} className="border p-3 rounded-lg">
          {subCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-3 rounded-lg"/>
        <button type="submit" className="bg-primary text-white py-3 rounded-lg hover:bg-accent transition-colors">Add Product</button>
      </form>
    </div>
  );
}
