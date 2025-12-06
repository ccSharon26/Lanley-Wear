export default function AboutPage() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mt-10">
      <div className="md:w-1/2">
        <img
          src="/image1.png"
          alt="About Lanley Wear"
          className="rounded-2xl shadow-lg"
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4 text-primary">About Lanley Wear</h1>
        <p className="text-grayish mb-4">
          Lanley Wear is a premium Kenyan streetwear brand, blending modern style with local culture.
        </p>
        <p className="text-grayish">
          We deliver high-quality clothing directly to your door. Explore our vibrant collection and join the Lanley movement.
        </p>
      </div>
    </div>
  );
}
