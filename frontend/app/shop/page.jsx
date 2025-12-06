import { fetchJSON } from '../../lib/api';
import ShopClient from './ShopClient';

export default async function ShopPage() {
  let products = [];
  try {
    products = await fetchJSON('/products');
  } catch (e) {
    console.error(e);
  }
  return <ShopClient products={products} />;
}
