"use client";

import React, { useState } from 'react';
import { useResumeStore } from '@/app/store/useResumeStore';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';

export function HobbiesForm() {
  const hobbies = useResumeStore((state) => state.data.hobbies);
  const updateTags = useResumeStore((state) => state.updateTags);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !hobbies.includes(inputValue.trim())) {
      updateTags('hobbies', [...hobbies, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (itemToRemove: string) => {
    updateTags('hobbies', hobbies.filter((lang) => lang !== itemToRemove));
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Hobbies</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <div className="flex-1">
          <Label htmlFor="lang-input">Add a Hobby (e.g., English, Spanish)</Label>
          <Input id="lang-input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type and press Enter..." />
        </div>
        <button type="submit" className="mt-6 px-4 py-2 bg-blue-600 text-white text-sm rounded-md h-[42px]">Add</button>
      </form>
      <div className="flex flex-wrap gap-2">
        {hobbies.map((lang) => (
          <div key={lang} className="flex items-center gap-2 px-3 py-1 bg-gray-100 border rounded-full text-sm">
            <span>{lang}</span>
            <button onClick={() => handleRemove(lang)} className="text-gray-500 hover:text-red-500 font-bold">×</button>
          </div>
        ))}
      </div>
    </section>
  );
}