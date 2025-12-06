import ProductDetail from './ProductDetail';
import { fetchJSON } from '../../../lib/api';

export default async function ProductPage({ params }) {
  const { id } = params;
  let product = null;

  try {
    const products = await fetchJSON('/products');
    product = products.find(p => p.id === id);
  } catch (e) {
    console.error(e);
  }

  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return <ProductDetail product={product} />;
}
