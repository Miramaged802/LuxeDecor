import { Link } from "react-router-dom";

const Collections = () => {
  const collections = [
    {
      id: 1,
      name: "Living Room",
      description:
        "Create a cozy yet stylish living room with our curated furniture pieces.",
      image: "img/Living Room.jpg",
    },
    {
      id: 2,
      name: "Bedroom",
      description:
        "Design a serene and elegant bedroom that promotes relaxation and comfort.",
      image: "img/Bedroom.jpg",
    },
    {
      id: 3,
      name: "Dining Room",
      description:
        "Set the perfect dining scene with our modern and functional furniture.",
      image: "img/Dining Room.jpg",
    },
    {
      id: 4,
      name: "Home Office",
      description:
        "Productive workspaces with ergonomic and stylish furniture solutions.",
      image: "img/Home Office.jpg",
    },
    {
      id: 5,
      name: "Outdoor",
      description:
        "Durable and weather-resistant furniture for your outdoor living spaces.",
      image: "img/Outdoor.jpg",
    },
    {
      id: 6,
      name: "Kids Room",
      description:
        "Fun and functional furniture designed specifically for children's spaces.",
      image: "img/Kids Room.jpg",
    },
  ];

  return (
    <div className="bg-gray-50 font-sans antialiased">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Our Collections
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            Explore our carefully curated furniture collections for every room
            in your home.
          </p>
          <Link
            to="#collections"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Browse Collections
          </Link>
        </div>
      </section>

      {/* Collections Grid */}
      <section id="collections" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="group relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{collection.name}</h3>
                  <p className="text-sm mb-3">{collection.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{collection.items}</span>
                    <Link
                      to={`/shop?collection=${collection.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-300"
                    >
                      View Collection
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12">
            Popular in Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product 1 */}
            <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <img
                src="img/Verona Leather Armchair.jpg"
                alt="Verona Leather"
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Verona Leather Armchair
              </h3>
              <p className="text-blue-600 font-bold mb-3">$899.00</p>
              <Link
                to={`/product/prod-043`}
                className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                View Details
              </Link>
            </div>

            {/* Product 2 */}
            <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <img
                src="img\table-oak-cream.webp"
                alt="Rustic Oak Coffee Table"
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Rustic Oak Coffee Table
              </h3>
              <p className="text-blue-600 font-bold mb-3">$349.00</p>
              <Link
                to={`/product/prod-044`}
                className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                View Details
              </Link>
            </div>

            {/* Product 3 */}
            <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <img
                src="img\Bohemian Sectional Sofa.jpg"
                alt="Bohemian Sectional Sofa"
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Bohemian Sectional Sofa
              </h3>
              <p className="text-blue-600 font-bold mb-3">$1,199.00</p>
              <Link
                to={`/product/prod-045`}
                className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                View Details
              </Link>
            </div>

            {/* Product 4 */}
            <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <img
                src="img\Velvet Bed Frame.jpg"
                alt="Velvet Bed Frame"
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Velvet Bed Frame
              </h3>
              <p className="text-blue-600 font-bold mb-3">$1,299.00</p>
              <Link
                to={`/product/prod-046`}
                className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
