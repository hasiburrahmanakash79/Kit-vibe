export default function ChartCard({ title, subtitle, action, children, className = "" }) {
  return (
    <div className={`bg-white border border-black/8 rounded-card p-5 md:p-6 ${className}`}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          {subtitle && <p className="text-xs text-ink/45 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
