import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const { userId, data } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      StudentProfile,
    } = data as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phoneNumber?: string;
      StudentProfile?: Record<string, unknown>;
    };

    const userUpdateData: Record<string, unknown> = {};

    if (typeof firstName === "string") {
      userUpdateData.firstName = firstName.trim();
    }
    if (typeof lastName === "string") {
      userUpdateData.lastName = lastName.trim();
    }
    if (typeof email === "string") {
      userUpdateData.email = email.trim().toLowerCase();
    }
    if (typeof phoneNumber === "string") {
      userUpdateData.phoneNumber = phoneNumber.trim();
    }

    if (Object.keys(userUpdateData).length > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: userUpdateData,
      });
    }

    if (StudentProfile && typeof StudentProfile === "object") {
      const studentUpdateData: Record<string, unknown> = {};

      if (typeof StudentProfile.educationLevel === "string") {
        studentUpdateData.educationLevel = StudentProfile.educationLevel;
      }

      if (StudentProfile.desiredSubjects !== undefined) {
        if (typeof StudentProfile.desiredSubjects === "string") {
          studentUpdateData.desiredSubjects = [StudentProfile.desiredSubjects];
        } else if (Array.isArray(StudentProfile.desiredSubjects)) {
          studentUpdateData.desiredSubjects = StudentProfile.desiredSubjects.filter(
            (item): item is string => typeof item === "string"
          );
        }
      }

      if (typeof StudentProfile.reason === "string") {
        studentUpdateData.reason = StudentProfile.reason;
      }

      if (typeof StudentProfile.hasOtherCourses === "boolean") {
        studentUpdateData.hasOtherCourses = StudentProfile.hasOtherCourses;
      } else if (
        StudentProfile.hasOtherCourses === "true" ||
        StudentProfile.hasOtherCourses === "კი"
      ) {
        studentUpdateData.hasOtherCourses = true;
      }

      if (typeof StudentProfile.usageFrequency === "string") {
        studentUpdateData.usageFrequency = StudentProfile.usageFrequency;
      }

      if (typeof StudentProfile.preferredLessonType === "string") {
        studentUpdateData.preferredLessonType = StudentProfile.preferredLessonType;
      }

      if (typeof StudentProfile.discoverySource === "string") {
        studentUpdateData.discoverySource = StudentProfile.discoverySource;
      }

      if (Object.keys(studentUpdateData).length > 0) {
        await prisma.studentProfile.update({
          where: { userId },
          data: studentUpdateData,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update profile error:", err);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
