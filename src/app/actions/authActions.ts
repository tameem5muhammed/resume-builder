"use server";

import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(data: { name?: string; email: string; password: string }) {
  try {
    const { name, email, password } = data;

    // Basic validation
    if (!email || !password) {
      return { success: false, error: "Email and password are required." };
    }
    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "An account with this email already exists." };
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}