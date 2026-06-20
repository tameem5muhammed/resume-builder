"use client";

import dynamic from "next/dynamic";
import { BuilderLayout } from "@/app/components/templates/BuilderLayout";
import { PersonalInfoForm } from "@/app/components/organisms/PersonalInfoForm";
// 1. Import the new form
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
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
            Resume Builder
          </h1>
          <PersonalInfoForm />
          <SocialMediaForm /> {/* Good to have right after personal info */}
          <EducationForm />
          <ExperienceForm />
          <LeadershipForm />
          <VolunteerForm /> {/* Good to have near experience */}
          <SkillsForm />
          <ProjectsForm />
          <PortfolioForm /> {/* Good to have near projects */}
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
