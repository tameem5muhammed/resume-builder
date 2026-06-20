"use client";

import { useResumeStore, Experience } from '@/app/store/useResumeStore';
import { FormField } from '../molecules/FormField';
import { Textarea } from '../atoms/Textarea';
import { Label } from '../atoms/Label';

export function VolunteerForm() {
  const volunteerList = useResumeStore((state) => state.data.volunteer);
  const updateList = useResumeStore((state) => state.updateList);

  const handleAdd = () => {
    const newVol: Experience = { id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', description: '' };
    updateList('volunteer', [...volunteerList, newVol]);
  };

  const updateItem = (id: string, field: keyof Experience, value: string) => {
    updateList('volunteer', volunteerList.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: string) => {
    updateList('volunteer', volunteerList.filter(item => item.id !== id));
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-xl font-bold">Volunteer & Community Service</h2>
        <button onClick={handleAdd} className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md">+ Add Role</button>
      </div>

      <div className="space-y-6">
        {volunteerList.map((vol) => (
          <div key={vol.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 relative">
            <button onClick={() => removeItem(vol.id)} className="absolute top-4 right-4 text-red-500 text-sm">Remove</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField label="Organization" id={`org-${vol.id}`} value={vol.company} onChange={(e) => updateItem(vol.id, 'company', e.target.value)} />
              <FormField label="Role" id={`role-${vol.id}`} value={vol.position} onChange={(e) => updateItem(vol.id, 'position', e.target.value)} />
              <FormField label="Start Date" id={`start-${vol.id}`} value={vol.startDate} onChange={(e) => updateItem(vol.id, 'startDate', e.target.value)} />
              <FormField label="End Date" id={`end-${vol.id}`} value={vol.endDate} onChange={(e) => updateItem(vol.id, 'endDate', e.target.value)} />
            </div>
            <div className="mb-2">
              <Label htmlFor={`desc-${vol.id}`}>Things Done (Put each on a new line)</Label>
              <Textarea id={`desc-${vol.id}`} value={vol.description} onChange={(e) => updateItem(vol.id, 'description', e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}