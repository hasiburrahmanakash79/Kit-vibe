import PolicyPage from "./PolicyPage";

export default function ShippingPolicy() {
  return (
    <PolicyPage
      title="Shipping Policy"
      sections={[
        { heading: "Processing Time", body: "Orders are processed within 1–2 business days of purchase before they ship." },
        { heading: "Standard Delivery", body: "Standard shipping takes 4–6 business days and is free on orders over $100, or $6.99 otherwise." },
        { heading: "Express Delivery", body: "Express shipping arrives in 1–2 business days for a flat rate of $14.99." },
        { heading: "International Shipping", body: "We ship to over 40 countries. Delivery times and customs fees vary by destination and are calculated at checkout." },
        { heading: "Order Tracking", body: "Once your order ships, you'll receive a tracking number by email and can follow progress from your Orders page." },
      ]}
    />
  );
}
