import { products } from "./products";

const p = (id) => products.find((x) => x.id === id);

const line = (id, size, qty) => {
  const prod = p(id);
  return { productId: id, name: prod.name, image: prod.images[0], size, qty, price: prod.discountPrice || prod.price };
};

export const STATUS_FLOW = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];

export const orders = [
  {
    id: "KV-100231", customer: "Jordan Pike", email: "jordan.pike@example.com", date: "2026-08-05", status: "Delivered",
    payment: "Card", paymentStatus: "Paid", tracking: "KV-TRK-88213",
    address: { line1: "44 Harbor View Rd", city: "Portland", state: "OR", zip: "97205", country: "United States" },
    items: [line("kv-001", "L", 1), line("kv-009", "M", 1)],
    shipping: 0, discount: 10, deliveryEstimate: "2026-08-09",
  },
  {
    id: "KV-100232", customer: "Amara Diallo", email: "amara.diallo@example.com", date: "2026-08-06", status: "Shipped",
    payment: "Mobile Payment", paymentStatus: "Paid", tracking: "KV-TRK-88214",
    address: { line1: "12 Birchwood Ln", city: "Austin", state: "TX", zip: "73301", country: "United States" },
    items: [line("kv-003", "M", 2)],
    shipping: 6.99, discount: 0, deliveryEstimate: "2026-08-11",
  },
  {
    id: "KV-100233", customer: "Theo Marsh", email: "theo.marsh@example.com", date: "2026-08-07", status: "Processing",
    payment: "Cash on Delivery", paymentStatus: "Pending", tracking: "KV-TRK-88215",
    address: { line1: "9 Elmgate Ct", city: "Denver", state: "CO", zip: "80202", country: "United States" },
    items: [line("kv-005", "S", 1), line("kv-017", "M", 1)],
    shipping: 6.99, discount: 15, deliveryEstimate: "2026-08-13",
  },
  {
    id: "KV-100234", customer: "Priya Nair", email: "priya.nair@example.com", date: "2026-08-08", status: "Confirmed",
    payment: "Card", paymentStatus: "Paid", tracking: "KV-TRK-88216",
    address: { line1: "77 Sunset Blvd", city: "San Diego", state: "CA", zip: "92101", country: "United States" },
    items: [line("kv-011", "M", 1)],
    shipping: 0, discount: 0, deliveryEstimate: "2026-08-14",
  },
  {
    id: "KV-100235", customer: "Marcus Boone", email: "marcus.boone@example.com", date: "2026-08-08", status: "Pending",
    payment: "Card", paymentStatus: "Pending", tracking: "KV-TRK-88217",
    address: { line1: "301 Maple Ave", city: "Chicago", state: "IL", zip: "60601", country: "United States" },
    items: [line("kv-007", "L", 1)],
    shipping: 6.99, discount: 0, deliveryEstimate: "2026-08-15",
  },
  {
    id: "KV-100236", customer: "Sofia Reyes", email: "sofia.reyes@example.com", date: "2026-08-04", status: "Delivered",
    payment: "Card", paymentStatus: "Paid", tracking: "KV-TRK-88210",
    address: { line1: "18 Cedar St", city: "Seattle", state: "WA", zip: "98101", country: "United States" },
    items: [line("kv-012", "S", 2), line("kv-020", "M", 1)],
    shipping: 0, discount: 5, deliveryEstimate: "2026-08-08",
  },
  {
    id: "KV-100237", customer: "Owen Fitzgerald", email: "owen.fitzgerald@example.com", date: "2026-08-03", status: "Cancelled",
    payment: "Card", paymentStatus: "Refunded", tracking: "KV-TRK-88209",
    address: { line1: "65 Ridge Rd", city: "Boston", state: "MA", zip: "02108", country: "United States" },
    items: [line("kv-006", "XL", 1)],
    shipping: 6.99, discount: 0, deliveryEstimate: "2026-08-07",
  },
  {
    id: "KV-100238", customer: "Lena Hoffman", email: "lena.hoffman@example.com", date: "2026-08-02", status: "Delivered",
    payment: "Mobile Payment", paymentStatus: "Paid", tracking: "KV-TRK-88208",
    address: { line1: "5 Grovepark Dr", city: "Miami", state: "FL", zip: "33101", country: "United States" },
    items: [line("kv-015", "M", 1)],
    shipping: 0, discount: 0, deliveryEstimate: "2026-08-06",
  },
];

export const orderTotal = (order) => {
  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  return +(subtotal + order.shipping - order.discount).toFixed(2);
};

export const dailySales = [
  { day: "Mon", revenue: 2140, orders: 18 },
  { day: "Tue", revenue: 1890, orders: 15 },
  { day: "Wed", revenue: 2410, orders: 21 },
  { day: "Thu", revenue: 2980, orders: 26 },
  { day: "Fri", revenue: 3560, orders: 31 },
  { day: "Sat", revenue: 4720, orders: 42 },
  { day: "Sun", revenue: 3980, orders: 35 },
];

export const monthlyRevenue = [
  { month: "Feb", revenue: 42100 }, { month: "Mar", revenue: 48900 }, { month: "Apr", revenue: 51200 },
  { month: "May", revenue: 47600 }, { month: "Jun", revenue: 58300 }, { month: "Jul", revenue: 63900 },
  { month: "Aug", revenue: 41250 },
];

export const orderStatusBreakdown = [
  { name: "Pending", value: 12, color: "#F4B740" },
  { name: "Processing", value: 18, color: "#3B82F6" },
  { name: "Shipped", value: 24, color: "#17E06B" },
  { name: "Delivered", value: 96, color: "#0B7A3C" },
  { name: "Cancelled", value: 6, color: "#EF4444" },
];

export const userActivity = [
  { day: "Mon", views: 1240, wishlist: 86, cart: 54, checkout: 22 },
  { day: "Tue", views: 1105, wishlist: 74, cart: 48, checkout: 19 },
  { day: "Wed", views: 1380, wishlist: 92, cart: 61, checkout: 27 },
  { day: "Thu", views: 1620, wishlist: 108, cart: 70, checkout: 33 },
  { day: "Fri", views: 1980, wishlist: 134, cart: 92, checkout: 41 },
  { day: "Sat", views: 2540, wishlist: 176, cart: 121, checkout: 58 },
  { day: "Sun", views: 2210, wishlist: 152, cart: 103, checkout: 49 },
];

export const customerGrowth = [
  { month: "Feb", customers: 320 }, { month: "Mar", customers: 401 }, { month: "Apr", customers: 468 },
  { month: "May", customers: 512 }, { month: "Jun", customers: 601 }, { month: "Jul", customers: 689 },
  { month: "Aug", customers: 742 },
];
