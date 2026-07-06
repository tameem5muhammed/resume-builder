import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Education {
  id: string;
  school: string;
  major: string;
  type: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  technologies: string;
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
  platform: string;
  url: string;
}

export interface VisibilitySettings {
  summary: boolean;
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
  footer: boolean;
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
  summary: Summary;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  leadership: Experience[];
  volunteer: Experience[];
  certifications: Certification[];
  awards: Certification[];
  hobbies: string[];
  languages: string[];
  portfolio: PortfolioItem[];
  socialMedia: SocialLink[];
  references: string;
  footer: string;
  visibility: VisibilitySettings;
}

export interface Summary {
  title: string;
  content: string;
}

interface ResumeStore {
  data: ResumeData;
  currentResumeId: string | null;
  setCurrentResumeId: (id: string | null) => void;
  loadFullResume: (resumeId: string, fullData: ResumeData) => void;
  updatePersonalInfo: (info: Partial<ResumeData["personalInfo"]>) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, updatedEdu: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, updatedExp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updatedProject: Partial<Project>) => void;
  removeProject: (id: string) => void;
  updateSummary: (summary: { title: string; content: string }) => void;
  updateFooter: (text: string) => void;

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

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: {
        personalInfo: {
          name: "",
          title: "",
          email: "",
          phone: "",
          website: "",
          address: "",
        },
        summary: { title: "Professional Summary", content: "" }, // Default summary
        education: [],
        experience: [],
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
        references: "Available upon request.",
        footer: "",

        visibility: {
          summary: true,
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
          footer: true,
          references: true,
        },
      },

      currentResumeId: null,

      setCurrentResumeId: (id) => set({ currentResumeId: id }),

      loadFullResume: (resumeId, fullData) =>
        set({
          currentResumeId: resumeId,
          data: fullData,
        }),

      updatePersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...info },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({ data: { ...state.data, summary } })),

      updateFooter: (text) =>
        set((state) => ({ data: { ...state.data, footer: text } })),

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
              [section]: !state.data.visibility[section],
            },
          },
        })),
    }),
    {
      name: "resume-storage", // name of the item in local storage
      partialize: (state) => ({ data: state.data }), // Only save the resume data, not the ID
    }
  )
);