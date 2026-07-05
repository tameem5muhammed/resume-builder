import { Document, Page, Text, View, Link } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { ResumeData } from "@/app/store/useResumeStore";

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
      <Page
        size="A4"
        style={[tw("p-6 bg-white"), { fontFamily: "Times-Roman", fontSize: 12 }]}
      >
        {/* Header Section: Personal Info */}
        <View style={tw("pb-3 mb-4")}>
          <Text style={tw("font-bold uppercase text-center")}>
            {personalInfo.name || "YOUR NAME"}
          </Text>
          
          {personalInfo.title && (
            <Text style={tw("font-bold uppercase text-center mt-1")}>
              {personalInfo.title}
            </Text>
          )}

          <View
            style={tw(
              "flex flex-row flex-wrap justify-center gap-x-3 gap-y-1 mt-2",
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
                    style={tw("text-blue-600 underline")}
                  >
                    {displayText}
                  </Link>
                ) : (
                  <Text key={social.id}>{displayText}</Text>
                );
              })}
          </View>
        </View>

        {/* Education Section */}
        {visibility.education && education.length > 0 && (
          <View style={tw("mb-4")}>
            <Text style={tw("font-bold uppercase border-b border-black pb-1 mb-2")}>
              Education
            </Text>

            {education.map((edu) => (
              <View key={edu.id} style={tw("mb-2")}>
                <View style={tw("flex flex-row justify-between items-baseline mb-0.5")}>
                  <Text style={tw("font-bold")}>{edu.school}</Text>
                  <Text>
                    {edu.startDate} {edu.startDate && edu.endDate ? "-" : ""}{" "}
                    {edu.endDate}
                  </Text>
                </View>
                <View style={tw("flex flex-row justify-between items-baseline")}>
                  <Text>{edu.major}</Text>
                  {edu.gpa && <Text>GPA: {edu.gpa}</Text>}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Experience Section */}
        {visibility.experience && experience.length > 0 && (
          <View style={tw("mb-4")}>
            <Text style={tw("font-bold uppercase border-b border-black pb-1 mb-2")}>
              Professional Experience
            </Text>

            {experience.map((exp) => (
              <View key={exp.id} style={tw("mb-3")}>
                <View style={tw("flex flex-row justify-between items-baseline mb-0.5")}>
                  <Text style={tw("font-bold")}>{exp.position}</Text>
                  <Text>
                    {exp.startDate} {exp.startDate && exp.endDate ? "-" : ""}{" "}
                    {exp.endDate}
                  </Text>
                </View>
                <Text style={tw("italic mb-1")}>{exp.company}</Text>

                {exp.description &&
                  exp.description.split("\n").map((line, i) => {
                    if (!line.trim()) return null;
                    return (
                      <View key={i} style={tw("flex flex-row pr-4 mb-0.5")}>
                        <Text style={tw("mr-1.5")}>•</Text>
                        <Text>{line}</Text>
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
            <Text style={tw("font-bold uppercase border-b border-black pb-1 mb-2")}>
              Leadership & Extracurricular Activities
            </Text>

            {leadership.map((item) => (
              <View key={item.id} style={tw("mb-3")}>
                <View style={tw("flex flex-row justify-between items-baseline mb-0.5")}>
                  <Text style={tw("font-bold")}>{item.position}</Text>
                  <Text>
                    {item.startDate} {item.startDate && item.endDate ? "-" : ""}{" "}
                    {item.endDate}
                  </Text>
                </View>
                <Text style={tw("italic mb-1")}>{item.company}</Text>

                {item.description &&
                  item.description.split("\n").map((line, i) => {
                    if (!line.trim()) return null;
                    return (
                      <View key={i} style={tw("flex flex-row pr-4 mb-0.5")}>
                        <Text style={tw("mr-1.5")}>•</Text>
                        <Text>{line}</Text>
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
            <Text style={tw("font-bold uppercase border-b border-black pb-1 mb-2")}>
              Volunteer & Community Service
            </Text>
            {volunteer.map((vol) => (
              <View key={vol.id} style={tw("mb-3")}>
                <View style={tw("flex flex-row justify-between items-baseline mb-0.5")}>
                  <Text style={tw("font-bold")}>{vol.position}</Text>
                  <Text>
                    {vol.startDate} - {vol.endDate}
                  </Text>
                </View>
                <Text style={tw("italic mb-1")}>{vol.company}</Text>
                {vol.description &&
                  vol.description.split("\n").map((line, i) => {
                    if (!line.trim()) return null;
                    return (
                      <View key={i} style={tw("flex flex-row pr-4 mb-0.5")}>
                        <Text style={tw("mr-1.5")}>•</Text>
                        <Text>{line}</Text>
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
            <Text style={tw("font-bold uppercase border-b border-black pb-1 mb-2")}>
              Skills
            </Text>
            <View style={tw("flex flex-row flex-wrap")}>
              <Text>{skills.join(", ")}</Text>
            </View>
          </View>
        )}

        {/* Projects Section */}
        {visibility.projects && projects && projects.length > 0 && (
          <View style={tw("mb-4")}>
            <Text style={tw("font-bold uppercase border-b border-black pb-1 mb-2")}>
              Projects
            </Text>

            {projects.map((project) => (
              <View key={project.id} style={tw("mb-3")}>
                <View style={tw("flex flex-row items-baseline mb-1")}>
                  <Text style={tw("font-bold mr-1")}>{project.name}</Text>
                  {project.link && (
                    <Link src={project.link} style={tw("text-blue-600 underline")}>
                      (View Project)
                    </Link>
                  )}
                </View>
                {project.technologies && (
                  <Text style={tw("italic mb-1")}>
                    Technologies: {project.technologies}
                  </Text>
                )}
                {project.description &&
                  project.description.split("\n").map((line, i) => {
                    if (!line.trim()) return null;
                    return (
                      <View key={i} style={tw("flex flex-row pr-4 mb-0.5")}>
                        <Text style={tw("mr-1.5")}>•</Text>
                        <Text>{line}</Text>
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
            <Text style={tw("font-bold uppercase border-b border-black pb-1 mb-2")}>
              Portfolio & Profiles
            </Text>
            <View style={tw("flex flex-row flex-wrap gap-x-4")}>
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
                    style={tw("text-blue-600 underline")}
                  >
                    {displayText}
                  </Link>
                ) : (
                  <Text key={item.id}>{displayText}</Text>
                );
              })}
            </View>
          </View>
        )}

        {/* Certifications Section */}
        {visibility.certifications && certifications && certifications.length > 0 && (
          <View style={tw("mb-4")}>
            <Text style={tw("font-bold uppercase border-b border-black pb-1 mb-2")}>
              Certifications
            </Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={tw("mb-2")}>
                <View style={tw("flex flex-row justify-between items-baseline mb-0.5")}>
                  <Text style={tw("font-bold")}>{cert.name}</Text>
                  <Text>{cert.date}</Text>
                </View>
                <View style={tw("flex flex-row items-baseline")}>
                  <Text style={tw("italic mr-1")}>{cert.issuer}</Text>
                  {cert.link && (
                    <Link src={cert.link} style={tw("text-blue-600 underline")}>
                      (View Credential)
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
            <Text style={tw("font-bold uppercase border-b border-black pb-1 mb-2")}>
              Awards & Achievements
            </Text>
            {awards.map((award) => (
              <View key={award.id} style={tw("mb-2")}>
                <View style={tw("flex flex-row justify-between items-baseline mb-0.5")}>
                  <Text style={tw("font-bold")}>{award.name}</Text>
                  <Text>{award.date}</Text>
                </View>
                <Text style={tw("italic")}>{award.issuer}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages & Hobbies Row */}
        <View style={tw("flex flex-row gap-8 mb-4")}>
          {visibility.languages && languages && languages.length > 0 && (
            <View style={tw("flex-1")}>
              <Text style={tw("font-bold uppercase border-b border-black pb-1 mb-2")}>
                Languages
              </Text>
              <View style={tw("flex flex-row flex-wrap")}>
                <Text>{languages.join(", ")}</Text>
              </View>
            </View>
          )}

          {visibility.hobbies && hobbies && hobbies.length > 0 && (
            <View style={tw("flex-1")}>
              <Text style={tw("font-bold uppercase border-b border-black pb-1 mb-2")}>
                Hobbies
              </Text>
              <View style={tw("flex flex-row flex-wrap")}>
                <Text>{hobbies.join(", ")}</Text>
              </View>
            </View>
          )}
        </View>

        {/* References Section */}
        {visibility.references && (
          <View style={tw("mb-4")}>
            <Text style={tw("font-bold uppercase border-b border-black pb-1 mb-2")}>
              References
            </Text>
            <Text>{references}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}