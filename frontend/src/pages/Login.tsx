import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast, { Toaster } from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(form);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);
      await login(form.email, form.password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a3242] to-[#0f6b8a] p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 text-white rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold text-white">
            Welcome Back 👋
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-white/90">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-white/20 border-none text-white placeholder:text-white/70"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-white/90">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="******"
                value={form.password}
                onChange={handleChange}
                required
                className="bg-white/20 border-none text-white placeholder:text-white/70"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-[#0a3242] hover:bg-gray-200 font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-sm text-center text-white/80 mt-3">
              Don’t have an account?{" "}
              <Link to="/register" className="text-white underline font-medium hover:text-gray-200">
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
