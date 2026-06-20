"use client";

import { useResumeStore, Certification } from '@/app/store/useResumeStore';
import { FormField } from '../molecules/FormField';

export function AwardsForm() {
  const awards = useResumeStore((state) => state.data.awards);
  const updateList = useResumeStore((state) => state.updateList);

  const handleAdd = () => {
    // We reuse the Certification type because an award has a name, issuer, and date
    const newAward: Certification = { id: crypto.randomUUID(), name: '', issuer: '', date: '', link: '' };
    updateList('awards', [...awards, newAward]);
  };

  const handleChange = (id: string, field: keyof Certification, value: string) => {
    const updated = awards.map(award => award.id === id ? { ...award, [field]: value } : award);
    updateList('awards', updated);
  };

  const handleRemove = (id: string) => {
    updateList('awards', awards.filter(award => award.id !== id));
  };

  return (
    <section className="p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
        <h2 className="text-xl font-bold text-white">Awards & Achievements</h2>
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
          + Add Award
        </button>
      </div>

      <div className="space-y-6">
        {awards.map((award) => (
          <div key={award.id} className="p-4 border border-gray-700 rounded-md bg-gray-800 relative">
            <button onClick={() => handleRemove(award.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-300 text-sm transition-colors">Remove</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Award Name" id={`name-${award.id}`} placeholder="Employee of the Year" value={award.name} onChange={(e) => handleChange(award.id, 'name', e.target.value)} />
              <FormField label="Awarding Organization" id={`issuer-${award.id}`} placeholder="Tech Corp" value={award.issuer} onChange={(e) => handleChange(award.id, 'issuer', e.target.value)} />
              <FormField label="Date Received" id={`date-${award.id}`} placeholder="Dec 2023" value={award.date} onChange={(e) => handleChange(award.id, 'date', e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}