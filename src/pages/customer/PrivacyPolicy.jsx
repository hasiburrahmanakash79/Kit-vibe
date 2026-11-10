import PolicyPage from "./PolicyPage";

export default function PrivacyPolicy() {
  return (
    <PolicyPage
      title="Privacy Policy"
      sections={[
        { heading: "Information We Collect", body: "We collect the information you provide at checkout or account creation, including name, email, shipping address, and order history." },
        { heading: "How We Use It", body: "We use your information to fulfill orders, provide customer support, and — with your consent — send updates about new drops and offers." },
        { heading: "Data Storage", body: "This demo application stores your cart, wishlist, and account information locally in your browser and does not transmit it to a server." },
        { heading: "Your Choices", body: "You can update your notification preferences anytime from your Profile, and request account deletion by contacting support." },
        { heading: "Cookies", body: "We use essential cookies to keep you signed in and remember your cart across visits." },
      ]}
    />
  );
}
