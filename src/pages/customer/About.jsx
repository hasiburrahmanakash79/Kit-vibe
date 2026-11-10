import { Breadcrumb } from "../../components/common/Misc";
import { Award, Users, Globe, Leaf } from "lucide-react";

const STATS = [
  { label: "Founded", value: "2019" },
  { label: "Countries Shipped", value: "42" },
  { label: "Jerseys Sold", value: "180K+" },
  { label: "Avg. Rating", value: "4.7/5" },
];

export default function About() {
  return (
    <div>
      <section className="bg-ink text-white py-20 text-center px-4">
        <p className="text-xs font-mono uppercase tracking-widest text-pitch mb-3">Our Story</p>
        <h1 className="font-display text-4xl md:text-6xl tracking-wide">WEAR THE GAME. LIVE THE VIBE.</h1>
        <p className="text-white/60 max-w-xl mx-auto mt-5 text-sm md:text-base">
          KitVibe started as a matchday ritual between friends and grew into a home for fans who take their kits as seriously as the final score.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="font-display text-4xl tracking-wide">{s.value}</p>
            <p className="text-xs text-ink/45 uppercase tracking-wide mt-1">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-6 py-16 space-y-6 text-ink/65 leading-relaxed text-sm">
        <p>
          Every jersey in the KitVibe catalog is chosen for the story behind it — a club's badge, a nation's colors, a player's number.
          We work with fabric mills that specialize in performance sportswear to make sure what you wear on the terrace holds up to
          match-day energy.
        </p>
        <p>
          Our small team is scattered across time zones but united by one thing: we watch football religiously, and we believe the
          right kit makes the moment feel bigger. Thanks for being part of it.
        </p>
      </section>

      <section className="bg-black/[0.03] py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Award, title: "Craft First", text: "Match-grade fabric and construction in every kit." },
            { icon: Users, title: "Fan Owned", text: "Built by supporters, for supporters." },
            { icon: Globe, title: "Worldwide", text: "Shipping to fans in 42 countries and counting." },
            { icon: Leaf, title: "Responsible", text: "Recycled fabrics wherever we can source them." },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-card p-6 border border-black/8">
              <v.icon size={20} className="text-pitch-dark mb-3" />
              <h3 className="font-semibold text-sm mb-1">{v.title}</h3>
              <p className="text-xs text-ink/55 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
