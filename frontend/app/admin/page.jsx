"use client";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-400 via-blue-400 to-primary text-white rounded-2xl p-10 flex flex-col md:flex-row items-center gap-8 shadow-lg">
        <img
          src="/image2.png"
          alt="Admin"
          className="md:w-1/3 rounded-2xl shadow-lg"
        />
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">Welcome, Admin!</h1>
          <p className="text-white/90">
            Manage stock, track inventory, and update delivery status from here.
          </p>
        </div>
      </div>

      {/* Admin Action Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Link
          href="/admin/add"
          className="p-6 bg-pink-400 text-white rounded-xl shadow-lg hover:bg-pink-600 transition-colors duration-300"
        >
          Add New Stock
        </Link>

        <Link
          href="/admin/edit"
          className="p-6 bg-blue-400 text-white rounded-xl shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Edit Product
        </Link>

        <Link
          href="/admin/inventory"
          className="p-6 bg-primary text-white rounded-xl shadow-lg hover:bg-accent transition-colors duration-300"
        >
          Inventory
        </Link>

        <Link
          href="/admin/orders"
          className="p-6 bg-accent text-white rounded-xl shadow-lg hover:bg-primary transition-colors duration-300"
        >
          Orders / Delivery
        </Link>
      </div>
    </div>
  );
}
