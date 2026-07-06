"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

// 1. Save or Update a Resume
export async function saveResume(title: string, content: any, resumeId?: string) {
  try {
    const session = await getServerSession();
    
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
    const session = await getServerSession();
    if (!session || !session.user?.email) return [];

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) return [];

    const resumes = await prisma.resume.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, updatedAt: true } // Don't fetch the massive content JSON just for the list
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
    const session = await getServerSession();
    if (!session || !session.user?.email) return { success: false };

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