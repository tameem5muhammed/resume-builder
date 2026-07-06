"use client";

// 1. Import `use` from React
import { useEffect, useState, use } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
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
import { DownloadButton } from "./components/organisms/DownloadButton";
import { SaveButton } from "./components/organisms/SaveButton";
import { getResumeById } from "@/app/actions/resumeActions";
import { useResumeStore } from "@/app/store/useResumeStore";
import { SummaryForm } from "@/app/components/organisms/SummaryForm";
import { FooterForm } from "@/app/components/organisms/FooterForm";

const ResumePreview = dynamic(
  () => import("@/app/components/organisms/ResumePreview"),
  {
    ssr: false,
    loading: () => <p className="text-gray-400">Loading PDF engine...</p>,
  },
);

// 2. Change searchParams type to a Promise
export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  // 3. Unwrap the searchParams using React.use()
  const params = use(searchParams);
  const resumeId = params?.id;

  const loadFullResume = useResumeStore((state) => state.loadFullResume);

  // 4. Use the unwrapped resumeId instead of searchParams
  const [isLoading, setIsLoading] = useState(!!resumeId);

  useEffect(() => {
    async function fetchSavedData() {
      if (resumeId) {
        const resume = await getResumeById(resumeId);
        if (resume && resume.content) {
          const content =
            typeof resume.content === "string"
              ? JSON.parse(resume.content)
              : resume.content;
          loadFullResume(resume.id, content);
        }
      }
      setIsLoading(false);
    }

    fetchSavedData();
  }, [resumeId, loadFullResume]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-950 text-white">
        <p className="text-xl font-bold animate-pulse">
          Loading your resume...
        </p>
      </div>
    );
  }

  return (
    <BuilderLayout
      forms={
        <>
          <div className="flex justify-between items-center mb-8 bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-800 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Resume Builder
              </h1>
              {/* Dashboard Navigation Link */}
              <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                View My Resumes
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <SaveButton />
              <DownloadButton />
            </div>
          </div>

          <SectionToggles />

          <PersonalInfoForm />
          <SummaryForm />
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
          <FooterForm />
        </>
      }
      preview={<ResumePreview />}
    />
  );
}