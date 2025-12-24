"use client";

import FAQSection from "@/components/faq";
import { STUDENT_FAQ } from "@/utils/constant";

export default function StudentFAQ() {
  return <FAQSection data={STUDENT_FAQ} />;
}
