export const PUBLIC_PATH = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  HOME: "/",
};

export const PRIVATE_PATH = {
  DASHBOARD: "/dashboard",
  // Admin Paths
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_PAYMENTS: "/admin/payments",
  ADMIN_PROFILE: "/admin/profile",
  ADMIN_RESOURCES: "/admin/resources",
  ADMIN_CREATE_RESOURCE: "/admin/resources/create-resource",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_USERS: "/admin/users",
  ADMIN_USER_DETAIL: "/admin/users/[userId]",
  // Student Paths
  STUDENT_APPLICATIONS: "/student/applications",
  STUDENT_CHAT: "/student/chat",
  STUDENT_COLLEGES: "/student/colleges",
  STUDENT_DASHBOARD: "/student/dashboard",
  STUDENT_FAQ: "/student/faq",
  STUDENT_PROFILE: "/student/profile",
  STUDENT_RESOURCES: "/student/resources",
  STUDENT_SESSIONS: "/student/sessions",
  STUDENT_SESSION_JOIN: "/student/sessions/[sessionId]/join",
  STUDENT_BOOK_SESSION: "/student/sessions/book-session",
  STUDENT_BOOK_SESSION_EDUCATOR: "/student/sessions/book-session/[educatorId]",
  STUDENT_WALLET: "/student/wallet",
  // Educator Paths
  EDUCATOR_AVAILABILITY: "/educator/availability",
  EDUCATOR_CHAT: "/educator/chat",
  EDUCATOR_DASHBOARD: "/educator/dashboard",
  EDUCATOR_EARNINGS: "/educator/earnings",
  EDUCATOR_FAQ: "/educator/faq",
  EDUCATOR_PROFILE: "/educator/profile",
  EDUCATOR_SESSIONS: "/educator/sessions",
  EDUCATOR_SESSION_JOIN: "/educator/sessions/[sessionId]/join",
};


export const ADMIN_NAV_ITEMS = [
  { href: PRIVATE_PATH.ADMIN_DASHBOARD, label: "Dashboard", icon: Home },
  { href: PRIVATE_PATH.ADMIN_USERS, label: "Users", icon: Users },
  // { href: PRIVATE_PATH, label: "Payments", icon: DollarSign },
  { href: PRIVATE_PATH.ADMIN_ANALYTICS, label: "Analytics", icon: BarChart3 },
  { href: PRIVATE_PATH.ADMIN_RESOURCES, label: "Resources", icon: BookOpen },

  { href: PRIVATE_PATH.ADMIN_SETTINGS, label: "Settings", icon: Settings },
];
export const EDUCATOR_NAV_ITEMS = [
  { href: PRIVATE_PATH.EDUCATOR_DASHBOARD, label: "Dashboard", icon: Home },
  { href: PRIVATE_PATH.EDUCATOR_SESSIONS, label: "Sessions", icon: Calendar },
  {
    href: PRIVATE_PATH.EDUCATOR_CHAT,
    label: "Chat",
    icon: MessageSquare,
  },
  {
    href: PRIVATE_PATH.EDUCATOR_AVAILABILITY,
    label: "Availability",
    icon: Clock,
  },
  // {
  //   href: PRIVATE_PATH,
  //   label: "Earnings",
  //   icon: DollarSign,
  // },
  { href: PRIVATE_PATH.EDUCATOR_FAQ, label: "FAQs", icon: File },
];

export const STUDENT_NAV_ITEMS = [
  { href: PRIVATE_PATH.STUDENT_DASHBOARD, label: "Dashboard", icon: Home },
  { href: PRIVATE_PATH.STUDENT_SESSIONS, label: "Sessions", icon: Calendar },
  { href: PRIVATE_PATH.STUDENT_CHAT, label: "Chat", icon: MessageSquare },
  { href: PRIVATE_PATH.STUDENT_WALLET, label: "Wallet", icon: Wallet },
  { href: PRIVATE_PATH.STUDENT_RESOURCES, label: "Resources", icon: BookOpen },
  { href: PRIVATE_PATH.STUDENT_FAQ, label: "FAQs", icon: File },
];


export const ERROR_PATH = {
  NOT_FOUND: "/not-found",
};

export const ROUTES_PATH = {
  ...PUBLIC_PATH,
  ...PRIVATE_PATH,
  ...ERROR_PATH,
};

export const FIREBASE_COLLECTION_PATH = {
  CHATS: "chats",
  MESSAGES: "messages",
  USERS: "users",
};

export const FIREBASE_FIELDS_NAME = {
  MEMBERS_ID: "members_ids",
};

export const FIREBASE_QUERY_NAME = {
  ARRAY_CONTAINS: "array-contains",
};

export const RESOURCE_CATEGORIES = [
  { label: "All", value: null },
  { label: "Essay Writing", value: "ESSAY_WRITING" },
  { label: "Test Prep", value: "TEST_PREP" },
  { label: "Financial Aid", value: "FINANCIAL_AID" },
  { label: "Admissions", value: "ADMISSIONS" },
];

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
};
// Session Tabs Labels
export const SESSION_TABS = {
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
  ALL: "All",
  CANCELED: "Cancelled",
  EXPIRED: "Expired",
} as const;

// Default pagination
export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
} as const;

export const GAP_OPTIONS = [5, 10, 15, 30];

export const DEFAULT_AVAILABILITY_FORM = {
  availabilityDays: [
    {
      dayOfWeek: "MONDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
    {
      dayOfWeek: "TUESDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
    {
      dayOfWeek: "WEDNESDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
    {
      dayOfWeek: "THURSDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
    {
      dayOfWeek: "FRIDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
    {
      dayOfWeek: "SATURDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
    {
      dayOfWeek: "SUNDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
  ],
  break: { break_between_interval: 10, interval_status: true },
  lunchBreak: { startTime: "14.00", endTime: "15.00", lunchBreak: true },
  slot_duration: [30, 60],
  unavailabilityDays: [],
  overrides: null,
};

export const VIDEO_CALL = {
  JOINED: "call.session_participant_joined",
  LEFT: "call.session_participant_left",
};

export const LOCAL_STORAGE_KEYS = {
  isInCall: "isInCall",
  sessionToken: "sessionToken",
};
export const ROLES_MAP = {
  STUDENT: "student",
  EDUCATOR: "educator",
  ADMIN: "admin",
};

export const dAYS_OF_WEEK_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export const SESSION_STATUS = {
  WAIT_FOR_APPROVAL: "WAIT_FOR_APPROVAL",
  BOOKED: "BOOKED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  RESCHEDULED: "RESCHEDULED",
} as const;

export const TERMS_CONDITIONS = [
  "Once a session is booked, the student can reschedule it up to 24 hours before the scheduled start time.",
  "Sessions cannot be rescheduled within 24 hours of the scheduled start time.",
  "No additional tokens will be charged for rescheduling a session.",
  "If a session is cancelled more than 24 hours before its scheduled start time, the full number of tokens used for booking will be refunded to the student’s account.",
  "If a session is cancelled within 24 hours of the scheduled start time, no tokens will be refunded.",
  "Once the session has started, the student will not be able to cancel it, and no tokens will be refunded.",
  "If a student fails to join the session within 10 minutes of the start time, the session will be marked as expired, and the tokens used for booking will not be refunded.",
  "10-minute grace period from the scheduled start time to join the session. ",
];

export const EDUCATOR_FAQ = [
  {
    question: "How do I register as an educator?",
    answer:
      "Educators cannot self-register. The admin will create the profile, and you’ll receive login credentials to access your account.",
  },
  {
    question: "How can I set my availability for sessions?",
    answer:
      "After logging in, you can set your available time slots under the Availability section. These slots will be visible to all registered students for booking.",
  },
  {
    question: "Can I modify or cancel a session once it’s booked?",
    answer:
      "No, educators cannot reschedule or cancel sessions once they are booked by a student.",
  },
  {
    question: "What happens when a student books one of my available slots?",
    answer:
      "Once a student books a slot, that time slot will be disabled for other students, ensuring one-on-one sessions.",
  },
  {
    question: "Can I view my past and upcoming sessions?",
    answer:
      "Yes, you can view both your upcoming and completed sessions from your educator dashboard.",
  },
  {
    question: "How are session prices or token values decided?",
    answer: "Session pricing (in tokens) is determined by the admin.",
  },
];

export const STUDENT_FAQ = [
  {
    question: "How can I sign up as a student?",
    answer:
      "You can register directly on the portal using your details. Once registered, you’ll receive bonus tokens in your wallet to book sessions.",
  },
  {
    question: "How do I book a session with an educator?",
    answer:
      "After logging in, view the available time slots under the 'Availability' section set by the educators and book a session that suits you.",
  },
  {
    question: "What happens if another student books the same slot?",
    answer:
      "Each time slot can only be booked by one student. Once booked, that slot will no longer be available to others.",
  },
  {
    question: "Can I reschedule my session?",
    answer:
      "Yes, you can reschedule your session up to 24 hours before the scheduled start time without any additional token charge.",
  },
  {
    question: "Can I cancel my session?",
    answer:
      "Yes, you can cancel your session before 24 hours of the start time to get a full token refund. Cancellations made within 24 hours won’t be refunded.",
  },
  {
    question: "What if I don’t join the session on time?",
    answer:
      "If you don’t join within 10 minutes of the scheduled time, the session will be marked as expired, and tokens won’t be refunded.",
  },
  {
    question: "Can I chat with educators?",
    answer:
      "Yes, students can chat with any educator anytime through the chat feature.",
  },
  {
    question: "What are the session durations available?",
    answer:
      "Admin provides two session durations — 30 minutes and 60 minutes. You can choose as per your need, and tokens will be deducted accordingly.",
  },
];

// User Management Tabs (admin view)
export const USER_TAB_KEYS = {
  all: "",
  student: "student",
  educator: "educator",
} as const;
export type UserTabKey = keyof typeof USER_TAB_KEYS;
export const USER_TAB_LABELS: Record<UserTabKey, string> = {
  all: "All Users",
  student: "Students",
  educator: "Educators",
};

export const COLORS = {
  red: "var(--chart-1)",
  green: "var(--chart-2)",
  orange: "var(--chart-3)",
  yellow: "var(--chart-4)",
  pink: "var(--chart-5)",
};

export const ERROR_MSG = {
  network: "Network Error: Unable to connect to the server",
};

import {
  Search,
  Target,
  FileText,
  Video,
  TrendingUp,
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  File,
  Home,
  MessageSquare,
  Settings,
  Users,
  Wallet,
  GraduationCap,
  Shield,
} from "lucide-react";

export const PUBLIC_ROUTE = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/",
};




export const FEATURES_DATA = [
  {
    title: "College Search & Match",
    description:
      "Discover colleges that match your profile, interests, and goals with our intelligent matching system.",
    icon: Search,
  },
  {
    title: "Application Tracker",
    description:
      "Stay organized with deadline reminders, requirement checklists, and real-time application status tracking.",
    icon: Target,
  },
  {
    title: "Essay Review & Editing",
    description:
      "Get expert feedback on your personal statements and supplemental essays from experienced counselors.",
    icon: FileText,
  },
  {
    title: "Test Prep Resources",
    description:
      "Access SAT/ACT practice tests, study guides, and personalized prep plans to maximize your scores.",
    icon: BookOpen,
  },
  {
    title: "1-on-1 Video Sessions",
    description:
      "Book personalized counseling sessions with expert advisors via secure video conferencing.",
    icon: Video,
  },
  {
    title: "Financial Aid Calculator",
    description:
      "Estimate costs, explore scholarships, and plan your financial aid strategy with our comprehensive tools.",
    icon: TrendingUp,
  },
  {
    title: "Profile Builder",
    description:
      "Create a comprehensive profile showcasing your GPA, test scores, activities, and achievements.",
    icon: BarChart3,
  },
  {
    title: "Timeline & Milestones",
    description:
      "Follow a personalized timeline with key milestones tailored to your grade level and goals.",
    icon: Clock,
  },
  {
    title: "Real-Time Chat",
    description:
      "Stay connected with your counselors through instant messaging for quick questions and support.",
    icon: MessageSquare,
  },
];
export const HOW_PATHFINDER_WORKS_DATA = [
  {
    step: 1,
    title: "Create Your Profile",
    description:
      "Sign up and build your student profile with your academic info, interests, and goals.",
  },
  {
    step: 2,
    title: "Find Your Counselor",
    description:
      "Browse expert counselors by specialty and book your first session with the perfect match.",
  },
  {
    step: 3,
    title: "Build Your Strategy",
    description:
      "Work with your counselor to create a personalized college application strategy and timeline.",
  },
  {
    step: 4,
    title: "Achieve Your Goals",
    description:
      "Track progress, submit applications, and get accepted to your dream schools!",
  },
];

export const BUILT_FOR_EVERYONE_DATA = [
  {
    title: "For Students",
    icon: GraduationCap,
    iconWrapperClass:
      "w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center",
    iconClass: "w-8 h-8 text-primary",
    checkClass: "w-5 h-5 text-primary mt-0.5 flex-shrink-0",
    buttonVariant: "default",
    buttonClass: "w-full",
    buttonLabel: "Start as Student",
    href: "/signup",
    cardClass: "p-8 space-y-6",
    features: [
      "Search and compare colleges",
      "Track all applications in one place",
      "Get essay feedback from experts",
      "Access test prep materials",
      "Calculate financial aid options",
    ],
  },
  {
    title: "For Educators",
    icon: Users,
    iconWrapperClass:
      "w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center",
    iconClass: "w-8 h-8 text-secondary",
    checkClass: "w-5 h-5 text-secondary mt-0.5 flex-shrink-0",
    buttonVariant: "secondary",
    buttonClass: "w-full",
    buttonLabel: "Start as Educator",
    href: "/signup",
    cardClass: "p-8 space-y-6 border-primary",
    features: [
      "Manage your availability and bookings",
      "Conduct video sessions with students",
      "Share resources and materials",
      "Track earnings and payments",
      "Build your counseling practice",
    ],
  },
  {
    title: "For Admins",
    icon: Shield,
    iconWrapperClass:
      "w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center",
    iconClass: "w-8 h-8 text-accent",
    checkClass: "w-5 h-5 text-accent mt-0.5 flex-shrink-0",
    buttonVariant: "outline",
    buttonClass: "w-full bg-transparent",
    buttonLabel: "Start as Admin",
    href: "/signup",
    cardClass: "p-8 space-y-6",
    features: [
      "Manage users and permissions",
      "Monitor platform analytics",
      "Process payments and refunds",
      "Generate detailed reports",
      "Configure platform settings",
    ],
  },
];

export const SUCCESS_STORIES_DATA = [
  {
    rating: 5,
    quote:
      "Pathfinder helped me get into Stanford! The essay review sessions were invaluable, and my counselor guided me through every step of the process.",
    initials: "EW",
    name: "Emma Wilson",
    subtitle: "Stanford University '29",
  },
  {
    rating: 5,
    quote:
      "The test prep resources boosted my SAT score by 240 points! I couldn't have done it without the personalized study plan and practice materials.",
    initials: "JS",
    name: "James Smith",
    subtitle: "Harvard University '29",
  },
  {
    rating: 5,
    quote:
      "The application tracker kept me organized and on top of all my deadlines. I got accepted to all 8 schools I applied to!",
    initials: "SL",
    name: "Sophia Lee",
    subtitle: "Columbia University '29",
  },
];

export const FOOTER_LINK = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Testimonials", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

