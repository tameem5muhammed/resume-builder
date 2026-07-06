"use client";

import { useResumeStore } from "@/app/store/useResumeStore";
import { FormField } from "../molecules/FormField";

export function FooterForm() {
  const footer = useResumeStore((state) => state.data.footer);
  const updateFooter = useResumeStore((state) => state.updateFooter);

  return (
    <section className="p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
      <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2 text-white">Footer</h2>
      <FormField
        label="Custom Footer Text (Optional)"
        id="footer"
        placeholder="Jane Doe | jane@example.com | Page 1"
        value={footer || ""}
        onChange={(e) => updateFooter(e.target.value)}
      />
    </section>
  );
}