import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Field, Input } from "../../components/common/FormFields";
import Button from "../../components/common/Button";

export default function AdminLogin() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: "admin@kitvibe.com", password: "admin123" } });

  const onSubmit = (data) => {
    const result = auth.login(data.email, data.password);
    if (result.ok && result.admin) navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-charcoal border border-line rounded-card p-8">
        <div className="w-12 h-12 rounded-full bg-pitch/15 text-pitch flex items-center justify-center mx-auto mb-5">
          <ShieldCheck size={22} />
        </div>
        <h1 className="font-display text-2xl text-white tracking-wide text-center">KitVibe Admin</h1>
        <p className="text-white/45 text-sm text-center mt-1 mb-7">Sign in to manage your store</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Email" required error={errors.email?.message}>
            <Input  {...register("email", { required: "Required" })} />
          </Field>
          <Field label="Password" required error={errors.password?.message}>
            <Input type="password" {...register("password", { required: "Required" })} />
          </Field>
          <Button type="submit" full size="lg">Sign In</Button>
        </form>
        <p className="text-center text-xs text-white/30 mt-6">Demo credentials are pre-filled.</p>
      </div>
    </div>
  );
}
