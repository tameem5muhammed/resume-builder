"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

// We will hardcode a "dummy user" ID for now until you add real authentication (like NextAuth or Clerk)
const DUMMY_USER_ID = "user_123";

// 1. Save or Update a Resume
export async function saveResume(title: string, content: any, resumeId?: string) {
  try {
    // Ensure the dummy user exists in the DB first
    await prisma.user.upsert({
      where: { id: DUMMY_USER_ID },
      update: {},
      create: { id: DUMMY_USER_ID, email: "test@example.com", name: "Test User" }
    });

    if (resumeId) {
      // Update existing resume
      await prisma.resume.update({
        where: { id: resumeId },
        data: { title, content },
      });
    } else {
      // Create new resume
      await prisma.resume.create({
        data: {
          title,
          content,
          userId: DUMMY_USER_ID,
        },
      });
    }
    
    // Tell Next.js to refresh the dashboard page so the new resume shows up
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to save resume:", error);
    return { success: false, error: "Failed to save to database" };
  }
}

// 2. Fetch all Resumes for the Dashboard
export async function getResumes() {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userId: DUMMY_USER_ID },
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

export async function getResumeById(id: string) {
  try {
    const resume = await prisma.resume.findUnique({ where: { id } });
    return resume;
  } catch (error) {
    return null;
  }
}