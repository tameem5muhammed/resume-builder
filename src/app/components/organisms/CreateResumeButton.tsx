"use client";

import { useRouter } from "next/navigation";
import { useResumeStore } from "@/app/store/useResumeStore";

export function CreateResumeButton() {
  const router = useRouter();
  const resetResume = useResumeStore((state) => state.resetResume);

  const handleCreate = () => {
    // 1. Wipe the local storage clean
    resetResume();
    
    // 2. Send the user to the builder
    router.push("/");
  };

  return (
    <button
      onClick={handleCreate}
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-md transition-colors"
    >
      + Create New Resume
    </button>
  );
}