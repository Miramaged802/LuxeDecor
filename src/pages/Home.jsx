import { Link } from 'react-router-dom';

const Home = () => {
  // Product data
  const featuredProducts = [
    {
      id: 1,
      name: "Elara Three-Seater Sofa",
      description: "A modern three-seater with plush fabric upholstery for cozy living rooms.",
      price: 679.99,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      details: {
        dimensions: '82" W x 36" D x 34" H',
        material: 'Oak Frame, Polyester Fabric',
        rating: '★★★★☆ (4.6/5 - 87 Reviews)'
      }
    },
    {
      id: 2,
      name: "Rustic Oak Coffee Table",
      description: "A sturdy table crafted from reclaimed oak for a rustic touch.",
      price: 349.00,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
      details: {
        dimensions: '48" W x 24" D x 18" H',
        material: 'Reclaimed Oak, Steel Legs',
        rating: '★★★★★ (4.8/5 - 54 Reviews)'
      }
    },
    {
      id: 3,
      name: "Verona Leather Armchair",
      description: "A luxurious leather armchair with tufted detailing for elegance.",
      price: 899.00,
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37",
      details: {
        dimensions: '34" W x 38" D x 35" H',
        material: 'Full-Grain Leather, Walnut Frame',
        rating: '★★★★☆ (4.7/5 - 72 Reviews)'
      }
    }
  ];

  const whyUsItems = [
    {
      icon: '🛠️',
      title: 'Expert Craftsmanship',
      description: 'Each piece is handcrafted by artisans with over 20 years of experience.'
    },
    {
      icon: '🌿',
      title: 'Sustainable Materials',
      description: 'We use responsibly sourced wood and eco-friendly finishes.'
    },
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Enjoy free delivery on orders over $500, nationwide.'
    }
  ];

  const inspirationItems = [
    {
      category: "Living Room",
      description:
        "Create a cozy yet stylish living room with our curated furniture pieces.",
      image: "img/Living Room.jpg",
    },
    {
      category: "Bedroom",
      description:
        "Design a serene and elegant bedroom that promotes relaxation and comfort.",
      image: "img/Bedroom.jpg",
    },
    {
      category: "Dining Room",
      description:
        "Set the perfect dining scene with our modern and functional furniture.",
      image: "img/Dining Room.jpg",
    },
  ];

  return (
    <div className="bg-gray-50 font-sans antialiased">
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-[70vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: "url('img/banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Elevate Your Space with Elegance
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            Discover modern furniture that blends style, comfort, and durability
            for your dream home.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/shop"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/why-us"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card bg-white p-6 rounded-xl shadow-md"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>
                    <span className="font-medium">Dimensions:</span>{" "}
                    {product.details.dimensions}
                  </p>
                  <p>
                    <span className="font-medium">Material:</span>{" "}
                    {product.details.material}
                  </p>
                  <p>
                    <span className="font-medium">Rating:</span>{" "}
                    {product.details.rating}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/collections"
              className="text-blue-600 font-semibold hover:underline"
            >
              View All Collections →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-16 sm:py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12">
            Why Furniture Haven?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUsItems.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Hub Section */}
      <section id="inspiration" className="py-16 sm:py-20 text-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12">
            Find Your Design Inspiration
          </h2>
          <p className="text-center text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Explore curated design ideas and transform your space into a
            reflection of your personality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {inspirationItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <img
                  src={item.image}
                  alt={`${item.category} Inspiration`}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.category}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <Link
                  to="#"
                  className="text-blue-600 font-semibold hover:underline transition duration-300"
                >
                  Explore Ideas →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
