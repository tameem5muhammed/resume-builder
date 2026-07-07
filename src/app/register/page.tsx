"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { registerUser } from "@/app/actions/authActions";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. Call our Server Action to create the user
      const result = await registerUser(formData);

      if (!result.success) {
        setError(result.error || "Failed to register");
        setIsLoading(false);
        return;
      }

      // 2. Automatically log them in with NextAuth if registration succeeds
      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError("Account created, but failed to log in automatically.");
        setIsLoading(false);
      } else {
        // 3. Redirect back to the builder
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">Create an Account</h1>
          <p className="text-gray-400 mt-2 text-sm">Save your resumes securely to the cloud</p>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-900 text-red-400 p-3 rounded-md mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name (Optional)</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-950 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gray-950 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-gray-950 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 rounded-md text-white font-bold transition-colors ${
              isLoading ? "bg-blue-800 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400 border-t border-gray-800 pt-6">
          Already have an account?{" "}
          <button 
            onClick={() => signIn()} 
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}