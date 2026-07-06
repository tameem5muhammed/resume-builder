import { notFound } from "next/navigation";
import Link from "next/link";
import { getResumeById } from "@/app/actions/resumeActions";
import { PublicDownloadPanel } from "@/app/components/organisms/PublicDownloadPanel";
import { ResumeData } from "@/app/store/useResumeStore";

export default async function PublicResumePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const resume = await getResumeById(resolvedParams.id);

  if (!resume || !resume.content) {
    notFound();
  }

  const data = (typeof resume.content === "string" ? JSON.parse(resume.content) : resume.content) as ResumeData;
  
  // Destructure EVERYTHING including the new summary and footer
  const { 
    personalInfo, summary, experience, education, skills, projects, 
    certifications, awards, languages, hobbies, portfolio, 
    socialMedia, volunteer, leadership, references, footer, visibility 
  } = data;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Top action bar with Navigation Back */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-bold transition-colors">
            <span aria-hidden="true">←</span> Back to Dashboard
          </Link>
          <div className="hidden sm:block h-4 w-px bg-slate-300"></div>
          <p className="text-slate-500 text-sm font-medium">
            Viewing <span className="font-bold text-slate-900">{personalInfo.name}'s</span> resume
          </p>
        </div>
        <PublicDownloadPanel data={data} />
      </div>

      <main className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
        
        {/* Header Section (Modern Web Look) */}
        <header className="bg-slate-900 text-white p-10 sm:p-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">
            {personalInfo.name || "Your Name"}
          </h1>
          {personalInfo.title && (
            <h2 className="text-xl sm:text-2xl text-blue-400 font-medium mb-6">
              {personalInfo.title}
            </h2>
          )}
          
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-slate-300 font-medium">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
          </div>

          {/* Social Media Links */}
          {socialMedia && socialMedia.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {socialMedia.map(social => {
                if (!social.platform && !social.url) return null;
                const formattedUrl = social.url.startsWith("http") ? social.url : `https://${social.url}`;
                return (
                  <a 
                    key={social.id} 
                    href={formattedUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white rounded-full text-sm font-medium transition-colors"
                  >
                    {social.platform || social.url}
                  </a>
                );
              })}
            </div>
          )}
        </header>

        <div className="p-8 sm:p-14 space-y-12 text-slate-800">
          
          {/* Summary Section */}
          {visibility.summary && summary?.content && (
            <section>
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">
                {summary.title || "Professional Summary"}
              </h3>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
                {summary.content}
              </p>
            </section>
          )}

          {/* Education Section */}
          {visibility.education && education && education.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">Education</h3>
              <div className="space-y-8">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-4 border-l-2 border-blue-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                      <h4 className="text-xl font-bold text-slate-900">{edu.school}</h4>
                      <span className="inline-block mt-2 sm:mt-0 text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                        {edu.startDate} {edu.startDate && edu.endDate ? "-" : ""} {edu.endDate}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <p className="text-lg text-slate-700 font-medium">{edu.major}</p>
                      {edu.gpa && <p className="text-sm text-slate-500 font-medium mt-1 sm:mt-0">GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {visibility.experience && experience && experience.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">Professional Experience</h3>
              <div className="space-y-10">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200 hover:border-blue-400 transition-colors">
                    <div className="absolute w-3 h-3 bg-white border-2 border-slate-300 rounded-full -left-[7px] top-2"></div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                      <h4 className="text-xl font-bold text-slate-900">{exp.position}</h4>
                      <span className="inline-block mt-2 sm:mt-0 text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                        {exp.startDate} {exp.startDate && exp.endDate ? "-" : ""} {exp.endDate}
                      </span>
                    </div>
                    <p className="text-lg text-blue-600 font-medium mb-4">{exp.company}</p>
                    <ul className="space-y-2 text-slate-700">
                      {exp.description && exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-3 text-blue-400 mt-1">•</span>
                          <span className="leading-relaxed">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Leadership Section */}
          {visibility.leadership && leadership && leadership.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">Leadership & Extracurriculars</h3>
              <div className="space-y-10">
                {leadership.map((item) => (
                  <div key={item.id} className="relative pl-4 border-l-2 border-slate-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                      <h4 className="text-xl font-bold text-slate-900">{item.position}</h4>
                      <span className="inline-block mt-2 sm:mt-0 text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                        {item.startDate} {item.startDate && item.endDate ? "-" : ""} {item.endDate}
                      </span>
                    </div>
                    <p className="text-lg text-slate-600 font-medium mb-4">{item.company}</p>
                    <ul className="space-y-2 text-slate-700">
                      {item.description && item.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-3 text-slate-400 mt-1">•</span>
                          <span className="leading-relaxed">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Volunteer Section */}
          {visibility.volunteer && volunteer && volunteer.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">Volunteer & Community Service</h3>
              <div className="space-y-10">
                {volunteer.map((vol) => (
                  <div key={vol.id} className="relative pl-4 border-l-2 border-slate-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                      <h4 className="text-xl font-bold text-slate-900">{vol.position}</h4>
                      <span className="inline-block mt-2 sm:mt-0 text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                        {vol.startDate} - {vol.endDate}
                      </span>
                    </div>
                    <p className="text-lg text-slate-600 font-medium mb-4">{vol.company}</p>
                    <ul className="space-y-2 text-slate-700">
                      {vol.description && vol.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-3 text-slate-400 mt-1">•</span>
                          <span className="leading-relaxed">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {visibility.skills && skills && skills.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-sm font-semibold shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {visibility.projects && projects && projects.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">Projects</h3>
              <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-slate-50 border border-slate-100 p-6 rounded-xl">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h4 className="text-xl font-bold text-slate-900">{project.name}</h4>
                      {project.link && (
                        <a href={project.link.startsWith("http") ? project.link : `https://${project.link}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors">
                          View Project <span aria-hidden="true" className="ml-1">↗</span>
                        </a>
                      )}
                    </div>
                    {project.technologies && (
                      <div className="mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tech Stack:</span>
                        <p className="text-sm text-slate-700 font-medium mt-1">{project.technologies}</p>
                      </div>
                    )}
                    <ul className="space-y-2 text-slate-700">
                      {project.description && project.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-3 text-slate-400 mt-1">•</span>
                          <span className="leading-relaxed">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Portfolio Section */}
          {visibility.portfolio && portfolio && portfolio.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">Portfolio & Profiles</h3>
              <div className="flex flex-wrap gap-4">
                {portfolio.map((item) => {
                  if (!item.title && !item.link) return null;
                  const formattedUrl = item.link.startsWith("http") ? item.link : `https://${item.link}`;
                  return (
                    <a 
                      key={item.id} 
                      href={formattedUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 py-3 bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md rounded-xl text-blue-600 font-semibold transition-all flex items-center gap-2"
                    >
                      {item.title || item.link}
                      <span aria-hidden="true" className="text-slate-400">↗</span>
                    </a>
                  );
                })}
              </div>
            </section>
          )}

          {/* Certifications & Awards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Certifications Section */}
            {visibility.certifications && certifications && certifications.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">Certifications</h3>
                <div className="space-y-5">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="group">
                      <div className="flex flex-col sm:flex-row justify-between items-start">
                        <h4 className="font-bold text-slate-900">{cert.name}</h4>
                        <span className="text-sm font-medium text-slate-500 mt-1 sm:mt-0">{cert.date}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        <p className="text-slate-700">{cert.issuer}</p>
                        {cert.link && (
                          <>
                            <span className="text-slate-300 hidden sm:inline">•</span>
                            <a href={cert.link.startsWith("http") ? cert.link : `https://${cert.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">
                              View Credential
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Awards Section */}
            {visibility.awards && awards && awards.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">Awards</h3>
                <div className="space-y-5">
                  {awards.map((award) => (
                    <div key={award.id}>
                      <div className="flex flex-col sm:flex-row justify-between items-start">
                        <h4 className="font-bold text-slate-900">{award.name}</h4>
                        <span className="text-sm font-medium text-slate-500 mt-1 sm:mt-0">{award.date}</span>
                      </div>
                      <p className="text-slate-700 mt-1">{award.issuer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Languages & Hobbies Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {visibility.languages && languages && languages.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {visibility.hobbies && hobbies && hobbies.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">Hobbies</h3>
                <div className="flex flex-wrap gap-2">
                  {hobbies.map((hobby, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                      {hobby}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* References Section */}
          {visibility.references && references && (
            <section>
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">References</h3>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <p className="text-slate-700 italic">{references}</p>
              </div>
            </section>
          )}

          {/* Footer Section */}
          {visibility.footer && footer && (
            <footer className="mt-16 text-center text-slate-500 font-medium text-sm pt-8">
              {footer}
            </footer>
          )}

        </div>
      </main>
    </div>
  );
}