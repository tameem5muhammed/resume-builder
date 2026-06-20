"use client";

import { useResumeStore, Certification } from '@/app/store/useResumeStore';
import { FormField } from '../molecules/FormField';

export function CertificationsForm() {
  const certifications = useResumeStore((state) => state.data.certifications);
  const updateList = useResumeStore((state) => state.updateList);

  const handleAdd = () => {
    const newCert: Certification = { id: crypto.randomUUID(), name: '', issuer: '', date: '', link: '' };
    updateList('certifications', [...certifications, newCert]);
  };

  const handleChange = (id: string, field: keyof Certification, value: string) => {
    const updated = certifications.map(cert => cert.id === id ? { ...cert, [field]: value } : cert);
    updateList('certifications', updated);
  };

  const handleRemove = (id: string) => {
    updateList('certifications', certifications.filter(cert => cert.id !== id));
  };

  return (
    <section className="p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
        <h2 className="text-xl font-bold text-white">Certifications</h2>
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
          + Add Certification
        </button>
      </div>

      <div className="space-y-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="p-4 border border-gray-700 rounded-md bg-gray-800 relative">
            <button onClick={() => handleRemove(cert.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-300 text-sm transition-colors">Remove</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Certification Name" id={`name-${cert.id}`} value={cert.name} onChange={(e) => handleChange(cert.id, 'name', e.target.value)} />
              <FormField label="Issuing Organization" id={`issuer-${cert.id}`} value={cert.issuer} onChange={(e) => handleChange(cert.id, 'issuer', e.target.value)} />
              <FormField label="Date Earned" id={`date-${cert.id}`} value={cert.date} onChange={(e) => handleChange(cert.id, 'date', e.target.value)} />
              <FormField label="Credential URL" id={`link-${cert.id}`} type="url" value={cert.link} onChange={(e) => handleChange(cert.id, 'link', e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}