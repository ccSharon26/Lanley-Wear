import { fetchJSON } from '../lib/api';
import Link from 'next/link';

export default async function HomePage() {
  let products = [];
  try {
    products = await fetchJSON('/products');
  } catch (e) {
    console.error(e);
  }

  const featured = products.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Lanley Wear</h1>
        <p className="text-gray-600 mb-6">Discover our latest outfits for men, women, and unisex.</p>
        <Link href="/shop" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors">
          Shop Now
        </Link>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map(item => (
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
      </section>
    </div>
  );
}
