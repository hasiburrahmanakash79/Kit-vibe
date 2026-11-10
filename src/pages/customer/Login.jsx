import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Field, Input, Checkbox } from "../../components/common/FormFields";
import Button from "../../components/common/Button";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const result = auth.login(data.email, data.password);
    if (result.ok) {
      navigate(result.admin ? "/admin" : location.state?.from?.pathname || "/");
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-16 md:py-24">
      <h1 className="font-display text-4xl tracking-wide text-center">Welcome Back</h1>
      <p className="text-center text-ink/50 text-sm mt-2 mb-8">Sign in to track orders and manage your wishlist.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Email" required error={errors.email?.message}>
          <Input type="email" placeholder="you@example.com" {...register("email", { required: "Email is required" })} />
        </Field>
        <Field label="Password" required error={errors.password?.message}>
          <Input type="password" placeholder="••••••••" {...register("password", { required: "Password is required" })} />
        </Field>
        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" {...register("remember")} />
          <Link to="/forgot-password" className="text-xs font-semibold text-pitch-dark hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" full size="lg">Login</Button>
      </form>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/10" /></div>
        <span className="relative bg-paper px-3 text-xs text-ink/40">or</span>
      </div>

      <Button full variant="outline" onClick={() => { auth.loginAsGuest(); navigate("/"); }}>
        Continue as Guest
      </Button>

      <p className="text-center text-sm text-ink/50 mt-8">
        Don't have an account? <Link to="/register" className="text-pitch-dark font-semibold hover:underline">Register</Link>
      </p>
      <p className="text-center text-xs text-ink/35 mt-3">Demo login: demo@kitvibe.com / kitvibe123 · Admin: admin@kitvibe.com / admin123</p>
    </div>
  );
}
