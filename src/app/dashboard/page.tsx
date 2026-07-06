import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getResumes, deleteResume } from "@/app/actions/resumeActions";

// This is a Server Component, so it fetches data directly from Postgres securely!
export default async function DashboardPage() {
  // 1. Check if the user is authenticated
  const session = await getServerSession(authOptions);

  // 2. If no session exists, redirect them back to the home page
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

          <Link 
            href="/" 
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-md transition-colors"
          >
            + Create New Resume
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-lg border border-gray-800">
            <p className="text-gray-400 mb-4">You haven't saved any resumes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg flex flex-col">
                <h2 className="text-xl font-bold text-white mb-2">{resume.title}</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                
               <div className="mt-auto flex justify-between items-center gap-4">
                 {/* Link to the public view! */}
                 <Link 
                   href={`/resume/${resume.id}`} 
                   target="_blank" // Opens in a new tab
                   className="flex-1 text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded transition-colors"
                 >
                   View Public
                 </Link>
                 
                 <Link 
                   href={`/?id=${resume.id}`} 
                   className="flex-1 text-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold rounded transition-colors"
                 >
                   Edit
                 </Link>
                 
                 <form action={async () => {
                   "use server";
                   await deleteResume(resume.id);
                 }}>
                   <button type="submit" className="px-4 py-2 text-red-500 hover:bg-red-950/30 text-sm font-bold rounded transition-colors">
                     Delete
                   </button>
                 </form>
               </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}