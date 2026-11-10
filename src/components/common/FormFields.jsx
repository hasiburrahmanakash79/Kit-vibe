import { classNames } from "../../utils/format";

const base =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 transition-colors focus:outline-none focus:ring-2 focus:ring-pitch/40";

export function Field({ label, error, hint, children, required }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink/60 mb-1.5">
          {label} {required && <span className="text-pitch-dark">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink/40">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

export function Input({ error, className = "", dark, ...props }) {
  return (
    <input
      className={classNames(
        base,
        error ? "border-red-400" : dark ? "border-white/15 bg-black text-white placeholder:text-white/30" : "border-black/10",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ error, className = "", dark, ...props }) {
  return (
    <textarea
      className={classNames(
        base,
        "resize-none",
        error ? "border-red-400" : dark ? "border-white/15 bg-graphite text-white placeholder:text-white/30" : "border-black/10",
        className
      )}
      {...props}
    />
  );
}

export function Select({ error, className = "", dark, children, ...props }) {
  return (
    <select
      className={classNames(
        base,
        "appearance-none bg-no-repeat bg-[right_1rem_center]",
        error ? "border-red-400" : dark ? "border-white/15 bg-graphite text-white" : "border-black/10",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Checkbox({ label, className = "", ...props }) {
  return (
    <label className={classNames("flex items-center gap-2 text-sm text-ink/70 cursor-pointer select-none", className)}>
      <input type="checkbox" className="w-4 h-4 rounded accent-pitch" {...props} />
      {label}
    </label>
  );
}
