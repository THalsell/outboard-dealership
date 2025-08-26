export default function BrandsSection() {
  const brands = [
    "Honda", "Yamaha", "Mercury", "Freedom", "Suzuki", "Tohatsu"
  ];

  return (
    <section className="py-16 bg-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Brands We Carry</h2>
          <p className="text-xl text-charcoal opacity-80">Authorized dealer for industry-leading manufacturers</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[80px] sm:min-h-[100px]"
            >
              <span className="text-sm sm:text-base lg:text-lg font-semibold text-navy text-center">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}