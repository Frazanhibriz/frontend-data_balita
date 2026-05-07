"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

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
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Email */}
      <div>
        <label className="text-sm text-black">Username / Email</label>
        <input
          type="text"
          placeholder="kader@posyandu.id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-3 rounded-lg border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Password */}
      <div>
        <label className="text-sm text-black">Password</label>
        <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Image 
              src="/icons/eye.png" 
              alt="Show Password" 
              width={20} 
              height={20} 
              className={`transition-opacity duration-200 ${showPassword ? 'opacity-100' : 'opacity-50'}`}
            />
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? "Loading..." : "Masuk"}
      </button>

      {/* Footer Note */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
        <p className="text-sm text-gray-500 font-medium">Khusus kader posyandu</p>
      </div>
    </form>
  );
}