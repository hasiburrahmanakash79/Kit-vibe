import { X } from "lucide-react";
import { useOnboarding } from "../../context/OnboardingContext";
import { classNames } from "../../utils/format";

/** A small dismissible inline tip used to guide first-time users. */
export default function CoachMark({ id, text, className = "", position = "top" }) {
  const onboarding = useOnboarding();
  if (!onboarding || onboarding.isTipDismissed(id)) return null;

  const positions = {
    top: "-top-3 left-1/2 -translate-x-1/2 -translate-y-full",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  return (
    <div
      role="status"
      className={classNames(
        "absolute z-30 w-56 bg-ink text-white text-xs rounded-xl px-3.5 py-3 shadow-premium animate-fadeUp",
        positions[position],
        className
      )}
    >
      <div className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-pitch mt-1 shrink-0" />
        <p className="leading-snug flex-1">{text}</p>
        <button
          onClick={() => onboarding.dismissTip(id)}
          aria-label="Dismiss tip"
          className="text-white/40 hover:text-white shrink-0"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
