import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveDesign } from "../redux/slices/designSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { Save, ShoppingCart, ArrowLeft, RefreshCw } from "lucide-react";

const Design = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState("sofa");
  const [selectedMaterial, setSelectedMaterial] = useState("oak");
  const [selectedColor, setSelectedColor] = useState("taupe");
  const [selectedSize, setSelectedSize] = useState("medium");
  const [previewImage, setPreviewImage] = useState("/img/sofa-oak-taupe2.jpg");

  // Item Images with local links
  const itemImages = useMemo(
    () => ({
      "sofa-oak-taupe": "img/sofa-oak-taupe2.jpg",
      "sofa-oak-cream": "img/sofa-oak-cream.jpg",
      "sofa-oak-gray": "img/sofa-oak-gray.avif",
      "sofa-velvet-taupe": "img/sofa-velvet-taupe.jpg",
      "sofa-velvet-cream": "img/sofa-velvet-cream.jpg",
      "sofa-velvet-gray": "img/sofagray.jpg",
      "sofa-leather-taupe": "img/sofa-leather-darkgray.webp",
      "sofa-leather-cream": "img/sofa-leather-cream.jpg",
      "sofa-leather-gray": "img/sofa-leather-gray.jpg",
      "chair-oak-taupe": "img/chair-oak-taupe.avif",
      "chair-oak-cream": "img/chair-oak-cream.jpg",
      "chair-oak-gray": "img/chair-oak-gray.jpg",
      "chair-velvet-taupe": "img/chair-velvet-dark.webp",
      "chair-velvet-cream": "img/chair-velvet-cream.jpg",
      "chair-velvet-gray": "img/chair-velvet-gray.jpg",
      "chair-leather-taupe": "img/chair-leather-taupe.jpg",
      "chair-leather-cream": "img/chair-leather-cream.jpg",
      "chair-leather-gray": "img/chair-leather-gray.jpg",
      "table-oak-taupe": "img/table-oak-taupe.jpg",
      "table-oak-cream": "img/table-oak-cream.webp",
      "table-oak-gray": "img/table-oak-gray.jpg",
      "table-velvet-taupe": "img/table-velvet-dark.jpg",
      "table-velvet-cream": "img/table-velvet-cream.jpg",
      "table-velvet-gray": "img/table-velvet-gray.jpg",
      "table-leather-taupe": "img/table-leather-dark.jpg",
      "table-leather-cream": "img/table-leather-cream.webp",
      "table-leather-gray": "img/table-leather-gray.avif",
      "dining-oak-taupe": "img/dining-oak-dark.avif",
      "dining-oak-cream": "img/dining-oak-cream.avif",
      "dining-oak-gray": "img/dining-oak-gray.webp",
      "dining-velvet-taupe": "img/dining-velvet-dark.webp",
      "dining-velvet-cream": "img/dining-velvet-cream.webp",
      "dining-velvet-gray": "img/dining-velvet-gray.webp",
      "dining-leather-taupe": "img/dining-leather-dark.jpg",
      "dining-leather-cream": "img/dining-leather-cream.jpg",
      "dining-leather-gray": "img/dining-leather-gray.jpg",
    }),
    []
  );

  // Price Mapping
  const itemPrices = {
    sofa: { small: 599.99, medium: 679.99, large: 799.99 },
    chair: { small: 399.99, medium: 499.99, large: 599.99 },
    table: { small: 249.99, medium: 349.99, large: 449.99 },
    dining: { small: 649.99, medium: 749.99, large: 849.99 },
  };

  // Item names
  const itemNames = {
    sofa: "Elara Three-Seater Sofa",
    chair: "Verona Leather Armchair",
    table: "Rustic Oak Coffee Table",
    dining: "Industrial Dining Table",
  };

  useEffect(() => {
    const updatePreview = () => {
      const key = `${selectedItem}-${selectedMaterial}-${selectedColor}`;
      if (itemImages[key]) {
        setPreviewImage(itemImages[key]);
      } else {
        setPreviewImage("/img/sofa-oak-taupe2.jpg");
        console.log("Using default image, key not found:", key);
      }
    };
    updatePreview();
  }, [selectedItem, selectedMaterial, selectedColor, selectedSize, itemImages]);

  const handleSaveDesign = () => {
    const newDesign = {
      id: Date.now(),
      name: itemNames[selectedItem],
      image: previewImage,
      material: selectedMaterial,
      color: selectedColor,
      size: selectedSize,
      price: itemPrices[selectedItem][selectedSize],
    };
    dispatch(saveDesign(newDesign));
    alert("Design saved successfully!");
  };

  const handleAddToCart = () => {
    const newDesign = {
      id: Date.now(),
      name: itemNames[selectedItem],
      image: previewImage,
      material: selectedMaterial,
      color: selectedColor,
      size: selectedSize,
      price: itemPrices[selectedItem][selectedSize],
    };
    dispatch(addToCart(newDesign));
    alert("Design added to cart successfully!");
  };

  return (
    <div className="bg-gray-50 font-sans antialiased min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2016/11/19/13/06/bed-1839184_1280.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Design Your Dream Space
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            Unleash your creativity and craft furniture that's uniquely yours.
          </p>
          <Link
            to="#customizer"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 inline-flex items-center gap-2"
          >
            Start Now
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </section>

      {/* Customizer Section */}
      <section
        id="customizer"
        className="py-16 sm:py-20 bg-gradient-to-br from-gray-100 to-gray-200"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12">
            Create Your Perfect Piece
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Customization Panel */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Customize Your Furniture
              </h3>
              <div className="space-y-8">
                {/* Item Selection */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Select Item
                  </label>
                  <select
                    id="item-select"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none"
                  >
                    <option value="sofa">Elara Three-Seater Sofa</option>
                    <option value="chair">Verona Leather Armchair</option>
                    <option value="table">Rustic Oak Coffee Table</option>
                    <option value="dining">Industrial Dining Table</option>
                  </select>
                </div>

                {/* Material Selection */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Material
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <button
                      id="material-oak"
                      onClick={() => setSelectedMaterial("oak")}
                      className={`option-btn bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 ${
                        selectedMaterial === "oak"

                      }`}
                    >
                      Oak Wood
                    </button>
                    <button
                      id="material-velvet"
                      onClick={() => setSelectedMaterial("velvet")}
                      className={`option-btn bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 ${
                        selectedMaterial === "velvet"
                         
                      }`}
                    >
                      Velvet
                    </button>
                    <button
                      id="material-leather"
                      onClick={() => setSelectedMaterial("leather")}
                      className={`option-btn bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 ${
                        selectedMaterial === "leather"
                      
                      }`}
                    >
                      Leather
                    </button>
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Color
                  </label>
                  <div className="flex gap-4">
                    <div
                      id="color-taupe"
                      onClick={() => setSelectedColor("taupe")}
                      className={`color-swatch w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-600 transition duration-300 ${
                        selectedColor === "taupe" ? "ring-2 ring-blue-600" : ""
                      }`}
                      style={{ backgroundColor: "#8B7D6B" }}
                    />
                    <div
                      id="color-cream"
                      onClick={() => setSelectedColor("cream")}
                      className={`color-swatch w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-600 transition duration-300 ${
                        selectedColor === "cream" ? "ring-2 ring-blue-600" : ""
                      }`}
                      style={{ backgroundColor: "#F5F5DC" }}
                    />
                    <div
                      id="color-gray"
                      onClick={() => setSelectedColor("gray")}
                      className={`color-swatch w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-600 transition duration-300 ${
                        selectedColor === "gray" ? "ring-2 ring-blue-600" : ""
                      }`}
                      style={{ backgroundColor: "#808080" }}
                    />
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <button
                      id="size-small"
                      onClick={() => setSelectedSize("small")}
                      className={`option-btn bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 ${
                        selectedSize === "small"
                      
                      }`}
                    >
                      Small
                    </button>
                    <button
                      id="size-medium"
                      onClick={() => setSelectedSize("medium")}
                      className={`option-btn bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 ${
                        selectedSize === "medium"
                      
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      id="size-large"
                      onClick={() => setSelectedSize("large")}
                      className={`option-btn bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 ${
                        selectedSize === "large"
                      
                      }`}
                    >
                      Large
                    </button>
                  </div>
                </div>
              </div>
              <button
                id="preview-btn"
                onClick={() => {}}
                className="mt-8 w-full bg-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300 inline-flex items-center justify-center gap-2"
              >
                Update Preview
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Panel */}
            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Live Preview
              </h3>
              <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
                <img
                  id="preview-image"
                  src={previewImage}
                  alt="Preview Furniture"
                  className="w-full h-full object-cover rounded-lg transition-all duration-300"
                />
              </div>
              <p
                id="preview-description"
                className="text-gray-600 text-sm text-center mb-4"
              >
                {itemNames[selectedItem]} in{" "}
                {selectedMaterial.charAt(0).toUpperCase() +
                  selectedMaterial.slice(1)}
                {selectedMaterial === "oak" ? " Wood" : ""},{" "}
                {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}{" "}
                color,{" "}
                {selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}{" "}
                size. Estimated Price: $
                {itemPrices[selectedItem][selectedSize].toFixed(2)}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveDesign}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 inline-flex items-center gap-2"
                >
                  Save Design
                  <Save className="w-5 h-5" />
                </button>
                <button
                  onClick={handleAddToCart}
                  className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 inline-flex items-center gap-2"
                >
                  Add to Cart
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12">
            Get Inspired
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <img
                src="img/Bohemian Sectional Sofa.jpg"
                alt="Bohemian Sofa"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-gray-600 text-sm">
                Bohemian Sofa in Velvet Teal, Large
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <img
                src="img/table-oak-cream.webp"
                alt="Industrial Table"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-gray-600 text-sm">
                Industrial Table in Matte Black, Medium
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <img
                src="img/Verona Leather Armchair.jpg"
                alt="Leather Chair"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-gray-600 text-sm">
                Verona Chair in Walnut Leather, Small
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Design;
