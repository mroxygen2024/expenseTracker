import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = registerSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);
      await register(form.name, form.email, form.password);
      navigate("/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a3242] to-[#0f6b8a] p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 text-white rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold text-white">
            Create Account ✨
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-white/90">
                Name
              </label>
              <Input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className="bg-white/20 border-none text-white placeholder:text-white/70"
              />
            </div>

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

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-[#0a3242] hover:bg-gray-200 font-semibold"
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            <p className="text-sm text-center text-white/80 mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-white underline font-medium hover:text-gray-200">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
