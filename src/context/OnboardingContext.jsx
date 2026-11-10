import { createContext, useContext } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";

const OnboardingContext = createContext(null);

export function OnboardingProvider({ children }) {
  const [dismissedTips, setDismissedTips] = useLocalStorage("kitvibe_tips_dismissed", []);
  const [tourDone, setTourDone] = useLocalStorage("kitvibe_tour_done", false);

  const dismissTip = (id) => setDismissedTips((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const isTipDismissed = (id) => dismissedTips.includes(id);
  const finishTour = () => setTourDone(true);
  const resetOnboarding = () => {
    setDismissedTips([]);
    setTourDone(false);
  };

  return (
    <OnboardingContext.Provider value={{ dismissTip, isTipDismissed, tourDone, finishTour, resetOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);
