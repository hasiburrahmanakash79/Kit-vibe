import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Breadcrumb } from "../../components/common/Misc";
import { classNames } from "../../utils/format";

const FAQS = [
  { q: "How do I find my size?", a: "Check the Size Guide on any product page — it lists chest and length measurements for XS through XXL. If you're between sizes, we recommend sizing up for a relaxed fit." },
  { q: "How long does shipping take?", a: "Standard delivery takes 4–6 business days. Express delivery arrives in 1–2 business days. Orders over $100 ship free." },
  { q: "Can I return a jersey?", a: "Yes — unworn jerseys with tags attached can be returned within 30 days of delivery for a full refund." },
  { q: "Are the jerseys authentic replicas?", a: "Every KitVibe jersey is produced with match-grade fabric and faithful crest and sponsor detailing." },
  { q: "Do you ship internationally?", a: "We currently ship to over 40 countries. Shipping costs and timelines are calculated at checkout based on your address." },
  { q: "How do I track my order?", a: "Once your order ships, visit Orders in your account and select the order to see live tracking status." },
  { q: "What payment methods do you accept?", a: "We accept Cash on Delivery, major credit and debit cards, and mobile payment options at checkout." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <h1 className="font-display text-4xl tracking-wide mt-3 mb-10">Frequently Asked Questions</h1>
      <div className="divide-y divide-black/8 border-t border-b border-black/8">
        {FAQS.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <span className="font-semibold text-sm">{f.q}</span>
              <ChevronDown size={17} className={classNames("transition-transform text-ink/40 shrink-0", open === i && "rotate-180")} />
            </button>
            {open === i && <p className="text-sm text-ink/60 leading-relaxed pb-5 pr-8">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
