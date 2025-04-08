import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Collections from "./pages/Collections";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import WhyUs from "./pages/WhyUs";
import Design from "./pages/Design";
import OrderDetails from "./pages/OrderDetails";
import Auth from "./pages/Auth";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AppLayout = ({ children, showNavbar = true }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar />}
      {children}
      {showNavbar && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/collections"
            element={
              <AppLayout>
                <Collections />
              </AppLayout>
            }
          />
          <Route
            path="/why-us"
            element={
              <AppLayout>
                <WhyUs />
              </AppLayout>
            }
          />
          <Route
            path="/shop"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Shop />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <AppLayout>
                  <ProductDetails />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Cart />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/design"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Design />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Profile />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Checkout />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <PrivateRoute>
                <AppLayout>
                  <OrderDetails />
                </AppLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
