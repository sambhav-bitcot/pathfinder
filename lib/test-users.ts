import type { User } from "./types";

export const TEST_USERS: Record<string, User> = {
  student: {
    id: "stu-1",
    email: "student@test.com",
    grade: "12th Grade",

    firstName: "Alex",
    lastName: "Student",
    role: "student",
    targetSchools: ["Stanford", "MIT", "UC Berkeley"],

    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    createdAt: new Date("2024-01-01"),
  },
  educator: {
    id: "edu-1",

    email: "educator@test.com",
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    title: "College Admissions Specialist",
    specialization: "Ivy League Applications",
    topic: "College Admissions",
    rating: 4.9,
    reviews: 156,
    hourlyRate: 50,
    role: "educator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Former admissions officer at Harvard with 15 years of experience helping students achieve their college dreams.",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    createdAt: new Date("2024-01-01"),
  },
  admin: {
    id: "test-admin-1",
    email: "admin@test.com",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    createdAt: new Date("2024-01-01"),
  },
};
