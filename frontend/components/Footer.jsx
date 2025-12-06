export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary via-accent to-blue-400 text-white py-6 mt-auto">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <p className="font-semibold">© 2025 Lanley Wear</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <a
            href="#"
            className="hover:text-black transition-colors duration-300 font-medium"
          >
            Instagram
          </a>
          <a
            href="#"
            className="hover:text-black transition-colors duration-300 font-medium"
          >
            TikTok
          </a>
          <a
            href="#"
            className="hover:text-black transition-colors duration-300 font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
