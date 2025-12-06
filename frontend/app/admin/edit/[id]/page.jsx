"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "../../../../lib/config";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    sizes: "",
    stock: "",
    mainCategory: "Men",
    subCategory: "Casual",
    description: "",
    mainImageFile: null,
    extraImageFiles: [],
  });
  const [loading, setLoading] = useState(true);

  const mainCategories = ["Men", "Women", "Unisex"];
  const subCategories = ["Beachwear", "Warmwear", "Casual", "Formal"];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
        setForm({
          name: data.name ?? "",
          price: data.price ?? "",
          sizes: data.sizes ?? "",
          stock: data.stock ?? 0,
          mainCategory: data.mainCategory ?? "Men",
          subCategory: data.subCategory ?? "Casual",
          description: data.description ?? "",
          mainImageFile: null,
          extraImageFiles: [],
        });
      } catch (err) {
        console.error("Failed to load product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleMainImage = (e) =>
    setForm({ ...form, mainImageFile: e.target.files?.[0] ?? null });

  const handleExtraImages = (e) =>
    setForm({ ...form, extraImageFiles: e.target.files ? Array.from(e.target.files) : [] });

  const handleEdit = async () => {
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("price", form.price);
      data.append("sizes", form.sizes);
      data.append("stock", form.stock);
      data.append("mainCategory", form.mainCategory);
      data.append("subCategory", form.subCategory);
      data.append("description", form.description);

      if (form.mainImageFile) data.append("mainImage", form.mainImageFile);
      form.extraImageFiles.forEach((img) => data.append("extraImages", img));

      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Update failed:", res.status, text);
        alert("Failed to update product");
        return;
      }

      alert("Product updated successfully!");
      router.push("/admin/edit");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Error updating product");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      <div className="flex flex-col gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name"
          className="border p-3 rounded-lg" />

        <input name="price" type="number" value={form.price} onChange={handleChange}
          placeholder="Price" className="border p-3 rounded-lg" />

        <input name="sizes" value={form.sizes} onChange={handleChange}
          placeholder="Sizes" className="border p-3 rounded-lg" />

        <input name="stock" type="number" value={form.stock} onChange={handleChange}
          placeholder="Stock" className="border p-3 rounded-lg" />

        {/* Main Image Preview */}
        <p className="font-semibold">Main Image</p>
        {product.mainImage ? (
          <img
            src={`${API_BASE_URL}/uploads/${product.mainImage}`}
            alt="main"
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg">No main image</div>
        )}
        <input type="file" accept="image/*" onChange={handleMainImage} className="border p-2 rounded-lg" />

        {/* Extra Images Preview */}
        <p className="font-semibold">Extra Images</p>
        <div className="grid grid-cols-3 gap-3">
          {product.extraImages?.length ? product.extraImages.map((img, i) => (
            <img key={i} src={`${API_BASE_URL}/uploads/${img}`} alt={`extra-${i}`} className="h-24 object-cover rounded-lg" />
          )) : (
            <div className="col-span-3 text-sm text-gray-500">No extra images</div>
          )}
        </div>
        <input type="file" multiple accept="image/*" onChange={handleExtraImages} className="border p-2 rounded-lg" />

        <select name="mainCategory" value={form.mainCategory} onChange={handleChange} className="border p-3 rounded-lg">
          {mainCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select name="subCategory" value={form.subCategory} onChange={handleChange} className="border p-3 rounded-lg">
          {subCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <input name="description" value={form.description} onChange={handleChange} placeholder="Description"
               className="border p-3 rounded-lg" />

        <button onClick={handleEdit} className="bg-primary text-white py-3 rounded-lg hover:bg-accent">
          Save Changes
        </button>
      </div>
    </div>
  );
}
