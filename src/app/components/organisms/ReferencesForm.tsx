"use client";

import { useResumeStore } from '@/app/store/useResumeStore';
import { FormField } from '../molecules/FormField';

export function ReferencesForm() {
  const references = useResumeStore((state) => state.data.references);
  const updateReferences = useResumeStore((state) => state.updateReferences);

  return (
    <section className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">References</h2>
      <FormField 
        label="References Statement" 
        id="references" 
        value={references} 
        onChange={(e) => updateReferences(e.target.value)} 
      />
    </section>
  );
}