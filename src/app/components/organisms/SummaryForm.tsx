"use client";

import { useResumeStore } from "@/app/store/useResumeStore";
import { FormField } from "../molecules/FormField";
import { Textarea } from "../atoms/Textarea";
import { Label } from "../atoms/Label";

export function SummaryForm() {
  const summary = useResumeStore((state) => state.data.summary);
  const updateSummary = useResumeStore((state) => state.updateSummary);

  return (
    <section className="p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
      <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2 text-white">Professional Summary</h2>
      
      <div className="mb-4">
        <FormField
          label="Section Title (e.g., Summary, Objective, Profile)"
          id="summary-title"
          placeholder="Professional Summary"
          value={summary?.title || ""}
          onChange={(e) => updateSummary({ ...summary, title: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="summary-content">Summary Content</Label>
        <Textarea
          id="summary-content"
          placeholder="Experienced professional with a track record of..."
          value={summary?.content || ""}
          onChange={(e) => updateSummary({ ...summary, content: e.target.value })}
        />
      </div>
    </section>
  );
}