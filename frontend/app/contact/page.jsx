export default function ContactPage() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mt-10">
      <div className="md:w-1/2">
        <img
          src="/image3.png"
          alt="Contact Lanley Wear"
          className="rounded-2xl shadow-lg"
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4 text-primary">Contact Us</h1>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="border border-grayish rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
          <input type="email" placeholder="Email" className="border border-grayish rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
          <textarea placeholder="Message" className="border border-grayish rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" rows="5"></textarea>
          <button className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-accent transition-colors duration-300">Send Message</button>
        </form>
      </div>
    </div>
  );
}
