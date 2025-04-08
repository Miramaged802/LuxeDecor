import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  Heart,
  Star,
  Truck,
  Shield,
  ArrowLeft,
  ShoppingCart,
  CreditCard,
  Package,
  Clock,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { addToCart } from "../redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";
import { products } from "../../product";


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [product, setProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState("Standard");
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Ahmed Mohamed",
      rating: 5,
      comment: "Excellent product! Very comfortable and high quality.",
      date: "2024-03-15",
    },
    {
      id: 2,
      name: "Sarah Ali",
      rating: 4,
      comment: "Beautiful design but a bit expensive.",
      date: "2024-03-10",
    },
  ]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    // Find product from local data
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedMaterial(foundProduct.materials?.[0] || "oak");
      setSelectedColor(foundProduct.colors?.[0] || "cream");
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      setIsInWishlist(wishlistItems.some((item) => item.id === product.id));
    }
  }, [product, wishlistItems]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          ...product,
          quantity: selectedQuantity,
          material: selectedMaterial,
          color: selectedColor,
        })
      );
    }
  };

  const toggleWishlist = () => {
    if (product) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id));
      } else {
        dispatch(addToWishlist(product));
      }
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Product not found
          </h2>
          <Link
            to="/shop"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const sizes = ["Standard", "Large", "Extra Large"];

  const handleAddReview = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([...reviews, review]);
    setNewReview({ name: "", rating: 5, comment: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/shop"
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={'/' + product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <button
            onClick={toggleWishlist}
            className={`absolute top-4 right-4 p-2 rounded-full ${
              isInWishlist
                ? "bg-red-50 text-red-500"
                : "bg-white text-gray-600 hover:text-red-500"
            }`}
          >
            <Heart className="w-6 h-6" />
          </button>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-gray-600 ml-2">(42 reviews)</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center">
              <button
                onClick={() =>
                  setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                }
                className="px-3 py-1 border rounded-l-lg hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">
                {selectedQuantity}
              </span>
              <button
                onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                className="px-3 py-1 border rounded-r-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Size</label>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center mb-4"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center text-gray-600">
              <Truck className="w-5 h-5 mr-2" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Shield className="w-5 h-5 mr-2" />
              <span>2 Year Warranty</span>
            </div>
            <div className="flex items-center text-gray-600">
              <CreditCard className="w-5 h-5 mr-2" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Package className="w-5 h-5 mr-2" />
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center text-gray-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Quality Guaranteed</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`py-2 px-4 ${
                    activeTab === "description"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("highlights")}
                  className={`py-2 px-4 ${
                    activeTab === "highlights"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Highlights
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`py-2 px-4 ${
                    activeTab === "care"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Care Instructions
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`py-2 px-4 ${
                    activeTab === "reviews"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </nav>
            </div>

            <div className="mt-4">
              {activeTab === "description" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Product Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              )}
              {activeTab === "highlights" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Product Highlights</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Premium quality materials</li>
                    <li>Modern and elegant design</li>
                    <li>Easy to assemble</li>
                    <li>Comfortable and durable</li>
                    <li>Perfect for any room</li>
                    <li>Stylish and functional</li>
                  </ul>
                </div>
              )}
              {activeTab === "care" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Care Instructions</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Regular dusting with soft cloth</li>
                    <li>Use mild soap for cleaning</li>
                    <li>Avoid direct sunlight</li>
                    <li>Keep away from moisture</li>
                    <li>Professional cleaning recommended</li>
                    <li>Regular maintenance check</li>
                  </ul>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      Customer Reviews ({reviews.length})
                    </h3>
                    <button
                      onClick={() => setShowAddReview(!showAddReview)}
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <span className="text-2xl mr-1">+</span>
                      Add Review
                    </button>
                  </div>

                  {showAddReview && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-4">Add Your Review</h3>
                      <form onSubmit={handleAddReview} className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            value={newReview.name}
                            onChange={(e) =>
                              setNewReview({
                                ...newReview,
                                name: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">
                            Rating
                          </label>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() =>
                                  setNewReview({ ...newReview, rating: star })
                                }
                                className="text-yellow-400"
                              >
                                <Star
                                  className={`w-6 h-6 ${
                                    star <= newReview.rating
                                      ? "fill-current"
                                      : ""
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">
                            Your Review
                          </label>
                          <textarea
                            value={newReview.comment}
                            onChange={(e) =>
                              setNewReview({
                                ...newReview,
                                comment: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded-lg"
                            rows="3"
                            required
                          ></textarea>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setShowAddReview(false)}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                          >
                            Submit Review
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="flex text-yellow-400">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating ? "fill-current" : ""
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 font-semibold">
                              {review.name}
                            </span>
                          </div>
                          <span className="text-gray-500 text-sm">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
