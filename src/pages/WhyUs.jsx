
import { 
  Hammer, 
  Leaf, 
  Truck, 
  Smile, 
  Palette,
  Star,
  Check,
  Award,
  Shield,
  Heart
} from 'lucide-react';

const WhyUs = () => {
  const stats = [
    { number: '20+', title: 'Years of Craftsmanship', desc: 'Experience you can trust.' },
    { number: '95%', title: 'Customer Satisfaction', desc: 'Based on 10,000+ reviews.' },
    { number: '50,000+', title: 'Pieces Sold', desc: 'Across the nation.' },
    { number: '100%', title: 'Sustainable Sourcing', desc: 'Eco-friendly materials.' }
  ];

  const features = [
    {
      title: "Expert Craftsmanship",
      image: "img/Expert Craftsmanship.png",
      desc: "Our artisans bring over two decades of expertise to every piece, using time-honored techniques like dovetail joinery and hand-finishing to ensure unmatched quality.",
      points: [
        "Precision Engineering: Every joint is meticulously crafted for strength.",
        "Hand-Finished Details: Polished to perfection by skilled hands.",
        "Durability Tested: Built to withstand years of use.",
      ],
      footer:
        "From our workshop in Vermont, we've perfected the art of furniture-making since 2020.",
    },
    {
      title: "Sustainable Materials",
      image: "img/Sustainable Materials.jpg",
      desc: "We partner with FSC-certified suppliers to source responsibly harvested oak, pine, and walnut, paired with eco-friendly finishes that are safe for your home and the planet.",
      points: [
        "FSC-Certified Wood: Harvested from managed forests.",
        "Low-VOC Finishes: Non-toxic and environmentally friendly.",
        "Recycled Accents: Steel and brass from sustainable sources.",
      ],
      footer: "Over 80% of our materials are renewable or recycled.",
    },
    {
      title: "Free Shipping",
      image: "img/Free Shipping.jpg",
      desc: "We offer free nationwide shipping on orders over $500, with fast delivery and optional white-glove service to ensure your furniture arrives in perfect condition.",
      points: [
        "Fast Delivery: 5-7 business days to your door.",
        "Real-Time Tracking: Monitor your order every step of the way.",
        "White-Glove Option: Unpacking and setup included.",
      ],
      footer: "Serving all 50 states with a 98% on-time delivery rate.",
    },
    {
      title: "Customer Satisfaction",
      image: "img/Customer Satisfaction.avif",
      desc: "Our 30-day satisfaction guarantee, hassle-free returns, and 24/7 support team are here to make your experience exceptional.",
      points: [
        "30-Day Returns: Full refund or exchange, no questions asked.",
        "24/7 Support: Reach us via phone, email, or chat.",
        "High Approval: 95%+ customer satisfaction rate.",
      ],
      footer: "Over 10,000 happy customers since our launch.",
    },
    {
      title: "Custom Design",
      image: "img/Custom Design.jpg",
      desc: "Tailor your furniture with our interactive tool, selecting from premium materials, vibrant colors, and custom dimensions to fit your space perfectly.",
      points: [
        "Endless Options: Choose from 50+ fabrics and finishes.",
        "Live Previews: See your design in real-time.",
        "Expert Guidance: Free consultations with our design team.",
      ],
      footer: "Over 5,000 unique designs created by customers.",
    },
  ];

  const testimonials = [
    {
      quote: 'The craftsmanship on my Rustic Oak Table is stunning. It\'s become the centerpiece of my home!',
      author: 'Emily R. - Portland, OR',
      rating: '★★★★★ (5/5)'
    },
    {
      quote: 'Customizing my sofa was so easy, and the shipping was fast. I\'m beyond happy with Furniture Haven.',
      author: 'Michael P. - Denver, CO',
      rating: '★★★★☆ (4.9/5)'
    },
    {
      quote: 'Sustainable and stylish—my Verona Armchair is proof you don\'t have to compromise.',
      author: 'Lisa K. - Chicago, IL',
      rating: '★★★★★ (5/5)'
    }
  ];

  return (
    <div className="bg-gray-50 font-sans antialiased">
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center bg-cover bg-center" 
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Why Furniture Haven Stands Out</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            With a dedication to craftsmanship, sustainability, and customer care, we bring you furniture that's more than just a purchase—it's an investment.
          </p>
          <a href="#features" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
            Discover Our Difference
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 group">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {index === 0 && <Hammer className="w-8 h-8 text-blue-600" />}
                  {index === 1 && <Smile className="w-8 h-8 text-blue-600" />}
                  {index === 2 && <Truck className="w-8 h-8 text-blue-600" />}
                  {index === 3 && <Leaf className="w-8 h-8 text-blue-600" />}
                </div>
                <span className="text-4xl font-bold text-blue-600 group-hover:text-blue-800 transition duration-500">
                  {stat.number}
                </span>
                <p className="text-gray-600 text-lg font-semibold mt-2">{stat.title}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12">Our Core Values</h2>
          
          {features.map((feature, index) => (
            <div key={index} className={`bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl mb-16 flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}>
              <img src={feature.image} alt={feature.title} className="w-full lg:w-1/2 h-96 rounded-md object-cover" />
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.desc}</p>
                <ul className="text-sm text-gray-500 space-y-2 mb-4">
                  {feature.points.map((point, i) => (
                    <li key={i}><strong>{point.split(':')[0]}:</strong>{point.split(':')[1]}</li>
                  ))}
                </ul>
                <p className="text-gray-600 text-sm">{feature.footer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className=" py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12">Voices of Our Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">"{testimonial.quote}"</p>
                <p className="text-gray-800 font-semibold">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.rating}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default WhyUs;
