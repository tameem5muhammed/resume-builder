import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getResumes, deleteResume, toggleResumePrivacy } from "@/app/actions/resumeActions";
import { CreateResumeButton } from "@/app/components/organisms/CreateResumeButton";
import { CopyLinkButton } from "@/app/components/organisms/CopyLinkButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const resumes = await getResumes();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-white font-medium">
              ← Back to Editor
            </Link>
            <h1 className="text-3xl font-extrabold text-white">My Resumes</h1>
          </div>
          <CreateResumeButton />
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-lg border border-gray-800">
            <p className="text-gray-400 mb-4">You haven't saved any resumes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg flex flex-col relative overflow-hidden">
                
                {/* Privacy Badge / Toggle */}
                <div className="absolute top-4 right-4">
                  <form action={async () => {
                    "use server";
                    await toggleResumePrivacy(resume.id, !resume.isPublic);
                  }}>
                    <button type="submit" className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                      resume.isPublic 
                        ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800 hover:bg-emerald-900" 
                        : "bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700"
                    }`}>
                      {resume.isPublic ? "🌍 Public" : "🔒 Private"}
                    </button>
                  </form>
                </div>

                <h2 className="text-xl font-bold text-white mb-2 pr-20">{resume.title}</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                
               {/* 2x2 Button Grid for better spacing */}
               <div className="mt-auto flex flex-col gap-2">
                 
                 {/* Top Row: Share & View */}
                 <div className="flex gap-2">
                   <CopyLinkButton resumeId={resume.id} isPublic={resume.isPublic} />
                   
                   <Link 
                     href={`/resume/${resume.id}`} 
                     target="_blank"
                     className="flex-1 text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded transition-colors"
                   >
                     View Web
                   </Link>
                 </div>

                 {/* Bottom Row: Edit & Delete */}
                 <div className="flex gap-2">
                   <Link 
                     href={`/?id=${resume.id}`} 
                     className="flex-1 text-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold rounded transition-colors"
                   >
                     Edit
                   </Link>
                   
                   <form action={async () => {
                     "use server";
                     await deleteResume(resume.id);
                   }} className="flex-1 flex">
                     <button type="submit" className="w-full px-4 py-2 text-red-500 bg-red-950/10 hover:bg-red-950/30 text-sm font-bold rounded transition-colors">
                       Delete
                     </button>
                   </form>
                 </div>

               </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}