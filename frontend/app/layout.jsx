import '../globals.css';
import Link from 'next/link';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Lanley Wear',
  description: 'Modern Kenyan streetwear fashion store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-light text-dark font-sans">
        {/* Navbar */}
        <nav className="w-full py-4 bg-gradient-to-r from-primary via-accent to-blue-400 text-white shadow-md sticky top-0 z-50">
          <div className="container flex justify-between items-center">
            <h1 className="text-2xl font-bold">Lanley Wear</h1>
            <div className="flex gap-6 text-lg">
              <Link href="/" className="hover:text-black transition-colors">Home</Link>
              <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
              <Link href="/about" className="hover:text-black transition-colors">About</Link>
              <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
              <Link href="/admin" className="hover:text-black transition-colors">Admin</Link>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 container py-10">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
