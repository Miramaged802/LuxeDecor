import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../redux/slices/authSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { removeDesign } from "../redux/slices/designSlice";
import { profileSchema } from "../validation/profileSchema";
import {
  Heart,
  ShoppingCart,
  Trash2,
  User,
  Package,
  Settings,
  LogOut,
  Edit,
  Save,
  X,
  MapPin,
  Palette,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const savedDesigns = useSelector((state) => state.design.savedDesigns);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "profile"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    dateOfBirth: "",
    gender: "",
    profileImage: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      const nameParts = user.name?.split(" ") || [];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setFormData({
        firstName,
        lastName,
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        zipCode: user.zipCode || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      profileSchema.parse(formData);
      dispatch(
        updateUserInfo({
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`,
        })
      );
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
        // Update user info immediately when image is uploaded
        dispatch(
          updateUserInfo({
            ...formData,
            profileImage: reader.result,
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
        My Account
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="relative w-16 h-16 mr-4">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-semibold text-blue-600">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Edit className="w-4 h-4 text-white" />
                </label>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center space-x-2 w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "profile"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profile Information</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center space-x-2 w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "orders"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Package className="w-5 h-5" />
                <span>My Orders</span>
              </button>
              <button
                onClick={() => setActiveTab("saved-designs")}
                className={`flex items-center space-x-2 w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "saved-designs"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Palette className="w-5 h-5" />
                <span>Saved Designs</span>
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`flex items-center space-x-2 w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "wishlist"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Profile Information
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isEditing
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <X className="w-5 h-5" />
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <Edit className="w-5 h-5" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.address ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.city ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.country ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.country}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.zipCode ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        First Name
                      </h3>
                      <p className="text-lg text-gray-900">
                        {formData.firstName}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Last Name
                      </h3>
                      <p className="text-lg text-gray-900">
                        {formData.lastName}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Email
                    </h3>
                    <p className="text-lg text-gray-900">{formData.email}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Phone
                    </h3>
                    <p className="text-lg text-gray-900">{formData.phone}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Address
                      </h3>
                      <p className="text-lg text-gray-900">
                        {formData.address}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        City
                      </h3>
                      <p className="text-lg text-gray-900">{formData.city}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Country
                      </h3>
                      <p className="text-lg text-gray-900">
                        {formData.country}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        ZIP Code
                      </h3>
                      <p className="text-lg text-gray-900">
                        {formData.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Date of Birth
                      </h3>
                      <p className="text-lg text-gray-900">
                        {formData.dateOfBirth
                          ? new Date(formData.dateOfBirth).toLocaleDateString()
                          : "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Gender
                      </h3>
                      <p className="text-lg text-gray-900">
                        {formData.gender
                          ? formData.gender.charAt(0).toUpperCase() +
                            formData.gender.slice(1)
                          : "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <h2 className="text-xl font-semibold text-gray-800 p-6">
                Order History
              </h2>

              {user.orders?.length === 0 ? (
                <div className="p-6 text-center text-gray-600">
                  <p>You haven't placed any orders yet.</p>
                  <Link
                    to="/shop"
                    className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div>
                  {user.orders?.map((order) => (
                    <div key={order.id} className="border-t p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                        <div className="mb-2 sm:mb-0">
                          <span className="font-semibold">
                            Order #{order.id}
                          </span>
                          <span className="text-gray-600 text-sm ml-4">
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                          {order.paymentStatus && (
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                order.paymentStatus === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              Payment: {order.paymentStatus}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2"
                          >
                            <div className="flex items-center space-x-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <div>
                                <span className="text-gray-600">
                                  {item.name} × {item.quantity}
                                </span>
                                <p className="text-sm text-gray-500">
                                  {item.material} - {item.color}
                                </p>
                              </div>
                            </div>
                            <span className="font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between border-t pt-4">
                        <div>
                          <Link
                            to={`/order/${order.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            View Order Details
                          </Link>
                         
                        </div>
                        {order.status !== "Delivered" && (
                          <div className="mt-2 sm:mt-0">
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to cancel this order?"
                                  )
                                ) {
                                  // Remove the order completely instead of just changing status
                                  const updatedOrders = user.orders.filter(
                                    (o) => o.id !== order.id
                                  );
                                  dispatch(
                                    updateUserInfo({
                                      ...user,
                                      orders: updatedOrders,
                                    })
                                  );
                                }
                              }}
                              className="text-red-600 hover:underline"
                            >
                              Cancel Order
                            </button>
                          </div>
                        )}
                        <div className="text-right mt-2 sm:mt-0">
                          <span className="text-gray-600 mr-4">Total:</span>
                          <span className="font-semibold">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "saved-designs" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Saved Designs
              </h2>

              {savedDesigns.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedDesigns.map((design) => (
                    <div
                      key={design.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative h-48">
                        <img
                          src={design.image}
                          alt={design.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {design.name}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Material:</span>{" "}
                            {design.material.charAt(0).toUpperCase() +
                              design.material.slice(1)}
                            {design.material === "oak" ? " Wood" : ""}
                          </p>
                          <p>
                            <span className="font-medium">Color:</span>{" "}
                            {design.color.charAt(0).toUpperCase() +
                              design.color.slice(1)}
                          </p>
                          <p>
                            <span className="font-medium">Size:</span>{" "}
                            {design.size.charAt(0).toUpperCase() +
                              design.size.slice(1)}
                          </p>
                          <p className="font-medium">
                            <span className="font-medium">Price:</span> $
                            {design.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex gap-2">
                            <button
                              onClick={() => dispatch(addToCart(design))}
                              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium inline-flex items-center gap-1 px-4 py-2 rounded-lg transition duration-300"
                            >
                              Add to Cart
                              <ShoppingCart className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => dispatch(removeDesign(design.id))}
                            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium inline-flex items-center gap-1 px-4 py-2 rounded-lg transition duration-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    You haven't saved any designs yet
                  </p>
                  <Link
                    to="/design"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Create New Design
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                My Wishlist
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-blue-600 font-bold mt-2">
                        ${item.price}
                      </p>
                      <div className="mt-4 flex justify-between">
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => dispatch(removeFromWishlist(item.id))}
                          className="text-red-600 hover:text-red-700 transition duration-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
