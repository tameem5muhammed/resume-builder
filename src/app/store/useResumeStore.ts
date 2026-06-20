import { create } from "zustand";

export interface Education {
  id: string;
  school: string;
  major: string;
  type: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

// 1. Define the Experience interface
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string; // This will hold our multi-line "things done"
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string; // The embedded URL
  technologies: string; // e.g., "React, Node.js, Tailwind"
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  link: string;
}

export interface SocialLink {
  id: string;
  platform: string; // e.g., "LinkedIn", "GitHub"
  url: string;
}

export interface VisibilitySettings {
  education: boolean;
  experience: boolean;
  leadership: boolean;
  volunteer: boolean;
  projects: boolean;
  portfolio: boolean;
  skills: boolean;
  certifications: boolean;
  awards: boolean;
  languages: boolean;
  hobbies: boolean;
  references: boolean;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    website: string;
    address: string;
  };
  education: Education[];
  experience: Experience[]; // 2. Add experience array to our data
  skills: string[];
  projects: Project[];
  leadership: Experience[]; // Reusing Experience shape
  volunteer: Experience[]; // Reusing Experience shape
  certifications: Certification[];
  awards: Certification[]; // Reusing Certification shape (name, issuer/giver, date)
  hobbies: string[];
  languages: string[];
  portfolio: PortfolioItem[];
  socialMedia: SocialLink[];
  references: string;
  visibility: VisibilitySettings;
}

interface ResumeStore {
  data: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData["personalInfo"]>) => void;

  addEducation: (edu: Education) => void;
  updateEducation: (id: string, updatedEdu: Partial<Education>) => void;
  removeEducation: (id: string) => void; // Added remove function

  // 3. Add Experience actions
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, updatedExp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updatedProject: Partial<Project>) => void;
  removeProject: (id: string) => void;
  updateList: <
    K extends
      | "leadership"
      | "volunteer"
      | "certifications"
      | "awards"
      | "portfolio"
      | "socialMedia",
  >(
    key: K,
    items: ResumeData[K],
  ) => void;

  updateTags: <K extends "hobbies" | "languages">(
    key: K,
    items: ResumeData[K],
  ) => void;

  updateReferences: (text: string) => void;
  toggleVisibility: (section: keyof VisibilitySettings) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  data: {
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      website: "",
      address: "",
    },
    education: [],
    experience: [], // Initialize as empty array
    skills: [],
    projects: [],
    leadership: [],
    volunteer: [],
    certifications: [],
    awards: [],
    hobbies: [],
    languages: [],
    portfolio: [],
    socialMedia: [],
    references: "Available upon request.", // Default standard text

    visibility: {
      education: true,
      experience: true,
      leadership: true,
      volunteer: true,
      projects: true,
      portfolio: true,
      skills: true,
      certifications: true,
      awards: true,
      languages: true,
      hobbies: true,
      references: true,
    },
  },

  updatePersonalInfo: (info) =>
    set((state) => ({
      data: {
        ...state.data,
        personalInfo: { ...state.data.personalInfo, ...info },
      },
    })),

  addEducation: (edu) =>
    set((state) => ({
      data: { ...state.data, education: [...state.data.education, edu] },
    })),
  updateEducation: (id, updatedEdu) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((edu) =>
          edu.id === id ? { ...edu, ...updatedEdu } : edu,
        ),
      },
    })),
  removeEducation: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.filter((edu) => edu.id !== id),
      },
    })),

  // 4. Implement Experience actions
  addExperience: (exp) =>
    set((state) => ({
      data: { ...state.data, experience: [...state.data.experience, exp] },
    })),
  updateExperience: (id, updatedExp) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((exp) =>
          exp.id === id ? { ...exp, ...updatedExp } : exp,
        ),
      },
    })),
  removeExperience: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.filter((exp) => exp.id !== id),
      },
    })),

  addSkill: (skill) =>
    set((state) => {
      // Prevent adding empty skills or duplicates
      if (!skill.trim() || state.data.skills.includes(skill.trim()))
        return state;
      return {
        data: { ...state.data, skills: [...state.data.skills, skill.trim()] },
      };
    }),

  removeSkill: (skillToRemove) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.filter((skill) => skill !== skillToRemove),
      },
    })),
  addProject: (project) =>
    set((state) => ({
      data: { ...state.data, projects: [...state.data.projects, project] },
    })),
  updateProject: (id, updatedProject) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.map((proj) =>
          proj.id === id ? { ...proj, ...updatedProject } : proj,
        ),
      },
    })),
  removeProject: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.filter((proj) => proj.id !== id),
      },
    })),
  updateList: (key, items) =>
    set((state) => ({ data: { ...state.data, [key]: items } })),
  updateTags: (key, items) =>
    set((state) => ({ data: { ...state.data, [key]: items } })),
  updateReferences: (text) =>
    set((state) => ({ data: { ...state.data, references: text } })),

  toggleVisibility: (section) =>
    set((state) => ({
      data: {
        ...state.data,
        visibility: {
          ...state.data.visibility,
          [section]: !state.data.visibility[section], // Flips true to false, or false to true
        },
      },
    })),
}));
