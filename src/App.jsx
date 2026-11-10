import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotificationProvider } from "./context/NotificationContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";

import CustomerLayout from "./components/layout/CustomerLayout";
import AdminLayout from "./components/layout/AdminLayout";

import Home from "./pages/customer/Home";
import Shop from "./pages/customer/Shop";
import ProductDetail from "./pages/customer/ProductDetail";
import Wishlist from "./pages/customer/Wishlist";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSuccess";
import Orders from "./pages/customer/Orders";
import OrderDetail from "./pages/customer/OrderDetail";
import Profile from "./pages/customer/Profile";
import Login from "./pages/customer/Login";
import Register from "./pages/customer/Register";
import ForgotPassword from "./pages/customer/ForgotPassword";
import About from "./pages/customer/About";
import Contact from "./pages/customer/Contact";
import FAQ from "./pages/customer/FAQ";
import ShippingPolicy from "./pages/customer/ShippingPolicy";
import ReturnPolicy from "./pages/customer/ReturnPolicy";
import PrivacyPolicy from "./pages/customer/PrivacyPolicy";
import Terms from "./pages/customer/Terms";
import NotFound from "./pages/customer/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import Customers from "./pages/admin/Customers";
import Reviews from "./pages/admin/Reviews";
import Inventory from "./pages/admin/Inventory";
import Discounts from "./pages/admin/Discounts";
import Coupons from "./pages/admin/Coupons";
import Analytics from "./pages/admin/Analytics";
import Content from "./pages/admin/Content";
import Settings from "./pages/admin/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <OnboardingProvider>
            <CartProvider>
              <WishlistProvider>
                <Routes>
                  <Route element={<CustomerLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/:category" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/:id" element={<OrderDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/shipping-policy" element={<ShippingPolicy />} />
                    <Route path="/return-policy" element={<ReturnPolicy />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  {/* Admin dashboard */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="orders" element={<OrdersAdmin />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="discounts" element={<Discounts />} />
                    <Route path="coupons" element={<Coupons />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="content" element={<Content />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                </Routes>
              </WishlistProvider>
            </CartProvider>
          </OnboardingProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}
