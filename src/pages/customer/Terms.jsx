import PolicyPage from "./PolicyPage";

export default function Terms() {
  return (
    <PolicyPage
      title="Terms of Service"
      sections={[
        { heading: "Using KitVibe", body: "By using this site, you agree to browse and purchase products for personal, non-commercial use." },
        { heading: "Orders & Pricing", body: "All prices are listed in USD and may change without notice. We reserve the right to cancel orders placed in error." },
        { heading: "Account Responsibility", body: "You're responsible for maintaining the confidentiality of your account credentials and any activity under your account." },
        { heading: "Intellectual Property", body: "All jersey designs, product photography, and site content are the property of KitVibe and may not be reproduced without permission." },
        { heading: "Limitation of Liability", body: "KitVibe is provided as a demonstration platform and is not liable for any damages arising from its use." },
      ]}
    />
  );
}
