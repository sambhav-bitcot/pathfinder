import strict from "assert/strict";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Format phone number- (123)-456-7890
export const formatPhone = (num: string = ""):string => {
  if (num.length <= 3) return num;
  if (num.length <= 6) return `(${num.slice(0, 3)})-${num.slice(3)}`;
  return `(${num.slice(0, 3)})-${num.slice(3, 6)}-${num.slice(6, 10)}`;

};

export const passwordResetAPI = {
  student: "/api/student/reset-password",
  educator: "/api/educator/reset-password",
  admin: "/api/admin/reset-password",
};

export function formatDateFullDay(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export const dayMap: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export const weekDayData: { day: string; checked: boolean }[] = [
  { day: "SUNDAY", checked: true },
  { day: "MONDAY", checked: false },
  { day: "TUESDAY", checked: false },
  { day: "WEDNESDAY", checked: false },
  { day: "THURSDAY", checked: false },
  { day: "FRIDAY", checked: false },
  { day: "SATURDAY", checked: false },
];

const DIGIT_ONLY = /^\d*$/;

export const normalizeNumber = (value: string) => {
  if (!DIGIT_ONLY.test(value)) return null;
  return value.replace(/^0+(?!$)/, "") || "0";
};