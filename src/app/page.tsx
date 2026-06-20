"use client";

import dynamic from "next/dynamic";
import { BuilderLayout } from "@/app/components/templates/BuilderLayout";
import { PersonalInfoForm } from "@/app/components/organisms/PersonalInfoForm";
import { EducationForm } from "@/app/components/organisms/EducationForm";
import { ExperienceForm } from "./components/organisms/ExperienceForm";
import { SkillsForm } from "./components/organisms/SkillForm";
import { ProjectsForm } from "./components/organisms/ProjectsForm";
import { CertificationsForm } from "./components/organisms/CertificationsForm";
import { ReferencesForm } from "./components/organisms/ReferencesForm";
import { AwardsForm } from "./components/organisms/AwardsForm";
import { LanguagesForm } from "./components/organisms/LanguagesForm";
import { HobbiesForm } from "./components/organisms/HobbiesForm";
import { SocialMediaForm } from "./components/organisms/SocialMediaForm";
import { PortfolioForm } from "./components/organisms/PortfolioForm";
import { VolunteerForm } from "./components/organisms/VolunteerForm";
import { LeadershipForm } from "./components/organisms/LeadershipForm";
import { SectionToggles } from "./components/organisms/SectionToggles";
// 1. Import the Download Button
import { DownloadButton } from "./components/organisms/DownloadButton"; 

const ResumePreview = dynamic(
  () => import("@/app/components/organisms/ResumePreview"),
  {
    ssr: false,
    loading: () => <p className="text-gray-400">Loading PDF engine...</p>,
  },
);

export default function Home() {
  return (
    <BuilderLayout
      forms={
        <>
          {/* 2. Group the Title and Download Button in a Flex container */}
          <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100 sticky top-0 z-10">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Resume Builder
            </h1>
            <DownloadButton />
          </div>
          
          <SectionToggles /> 
          
          <PersonalInfoForm />
          <SocialMediaForm />
          <EducationForm />
          <ExperienceForm />
          <LeadershipForm />
          <VolunteerForm />
          <SkillsForm />
          <ProjectsForm />
          <PortfolioForm />
          <CertificationsForm />
          <AwardsForm />
          <LanguagesForm />
          <HobbiesForm />
          <ReferencesForm />
        </>
      }
      preview={<ResumePreview />}
    />
  );
}