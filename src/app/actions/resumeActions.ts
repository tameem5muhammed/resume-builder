"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// 1. Save or Update a Resume
export async function saveResume(title: string, content: any, resumeId?: string) {
  try {
    // Pass authOptions to ensure session reads correctly
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return { success: false, error: "Must be logged in to save to cloud." };
    }

    // Find the user by their authenticated email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return { success: false, error: "User not found." };
    }

    let savedResume;

    if (resumeId) {
      // --- SECURITY PATCH: Check Ownership before updating ---
      const existingResume = await prisma.resume.findUnique({
        where: { id: resumeId }
      });

      if (!existingResume) {
        return { success: false, error: "Resume not found." };
      }

      if (existingResume.userId !== user.id) {
        return { success: false, error: "Unauthorized: You do not own this resume." };
      }
      // -------------------------------------------------------

      // Update existing resume
      savedResume = await prisma.resume.update({
        where: { id: resumeId },
        data: { title, content },
      });
    } else {
      // Create new resume
      savedResume = await prisma.resume.create({
        data: {
          title,
          content,
          userId: user.id,
        },
      });
    }
    
    // Tell Next.js to refresh the dashboard page so the new resume shows up
    revalidatePath("/dashboard");
    
    // Return the ID so Zustand can update its currentResumeId state
    return { success: true, newId: savedResume.id };
  } catch (error) {
    console.error("Failed to save resume:", error);
    return { success: false, error: "Failed to save to database" };
  }
}

// 2. Fetch all Resumes for the Dashboard
export async function getResumes() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return [];

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) return [];

    const resumes = await prisma.resume.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      // Added isPublic here so the dashboard can render the toggle correctly!
      select: { id: true, title: true, updatedAt: true, isPublic: true } 
    });
    return resumes;
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
    return [];
  }
}

// 3. Delete a Resume
export async function deleteResume(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return { success: false };

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) return { success: false };

    // Extra security: Only allow deletion if the user actually owns it
    const existing = await prisma.resume.findUnique({ where: { id } });
    if (existing?.userId !== user.id) return { success: false };

    await prisma.resume.delete({
      where: { id },
    });
    
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete resume:", error);
    return { success: false };
  }
}

// 4. Get a specific Resume
export async function getResumeById(id: string) {
  try {
    const resume = await prisma.resume.findUnique({ where: { id } });
    return resume;
  } catch (error) {
    return null;
  }
}

// 5. Toggle Privacy Status
export async function toggleResumePrivacy(id: string, isPublic: boolean) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return { success: false, error: "Unauthorized" };

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return { success: false, error: "User not found" };

    // Verify ownership before updating
    const existing = await prisma.resume.findUnique({ where: { id } });
    if (existing?.userId !== user.id) return { success: false, error: "Unauthorized" };

    await prisma.resume.update({
      where: { id },
      data: { isPublic },
    });
    
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle privacy:", error);
    return { success: false, error: "Failed to update" };
  }
}