import { useOutletContext, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdminHeader from "../../components/layout/AdminHeader";
import { Field, Input, Textarea } from "../../components/common/FormFields";
import Button from "../../components/common/Button";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useNotification } from "../../context/NotificationContext";

const DEFAULT_CONTENT = {
  heroTitle: "WEAR THE GAME.",
  heroDescription: "Premium football jerseys for fans who live the sport.",
  heroCta: "Shop Jerseys",
  featuredTitle: "THE 2026 COLLECTION",
  featuredSubtitle: "Built for the fans.",
  newsletterTitle: "Never Miss a Drop",
  newsletterText: "Sign up for match-day releases, restocks, and member-only offers.",
};

export default function Content() {
  const { setMobileOpen, titles } = useOutletContext();
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] || ["Content", ""];
  const [content, setContent] = useLocalStorage("kitvibe_homepage_content", DEFAULT_CONTENT);
  const notification = useNotification();
  const { register, handleSubmit } = useForm({ values: content });

  const save = (data) => {
    setContent(data);
    notification?.success("Homepage content updated.");
  };

  return (
    <div>
      <AdminHeader title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} />
      <div className="p-5 md:p-8 max-w-2xl">
        <p className="text-sm text-ink/50 mb-6">
          Changes here are saved locally and reflect the copy KitVibe would show on the homepage hero, featured collection, and newsletter sections.
        </p>
        <form onSubmit={handleSubmit(save)} className="space-y-8">
          <div className="bg-white border border-black/8 rounded-card p-6 space-y-4">
            <h3 className="font-semibold text-sm">Hero Section</h3>
            <Field label="Hero Title"><Input {...register("heroTitle")} /></Field>
            <Field label="Hero Description"><Textarea rows={2} {...register("heroDescription")} /></Field>
            <Field label="CTA Text"><Input {...register("heroCta")} /></Field>
          </div>
          <div className="bg-white border border-black/8 rounded-card p-6 space-y-4">
            <h3 className="font-semibold text-sm">Featured Collection</h3>
            <Field label="Title"><Input {...register("featuredTitle")} /></Field>
            <Field label="Subtitle"><Input {...register("featuredSubtitle")} /></Field>
          </div>
          <div className="bg-white border border-black/8 rounded-card p-6 space-y-4">
            <h3 className="font-semibold text-sm">Newsletter</h3>
            <Field label="Title"><Input {...register("newsletterTitle")} /></Field>
            <Field label="Description"><Textarea rows={2} {...register("newsletterText")} /></Field>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </div>
    </div>
  );
}
