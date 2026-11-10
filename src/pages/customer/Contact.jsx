import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin } from "lucide-react";
import { Field, Input, Textarea } from "../../components/common/FormFields";
import Button from "../../components/common/Button";
import { Breadcrumb } from "../../components/common/Misc";
import { useNotification } from "../../context/NotificationContext";

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const notification = useNotification();

  const onSubmit = () => {
    notification?.success("We'll get back to you within one business day.", { title: "Message sent" });
    reset();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <h1 className="font-display text-4xl tracking-wide mt-3 mb-10">Get in Touch</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-6">
          {[
            { icon: Mail, label: "Email", value: "support@kitvibe.com" },
            { icon: Phone, label: "Phone", value: "+1 (800) 555-0134" },
            { icon: MapPin, label: "Studio", value: "142 Pitchside Ave, Portland, OR" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-pitch/15 text-pitch-dark flex items-center justify-center shrink-0">
                <c.icon size={17} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-ink/40">{c.label}</p>
                <p className="text-sm">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name" required error={errors.name?.message}>
              <Input {...register("name", { required: "Required" })} />
            </Field>
            <Field label="Email" required error={errors.email?.message}>
              <Input type="email" {...register("email", { required: "Required" })} />
            </Field>
          </div>
          <Field label="Subject" required error={errors.subject?.message}>
            <Input {...register("subject", { required: "Required" })} />
          </Field>
          <Field label="Message" required error={errors.message?.message}>
            <Textarea rows={5} {...register("message", { required: "Required" })} />
          </Field>
          <Button type="submit">Send Message</Button>
        </form>
      </div>
    </div>
  );
}
