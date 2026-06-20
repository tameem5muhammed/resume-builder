"use client";

import { useResumeStore, Education } from '@/app/store/useResumeStore';
import { FormField } from '../molecules/FormField';

export function EducationForm() {
  const educationList = useResumeStore((state) => state.data.education);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);

  // Function to add a new empty education block
  const handleAdd = () => {
    const newSchool: Education = {
      id: crypto.randomUUID(), // Generates a unique ID
      school: '',
      major: '',
      type: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    addEducation(newSchool);
  };

  // Function to handle typing in a specific education block
  const handleChange = (id: string, field: keyof Education, value: string) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <section className="p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
        <h2 className="text-xl font-bold text-white">Education</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          + Add School
        </button>
      </div>

      {educationList.length === 0 && (
        <p className="text-gray-400 text-sm italic">No education added yet. Click "+ Add School" to start.</p>
      )}

      <div className="space-y-6">
        {educationList.map((edu, index) => (
          <div key={edu.id} className="p-4 border border-gray-700 rounded-md bg-gray-800">
            <h3 className="font-semibold text-gray-300 mb-4">School #{index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="School / University"
                id={`school-${edu.id}`}
                placeholder="University of Technology"
                value={edu.school}
                onChange={(e) => handleChange(edu.id, 'school', e.target.value)}
              />
              <FormField
                label="Degree / Major"
                id={`major-${edu.id}`}
                placeholder="BSc Computer Science"
                value={edu.major}
                onChange={(e) => handleChange(edu.id, 'major', e.target.value)}
              />
              <FormField
                label="Start Date"
                id={`start-${edu.id}`}
                placeholder="Sep 2018"
                value={edu.startDate}
                onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
              />
              <FormField
                label="End Date"
                id={`end-${edu.id}`}
                placeholder="Jun 2022"
                value={edu.endDate}
                onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
              />
              <FormField
                label="GPA / CGPA"
                id={`gpa-${edu.id}`}
                placeholder="3.8 / 4.0"
                value={edu.gpa}
                onChange={(e) => handleChange(edu.id, 'gpa', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}