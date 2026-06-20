"use client";

import { useResumeStore, Project } from '@/app/store/useResumeStore';
import { FormField } from '../molecules/FormField';
import { Textarea } from '../atoms/Textarea';
import { Label } from '../atoms/Label';

export function ProjectsForm() {
  const projectsList = useResumeStore((state) => state.data.projects);
  const addProject = useResumeStore((state) => state.addProject);
  const updateProject = useResumeStore((state) => state.updateProject);
  const removeProject = useResumeStore((state) => state.removeProject);

  const handleAdd = () => {
    addProject({
      id: crypto.randomUUID(),
      name: '',
      description: '',
      link: '',
      technologies: '',
    });
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-xl font-bold">Projects</h2>
        <button onClick={handleAdd} className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800">
          + Add Project
        </button>
      </div>

      {projectsList.length === 0 && (
        <p className="text-gray-500 text-sm italic">No projects added yet.</p>
      )}

      <div className="space-y-6">
        {projectsList.map((project, index) => (
          <div key={project.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 relative">
            <button 
              onClick={() => removeProject(project.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-semibold"
            >
              Remove
            </button>

            <h3 className="font-semibold text-gray-700 mb-4">Project #{index + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField label="Project Name" id={`name-${project.id}`} placeholder="E-commerce Platform" value={project.name} onChange={(e) => updateProject(project.id, { name: e.target.value })} />
              <FormField label="Project Link (URL)" id={`link-${project.id}`} placeholder="https://github.com/yourusername/project" type="url" value={project.link} onChange={(e) => updateProject(project.id, { link: e.target.value })} />
            </div>

            <div className="mb-4">
              <FormField label="Technologies Used" id={`tech-${project.id}`} placeholder="React, Node.js, MongoDB" value={project.technologies} onChange={(e) => updateProject(project.id, { technologies: e.target.value })} />
            </div>

            <div className="mb-2">
              <Label htmlFor={`desc-${project.id}`}>Description & Key Features (Put each on a new line)</Label>
              <Textarea 
                id={`desc-${project.id}`} 
                placeholder="- Built a full-stack e-commerce app...&#10;- Integrated Stripe for payments..."
                value={project.description} 
                onChange={(e) => updateProject(project.id, { description: e.target.value })} 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}