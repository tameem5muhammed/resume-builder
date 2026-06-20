"use client";

import React, { useState } from 'react';
import { useResumeStore } from '@/app/store/useResumeStore';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';

export function SkillsForm() {
  const skills = useResumeStore((state) => state.data.skills);
  const addSkill = useResumeStore((state) => state.addSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);
  
  // Local state just for the typing box
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from refreshing on form submit
    if (inputValue.trim()) {
      addSkill(inputValue);
      setInputValue(''); // Clear the box after adding
    }
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Skills</h2>
      
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <div className="flex-1">
          <Label htmlFor="skill-input">Add a skill (e.g., React, Graphic Design)</Label>
          <Input 
            id="skill-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a skill and press Enter..."
          />
        </div>
        <button 
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors h-[42px]"
        >
          Add
        </button>
      </form>

      {/* Render the skill tags */}
      <div className="flex flex-wrap gap-2">
        {skills.length === 0 && (
          <p className="text-gray-500 text-sm italic">No skills added yet.</p>
        )}
        {skills.map((skill) => (
          <div 
            key={skill} 
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-800"
          >
            <span>{skill}</span>
            <button 
              onClick={() => removeSkill(skill)}
              className="text-gray-500 hover:text-red-500 font-bold focus:outline-none"
              aria-label={`Remove ${skill}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}