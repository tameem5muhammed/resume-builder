import { notFound } from "next/navigation";
import { getResumeById } from "@/app/actions/resumeActions";
// 1. Updated the import to the new Panel
import { PublicDownloadPanel } from "@/app/components/organisms/PublicDownloadPanel";
import { ResumeData } from "@/app/store/useResumeStore";

export default async function PublicResumePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const resume = await getResumeById(resolvedParams.id);

  if (!resume || !resume.content) {
    notFound();
  }

  const data = (typeof resume.content === "string" ? JSON.parse(resume.content) : resume.content) as ResumeData;
  
  // Destructure EVERYTHING
  const { 
    personalInfo, experience, education, skills, projects, 
    certifications, awards, languages, hobbies, portfolio, 
    socialMedia, volunteer, leadership, references, visibility 
  } = data;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Top action bar */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <p className="text-gray-500 text-sm font-medium">
          You are viewing <span className="font-bold text-gray-900">{personalInfo.name}'s</span> public resume.
        </p>
        {/* 2. Swapped out the old button for the interactive Panel */}
        <PublicDownloadPanel data={data} />
      </div>

      <main className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        
        {/* Header Section */}
        <header className="bg-gray-900 text-white p-8 sm:p-12 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold mb-2">{personalInfo.name}</h1>
          <h2 className="text-xl text-blue-400 font-semibold mb-6">{personalInfo.title}</h2>
          
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-sm text-gray-300">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.address && <span>• {personalInfo.address}</span>}
          </div>

          {/* Social Media Links in Header */}
          {socialMedia && socialMedia.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-4">
              {socialMedia.map(social => {
                if (!social.platform && !social.url) return null;
                const formattedUrl = social.url.startsWith("http") ? social.url : `https://${social.url}`;
                return (
                  <a key={social.id} href={formattedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white underline text-sm">
                    {social.platform || social.url}
                  </a>
                );
              })}
            </div>
          )}
        </header>

        <div className="p-8 sm:p-12 space-y-12 text-gray-800">
          
          {/* Experience Section */}
          {visibility.experience && experience && experience.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6">Experience</h3>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
                      <h4 className="text-xl font-bold">{exp.position}</h4>
                      <span className="text-sm font-medium text-gray-500 mt-1 sm:mt-0 bg-gray-100 px-3 py-1 rounded-full">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-blue-600 font-semibold mb-3">{exp.company}</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-relaxed">
                      {exp.description && exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {visibility.education && education && education.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6">Education</h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="flex flex-col sm:flex-row justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold">{edu.school}</h4>
                      <p className="text-gray-600 font-medium">{edu.major}</p>
                      {edu.gpa && <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-sm font-medium text-gray-500 sm:text-right mt-2 sm:mt-0">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Leadership Section */}
          {visibility.leadership && leadership && leadership.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6">Leadership & Extracurriculars</h3>
              <div className="space-y-8">
                {leadership.map((item) => (
                  <div key={item.id}>
                    <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
                      <h4 className="text-xl font-bold">{item.position}</h4>
                      <span className="text-sm font-medium text-gray-500 mt-1 sm:mt-0">{item.startDate} - {item.endDate}</span>
                    </div>
                    <p className="text-gray-600 font-semibold mb-2">{item.company}</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                      {item.description && item.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li key={i}>{line}</li>
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
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6">Volunteer & Community Service</h3>
              <div className="space-y-8">
                {volunteer.map((vol) => (
                  <div key={vol.id}>
                    <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
                      <h4 className="text-xl font-bold">{vol.position}</h4>
                      <span className="text-sm font-medium text-gray-500 mt-1 sm:mt-0">{vol.startDate} - {vol.endDate}</span>
                    </div>
                    <p className="text-gray-600 font-semibold mb-2">{vol.company}</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                      {vol.description && vol.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {visibility.projects && projects && projects.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6">Projects</h3>
              <div className="space-y-8">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-xl font-bold">{project.name}</h4>
                      {project.link && (
                        <a href={project.link.startsWith("http") ? project.link : `https://${project.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">
                          View Project
                        </a>
                      )}
                    </div>
                    {project.technologies && <p className="text-sm text-gray-500 italic mb-2">Technologies: {project.technologies}</p>}
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                      {project.description && project.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li key={i}>{line}</li>
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
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {visibility.certifications && certifications && certifications.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6">Certifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-gray-50 border border-gray-100 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900">{cert.name}</h4>
                    <p className="text-sm text-gray-600 mb-1">{cert.issuer}</p>
                    <p className="text-xs text-gray-500 mb-2">{cert.date}</p>
                    {cert.link && (
                      <a href={cert.link.startsWith("http") ? cert.link : `https://${cert.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">
                        View Credential
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards Section */}
          {visibility.awards && awards && awards.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6">Awards</h3>
              <div className="space-y-4">
                {awards.map((award) => (
                  <div key={award.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h4 className="font-bold text-gray-900">{award.name}</h4>
                      <p className="text-sm text-gray-600">{award.issuer}</p>
                    </div>
                    <span className="text-sm text-gray-500">{award.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Portfolio Section */}
          {visibility.portfolio && portfolio && portfolio.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6">Portfolio & Profiles</h3>
              <div className="flex flex-wrap gap-4">
                {portfolio.map((item) => {
                  if (!item.title && !item.link) return null;
                  const formattedUrl = item.link.startsWith("http") ? item.link : `https://${item.link}`;
                  return (
                    <a key={item.id} href={formattedUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                      {item.title || item.link}
                    </a>
                  );
                })}
              </div>
            </section>
          )}

          {/* Languages & Hobbies Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {visibility.languages && languages && languages.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">{lang}</span>
                  ))}
                </div>
              </section>
            )}

            {visibility.hobbies && hobbies && hobbies.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Hobbies</h3>
                <div className="flex flex-wrap gap-2">
                  {hobbies.map((hobby, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">{hobby}</span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* References Section */}
          {visibility.references && references && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">References</h3>
              <p className="text-gray-700">{references}</p>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}