import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useOnboarding } from "../../context/OnboardingContext";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { Shirt, Heart, Sparkles } from "lucide-react";

export default function CustomerLayout() {
  const { pathname } = useLocation();
  const onboarding = useOnboarding();
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (onboarding && !onboarding.tourDone && pathname === "/") {
      const t = setTimeout(() => setWelcomeOpen(true), 900);
      return () => clearTimeout(t);
    }
  }, [onboarding, pathname]);

  const closeWelcome = (skip) => {
    setWelcomeOpen(false);
    onboarding?.finishTour();
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      <Modal open={welcomeOpen} onClose={() => closeWelcome(true)} title="Welcome to KitVibe" size="sm">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-pitch/15 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="text-pitch" />
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            Quick tour: tap the <Heart size={13} className="inline text-pitch -mt-0.5" /> heart to save jerseys, use the size
            guide before checkout, and hover any product photo to zoom in on the detail. You can skip this anytime.
          </p>
          <div className="flex flex-col gap-2">
            <Button full onClick={() => closeWelcome(false)}>
              <Shirt size={16} /> Start Exploring
            </Button>
            <Button full variant="ghostLight" onClick={() => closeWelcome(true)}>
              Skip
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
