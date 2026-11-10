import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Field, Input, Checkbox } from "../../components/common/FormFields";
import Button from "../../components/common/Button";

export default function Register() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const result = auth.register({ name: data.name, email: data.email });
    if (result.ok) navigate("/");
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-16 md:py-24">
      <h1 className="font-display text-4xl tracking-wide text-center">Join KitVibe</h1>
      <p className="text-center text-ink/50 text-sm mt-2 mb-8">Create an account to save jerseys and speed through checkout.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Full Name" required error={errors.name?.message}>
          <Input {...register("name", { required: "Full name is required" })} />
        </Field>
        <Field label="Email" required error={errors.email?.message}>
          <Input type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } })} />
        </Field>
        <Field label="Phone" required error={errors.phone?.message}>
          <Input type="tel" {...register("phone", { required: "Phone number is required" })} />
        </Field>
        <Field label="Password" required error={errors.password?.message}>
          <Input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })} />
        </Field>
        <Field label="Confirm Password" required error={errors.confirm?.message}>
          <Input type="password" {...register("confirm", { required: "Please confirm your password", validate: (v) => v === watch("password") || "Passwords don't match" })} />
        </Field>
        <Checkbox label="I agree to the Terms & Privacy Policy" required />
        <Button type="submit" full size="lg">Create Account</Button>
      </form>

      <p className="text-center text-sm text-ink/50 mt-8">
        Already have an account? <Link to="/login" className="text-pitch-dark font-semibold hover:underline">Login</Link>
      </p>
    </div>
  );
}
