"use client";

import { useResumeStore, Experience } from '@/app/store/useResumeStore';
import { FormField } from '../molecules/FormField';
import { Textarea } from '../atoms/Textarea';
import { Label } from '../atoms/Label';

export function LeadershipForm() {
  const leadershipList = useResumeStore((state) => state.data.leadership);
  const updateList = useResumeStore((state) => state.updateList);

  const handleAdd = () => {
    const newRole: Experience = { 
      id: crypto.randomUUID(), 
      company: '', 
      position: '', 
      startDate: '', 
      endDate: '', 
      description: '' 
    };
    updateList('leadership', [...leadershipList, newRole]);
  };

  const updateItem = (id: string, field: keyof Experience, value: string) => {
    updateList('leadership', leadershipList.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    updateList('leadership', leadershipList.filter(item => item.id !== id));
  };

  return (
    <section className="p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
        <h2 className="text-xl font-bold text-white">Leadership & Extracurriculars</h2>
        <button 
          onClick={handleAdd} 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
        >
          + Add Role
        </button>
      </div>

      <div className="space-y-6">
        {leadershipList.map((item) => (
          <div key={item.id} className="p-4 border border-gray-700 rounded-md bg-gray-800 relative">
            <button 
              onClick={() => removeItem(item.id)} 
              className="absolute top-4 right-4 text-red-400 hover:text-red-300 text-sm font-semibold transition-colors"
            >
              Remove
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField 
                label="Organization / Club" 
                id={`org-${item.id}`} 
                placeholder="Student Council"
                value={item.company} 
                onChange={(e) => updateItem(item.id, 'company', e.target.value)} 
              />
              <FormField 
                label="Role / Office" 
                id={`role-${item.id}`} 
                placeholder="President"
                value={item.position} 
                onChange={(e) => updateItem(item.id, 'position', e.target.value)} 
              />
              <FormField 
                label="Start Date" 
                id={`start-${item.id}`} 
                placeholder="Sep 2021"
                value={item.startDate} 
                onChange={(e) => updateItem(item.id, 'startDate', e.target.value)} 
              />
              <FormField 
                label="End Date" 
                id={`end-${item.id}`} 
                placeholder="May 2022"
                value={item.endDate} 
                onChange={(e) => updateItem(item.id, 'endDate', e.target.value)} 
              />
            </div>
            <div className="mb-2">
              <Label htmlFor={`desc-${item.id}`}>Things Done (Put each on a new line)</Label>
              <Textarea 
                id={`desc-${item.id}`} 
                placeholder="- Organized a campus-wide event...&#10;- Managed a budget of $5,000..."
                value={item.description} 
                onChange={(e) => updateItem(item.id, 'description', e.target.value)} 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}