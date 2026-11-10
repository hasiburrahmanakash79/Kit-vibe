import PolicyPage from "./PolicyPage";

export default function ReturnPolicy() {
  return (
    <PolicyPage
      title="Return Policy"
      sections={[
        { heading: "30-Day Returns", body: "Unworn jerseys with original tags attached can be returned within 30 days of delivery for a full refund." },
        { heading: "How to Start a Return", body: "Visit your Orders page, select the order, and choose Start a Return. We'll email a prepaid shipping label." },
        { heading: "Refund Timing", body: "Refunds are issued to your original payment method within 5–7 business days of us receiving your return." },
        { heading: "Non-Returnable Items", body: "Player-issue jerseys with custom name and number printing are final sale unless defective." },
        { heading: "Exchanges", body: "Need a different size? Start a return and place a new order — this is usually faster than a direct exchange." },
      ]}
    />
  );
}
