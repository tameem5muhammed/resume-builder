import { Document, Page, Text, View, Link } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { ResumeData } from "@/app/store/useResumeStore"; // Ensure path is correct for your setup

const tw = createTw({
  theme: {
    extend: { colors: { customBlue: "#1e3a8a" } },
  },
});

interface ResumeDocumentProps {
  data: ResumeData;
}

export function ResumeDocument({ data }: ResumeDocumentProps) {
  const {
    personalInfo,
    education,
    experience,
    projects,
    skills,
    certifications,
    references,
    awards,
    hobbies,
    languages,
    volunteer,
    portfolio,
    socialMedia,
    leadership,
    visibility,
  } = data;

  return (
    <Document>
      <Page size="A4" style={tw("p-8 bg-white")}>
        {/* Header Section: Personal Info */}
        <View style={tw("border-b border-gray-300 pb-4 mb-4")}>
          <Text style={tw("text-2xl font-bold text-gray-900")}>
            {personalInfo.name || "Your Name"}
          </Text>
          <Text style={tw("text-base text-gray-600 mt-1")}>
            {personalInfo.title || "Professional Title"}
          </Text>

          <View
            style={tw(
              "flex flex-row flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500",
            )}
          >
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.address && <Text>{personalInfo.address}</Text>}

            {/* Map Social Media links next to contact info */}
            {socialMedia &&
              socialMedia.map((social) => {
                if (!social.platform && !social.url) return null;
                const displayText = social.platform || social.url;
                const isValidUrl = social.url.length > 0;
                const formattedUrl = social.url.startsWith("http")
                  ? social.url
                  : `https://${social.url}`;

                return isValidUrl ? (
                  <Link
                    key={social.id}
                    src={formattedUrl}
                    style={tw("text-blue-600")}
                  >
                    {displayText}
                  </Link>
                ) : (
                  <Text key={social.id} style={tw("text-gray-600")}>
                    {displayText}
                  </Text>
                );
              })}
          </View>
        </View>

        {/* Education Section */}
        {visibility.education && education.length > 0 && (
          <View style={tw("mb-4")}>
            <Text
              style={tw(
                "text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2",
              )}
            >
              Education
            </Text>

            {education.map((edu) => (
              <View key={edu.id} style={tw("mb-3")}>
                <View
                  style={tw("flex flex-row justify-between items-baseline")}
                >
                  <Text style={tw("font-bold text-sm text-gray-900")}>
                    {edu.school}
                  </Text>
                  <Text style={tw("text-xs text-gray-600")}>
                    {edu.startDate} {edu.startDate && edu.endDate ? "-" : ""}{" "}
                    {edu.endDate}
                  </Text>
                </View>
                <Text style={tw("text-sm text-gray-700 mt-1")}>
                  {edu.major}
                </Text>
                {edu.gpa && (
                  <Text style={tw("text-xs text-gray-500 mt-1")}>
                    GPA: {edu.gpa}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Experience Section */}
        {visibility.experience && experience.length > 0 && (
          <View style={tw("mb-4")}>
            <Text
              style={tw(
                "text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 mt-4",
              )}
            >
              Professional Experience
            </Text>

            {experience.map((exp) => (
              <View key={exp.id} style={tw("mb-4")}>
                <View
                  style={tw("flex flex-row justify-between items-baseline")}
                >
                  <Text style={tw("font-bold text-sm text-gray-900")}>
                    {exp.position}
                  </Text>
                  <Text style={tw("text-xs text-gray-600")}>
                    {exp.startDate} {exp.startDate && exp.endDate ? "-" : ""}{" "}
                    {exp.endDate}
                  </Text>
                </View>
                <Text style={tw("text-sm text-gray-700 italic mt-1 mb-1")}>
                  {exp.company}
                </Text>

                {exp.description &&
                  exp.description.split("\n").map((line, i) => {
                    if (!line.trim()) return null;
                    return (
                      <View key={i} style={tw("flex flex-row mb-1 pr-4")}>
                        <Text style={tw("text-xs mr-2")}>•</Text>
                        <Text
                          style={tw("text-xs text-gray-700 leading-relaxed")}
                        >
                          {line}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            ))}
          </View>
        )}

        {/* Leadership Section */}
        {visibility.leadership && leadership && leadership.length > 0 && (
          <View style={tw("mb-4")}>
            <Text
              style={tw(
                "text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 mt-4",
              )}
            >
              Leadership & Extracurricular Activities
            </Text>

            {leadership.map((item) => (
              <View key={item.id} style={tw("mb-4")}>
                <View
                  style={tw("flex flex-row justify-between items-baseline")}
                >
                  <Text style={tw("font-bold text-sm text-gray-900")}>
                    {item.position}
                  </Text>
                  <Text style={tw("text-xs text-gray-600")}>
                    {item.startDate} {item.startDate && item.endDate ? "-" : ""}{" "}
                    {item.endDate}
                  </Text>
                </View>
                <Text style={tw("text-sm text-gray-700 italic mt-1 mb-1")}>
                  {item.company}
                </Text>

                {item.description &&
                  item.description.split("\n").map((line, i) => {
                    if (!line.trim()) return null; 
                    return (
                      <View key={i} style={tw("flex flex-row mb-1 pr-4")}>
                        <Text style={tw("text-xs mr-2")}>•</Text>
                        <Text
                          style={tw("text-xs text-gray-700 leading-relaxed")}
                        >
                          {line}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            ))}
          </View>
        )}

        {/* Volunteer Section */}
        {visibility.volunteer && volunteer && volunteer.length > 0 && (
          <View style={tw("mb-4")}>
            <Text
              style={tw(
                "text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 mt-4",
              )}
            >
              Volunteer & Community Service
            </Text>
            {volunteer.map((vol) => (
              <View key={vol.id} style={tw("mb-4")}>
                <View
                  style={tw("flex flex-row justify-between items-baseline")}
                >
                  <Text style={tw("font-bold text-sm text-gray-900")}>
                    {vol.position}
                  </Text>
                  <Text style={tw("text-xs text-gray-600")}>
                    {vol.startDate} - {vol.endDate}
                  </Text>
                </View>
                <Text style={tw("text-sm text-gray-700 italic mt-1 mb-1")}>
                  {vol.company}
                </Text>
                {vol.description &&
                  vol.description.split("\n").map((line, i) => {
                    if (!line.trim()) return null;
                    return (
                      <View key={i} style={tw("flex flex-row mb-1 pr-4")}>
                        <Text style={tw("text-xs mr-2")}>•</Text>
                        <Text
                          style={tw("text-xs text-gray-700 leading-relaxed")}
                        >
                          {line}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {visibility.skills && skills && skills.length > 0 && (
          <View style={tw("mb-4")}>
            <Text
              style={tw(
                "text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3 mt-4",
              )}
            >
              Skills
            </Text>
            <View style={tw("flex flex-row flex-wrap gap-2")}>
              {skills.map((skill, index) => (
                <View
                  key={index}
                  style={tw(
                    "px-2 py-1 bg-gray-100 rounded-sm border border-gray-200",
                  )}
                >
                  <Text style={tw("text-xs text-gray-700")}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projects Section */}
        {visibility.projects && projects && projects.length > 0 && (
          <View style={tw("mb-4")}>
            <Text
              style={tw(
                "text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 mt-4",
              )}
            >
              Projects
            </Text>

            {projects.map((project) => (
              <View key={project.id} style={tw("mb-4")}>
                <View style={tw("flex flex-row items-baseline mb-1")}>
                  <Text style={tw("font-bold text-sm text-gray-900 mr-2")}>
                    {project.name}
                  </Text>
                  {project.link && (
                    <Link
                      src={project.link}
                      style={tw("text-xs text-blue-600 underline")}
                    >
                      View Project
                    </Link>
                  )}
                </View>
                {project.technologies && (
                  <Text style={tw("text-xs text-gray-600 italic mb-1")}>
                    Technologies: {project.technologies}
                  </Text>
                )}
                {project.description &&
                  project.description.split("\n").map((line, i) => {
                    if (!line.trim()) return null;
                    return (
                      <View key={i} style={tw("flex flex-row mb-1 pr-4")}>
                        <Text style={tw("text-xs mr-2")}>•</Text>
                        <Text
                          style={tw("text-xs text-gray-700 leading-relaxed")}
                        >
                          {line}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            ))}
          </View>
        )}

        {/* Portfolio Section */}
        {visibility.portfolio && portfolio && portfolio.length > 0 && (
          <View style={tw("mb-4")}>
            <Text
              style={tw(
                "text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 mt-4",
              )}
            >
              Portfolio & Profiles
            </Text>
            <View style={tw("flex flex-row flex-wrap gap-4")}>
              {portfolio.map((item) => {
                if (!item.title && !item.link) return null;
                const displayText = item.title || item.link;
                const isValidUrl = item.link.length > 0;
                const formattedUrl = item.link.startsWith("http")
                  ? item.link
                  : `https://${item.link}`;

                return isValidUrl ? (
                  <Link
                    key={item.id}
                    src={formattedUrl}
                    style={tw("text-sm text-blue-600 underline")}
                  >
                    {displayText}
                  </Link>
                ) : (
                  <Text key={item.id} style={tw("text-sm text-gray-600")}>
                    {displayText}
                  </Text>
                );
              })}
            </View>
          </View>
        )}

        {/* Certifications Section */}
        {visibility.certifications && certifications && certifications.length > 0 && (
          <View style={tw("mb-4")}>
            <Text
              style={tw(
                "text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 mt-4",
              )}
            >
              Certifications
            </Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={tw("mb-2")}>
                <View
                  style={tw("flex flex-row justify-between items-baseline")}
                >
                  <Text style={tw("font-bold text-sm text-gray-900")}>
                    {cert.name}
                  </Text>
                  <Text style={tw("text-xs text-gray-600")}>{cert.date}</Text>
                </View>
                <View style={tw("flex flex-row items-baseline mt-1")}>
                  <Text style={tw("text-sm text-gray-700 italic mr-2")}>
                    {cert.issuer}
                  </Text>
                  {cert.link && (
                    <Link
                      src={cert.link}
                      style={tw("text-xs text-blue-600 underline")}
                    >
                      View Credential
                    </Link>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Awards Section */}
        {visibility.awards && awards && awards.length > 0 && (
          <View style={tw("mb-4")}>
            <Text
              style={tw(
                "text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 mt-4",
              )}
            >
              Awards & Achievements
            </Text>
            {awards.map((award) => (
              <View key={award.id} style={tw("mb-2")}>
                <View
                  style={tw("flex flex-row justify-between items-baseline")}
                >
                  <Text style={tw("font-bold text-sm text-gray-900")}>
                    {award.name}
                  </Text>
                  <Text style={tw("text-xs text-gray-600")}>{award.date}</Text>
                </View>
                <Text style={tw("text-sm text-gray-700 italic mt-1")}>
                  {award.issuer}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages & Hobbies Row */}
        <View style={tw("flex flex-row gap-8 mt-4 mb-4")}>
          {visibility.languages && languages && languages.length > 0 && (
            <View style={tw("flex-1")}>
              <Text
                style={tw(
                  "text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3",
                )}
              >
                Languages
              </Text>
              <View style={tw("flex flex-row flex-wrap gap-2")}>
                {languages.map((lang, index) => (
                  <Text
                    key={index}
                    style={tw(
                      "text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-sm border border-gray-200",
                    )}
                  >
                    {lang}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {visibility.hobbies && hobbies && hobbies.length > 0 && (
            <View style={tw("flex-1")}>
              <Text
                style={tw(
                  "text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3",
                )}
              >
                Hobbies
              </Text>
              <View style={tw("flex flex-row flex-wrap gap-2")}>
                {hobbies.map((hobby, index) => (
                  <Text
                    key={index}
                    style={tw(
                      "text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-sm border border-gray-200",
                    )}
                  >
                    {hobby}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* References Section */}
        {visibility.references && references && (
          <View style={tw("mb-4 mt-4")}>
            <Text
              style={tw(
                "text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2",
              )}
            >
              References
            </Text>
            <Text style={tw("text-sm text-gray-700")}>{references}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}