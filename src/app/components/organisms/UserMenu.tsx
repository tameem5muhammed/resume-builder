"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { useResumeStore } from "@/app/store/useResumeStore"; // 1. Import the store

export function UserMenu() {
  const { data: session, status } = useSession();
  const resetResume = useResumeStore((state) => state.resetResume); // 2. Grab the reset function

  const handleSignOut = async () => {
    // 3. Wipe the local storage clean!
    resetResume();
    // 4. Then securely log out via NextAuth
    await signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (session && session.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">
          {session.user.email}
        </span>
        <button
          onClick={handleSignOut} // 5. Use the new custom sign-out function
          className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  // When logged out, show both Sign In and Sign Up options
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => signIn()}
        className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors"
      >
        Sign In
      </button>
      <Link
        href="/register"
        className="px-4 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors shadow-sm"
      >
        Sign Up
      </Link>
    </div>
  );
}