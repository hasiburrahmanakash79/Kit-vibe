import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MailCheck } from "lucide-react";
import { Field, Input } from "../../components/common/FormFields";
import Button from "../../components/common/Button";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  if (sent) {
    return (
      <div className="max-w-sm mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-pitch/15 flex items-center justify-center mx-auto mb-5">
          <MailCheck size={26} className="text-pitch-dark" />
        </div>
        <h1 className="font-display text-3xl tracking-wide">Check Your Inbox</h1>
        <p className="text-sm text-ink/50 mt-3">We've sent password reset instructions to <strong>{getValues("email")}</strong>.</p>
        <Button as={Link} to="/login" className="mt-8">Back to Login</Button>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16 md:py-24">
      <h1 className="font-display text-4xl tracking-wide text-center">Reset Password</h1>
      <p className="text-center text-ink/50 text-sm mt-2 mb-8">Enter your email and we'll send you reset instructions.</p>
      <form onSubmit={handleSubmit(() => setSent(true))} className="space-y-4">
        <Field label="Email" required error={errors.email?.message}>
          <Input type="email" placeholder="you@example.com" {...register("email", { required: "Email is required" })} />
        </Field>
        <Button type="submit" full size="lg">Send Reset Link</Button>
      </form>
      <p className="text-center text-sm text-ink/50 mt-8">
        Remembered your password? <Link to="/login" className="text-pitch-dark font-semibold hover:underline">Login</Link>
      </p>
    </div>
  );
}
