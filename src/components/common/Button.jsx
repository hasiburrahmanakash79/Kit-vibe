import { classNames } from "../../utils/format";

const VARIANTS = {
  primary: "bg-pitch text-ink hover:bg-pitch-dark hover:text-white shadow-glow",
  dark: "bg-ink text-white hover:bg-graphite",
  outline: "bg-transparent border border-ink/20 text-ink hover:border-ink",
  outlineLight: "bg-transparent border border-white/25 text-white hover:border-white",
  ghost: "bg-transparent text-ink hover:bg-black/5",
  ghostLight: "bg-transparent text-white hover:bg-white/10",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const SIZES = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-sm tracking-wide",
};

export default function Button({
  as: Comp = "button",
  variant = "primary",
  size = "md",
  className = "",
  icon,
  iconRight,
  full,
  ...props
}) {
  return (
    <Comp
      className={classNames(
        "inline-flex items-center justify-center gap-2 font-semibold rounded-pill transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap",
        VARIANTS[variant],
        SIZES[size],
        full && "w-full",
        className
      )}
      {...props}
    >
      {icon}
      {props.children}
      {iconRight}
    </Comp>
  );
}
