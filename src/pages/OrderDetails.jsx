import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";

const OrderDetails = () => {
  const { id } = useParams();
  const orders = useSelector((state) => state.auth.user?.orders || []);

  const order = orders.find((order) => order.id === parseInt(id));

  if (!order) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Order Not Found
          </h1>
          <Link
            to="/profile"
            className="text-blue-600 hover:underline flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          to="/profile"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to Profile
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Order #{order.id}
              </h1>
              <p className="text-gray-600 mt-1">
                Placed on {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2 flex-wrap">
              <span
                className={`px-4 py-2 rounded-full text-sm ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {order.status || "Processing"}
              </span>
              {order.paymentStatus && (
                <span
                  className={`px-4 py-2 rounded-full text-sm ${
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
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Items */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center border-b pb-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-md mr-4 overflow-hidden flex items-center justify-center">
                      <img
                        // eslint-disable-next-line no-constant-binary-expression
                        src={`/${item.image}` || "/img/placeholder.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/img/placeholder.jpg";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-500">
                        {item.material} - {item.color}
                      </p>
                      <p className="text-gray-900 font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Payment Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Shipping & Payment
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    Shipping Address
                  </h3>
                  <div className="text-gray-600">
                    <p>
                      {order.shippingAddress.firstName}{" "}
                      {order.shippingAddress.lastName}
                    </p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                    <p>{order.shippingAddress.phone}</p>
                    <p>{order.shippingAddress.email}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    Payment Method
                  </h3>
                  <p className="text-gray-600">
                    {order.paymentMethodDisplay ||
                      order.paymentMethod
                        ?.replace(/-/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                  {order.paymentStatus && (
                    <div className="mt-2">
                      <h3 className="font-medium text-gray-800 mb-2">
                        Payment Status
                      </h3>
                      <p
                        className={`text-${
                          order.paymentStatus === "Completed"
                            ? "green"
                            : "yellow"
                        }-600`}
                      >
                        {order.paymentStatus}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ${(order.total - 49.99 - order.total * 0.08).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">$49.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">
                        ${(order.total * 0.08).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold text-gray-800">Total</span>
                      <span className="font-bold text-lg text-blue-600">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
