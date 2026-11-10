import { classNames } from "../../utils/format";

const TONES = {
  pitch: "bg-pitch text-ink",
  dark: "bg-ink text-white",
  outline: "border border-ink/20 text-ink",
  outlineLight: "border border-white/30 text-white",
  amber: "bg-amber-400 text-ink",
  red: "bg-red-500 text-white",
  gray: "bg-black/5 text-ink/70",
};

export default function Badge({ tone = "dark", className = "", children }) {
  return (
    <span
      className={classNames(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-pill text-[11px] font-bold uppercase tracking-wide font-mono",
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
