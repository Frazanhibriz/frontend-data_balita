"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise((res) => setTimeout(res, 1000));

      if (email !== "admin@posyandu.id" || password !== "123456") {
        throw new Error("Email atau password salah");
      }

      console.log("LOGIN SUCCESS");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Username / Email"
        type="text"
        placeholder="kader@posyandu.id"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pr-12"
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] p-2 text-gray-400 hover:text-teal-600 transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && (
        <p className="text-sm font-medium text-rose-500 bg-rose-50 p-3 rounded-lg border border-rose-100 italic">
          ⚠️ {error}
        </p>
      )}

      <Button
        type="submit"
        isLoading={loading}
        className="w-full"
      >
        Masuk ke Dashboard
      </Button>

      <div className="flex items-center justify-center gap-2 pt-2">
        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></div>
        <p className="text-xs text-gray-400 font-medium tracking-wide">KHUSUS KADER POSYANDU</p>
      </div>
    </form>
  );
}