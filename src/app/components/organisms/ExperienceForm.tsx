"use client";

import { useResumeStore, Experience } from '@/app/store/useResumeStore';
import { FormField } from '../molecules/FormField';
import { Textarea } from '../atoms/Textarea';
import { Label } from '../atoms/Label';

export function ExperienceForm() {
  const experienceList = useResumeStore((state) => state.data.experience);
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);

  const handleAdd = () => {
    addExperience({
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-xl font-bold">Professional Experience</h2>
        <button onClick={handleAdd} className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800">
          + Add Experience
        </button>
      </div>

      {experienceList.length === 0 && (
        <p className="text-gray-500 text-sm italic">No experience added yet.</p>
      )}

      <div className="space-y-6">
        {experienceList.map((exp, index) => (
          <div key={exp.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 relative">
            {/* Delete Button */}
            <button 
              onClick={() => removeExperience(exp.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-semibold"
            >
              Remove
            </button>

            <h3 className="font-semibold text-gray-700 mb-4">Role #{index + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField label="Company / Organization" id={`company-${exp.id}`} placeholder="Tech Corp Inc." value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} />
              <FormField label="Position / Title" id={`pos-${exp.id}`} placeholder="Senior Developer" value={exp.position} onChange={(e) => updateExperience(exp.id, { position: e.target.value })} />
              <FormField label="Start Date" id={`start-${exp.id}`} placeholder="Jan 2020" value={exp.startDate} onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} />
              <FormField label="End Date" id={`end-${exp.id}`} placeholder="Present" value={exp.endDate} onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} />
            </div>

            <div className="mb-2">
              <Label htmlFor={`desc-${exp.id}`}>Responsibilities & Achievements (Put each on a new line)</Label>
              <Textarea 
                id={`desc-${exp.id}`} 
                placeholder="- Developed a new web app...&#10;- Increased user retention by 20%..."
                value={exp.description} 
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })} 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}