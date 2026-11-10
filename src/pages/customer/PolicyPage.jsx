import { Breadcrumb } from "../../components/common/Misc";

export default function PolicyPage({ title, sections }) {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: title }]} />
      <h1 className="font-display text-4xl tracking-wide mt-3 mb-10">{title}</h1>
      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-semibold text-base mb-2">{s.heading}</h2>
            <p className="text-sm text-ink/60 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
