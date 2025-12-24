export type UserRole = "student" | "educator" | "admin";

export interface User {
  id: string;
  email: string;
  title?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  grade?: string;
  specialization?: string;
  topic?: string;
  rating?: number;
  reviews?: number;
  hourlyRate?: number;
  bio?: string;
  targetSchools?: string[];
  availability?:string[];
  phone?: string;
  createdAt: Date;
}

  export interface Resources{
   id?:string,  
    title:  string;
    category:  string;
    type:  string;
    size?:  string;
    downloads?: number;
    description:  string;
    resourceId?:string;
  }
export interface Session {
  id: string;
  studentId: string;
  educatorId: string;
  title: string;
  description: string;
  scheduledAt: Date;
  duration: number;
  status: "scheduled" | "completed" | "cancelled";
  tokenCost: number;
}

export interface StudentProfileUpdate {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
}
export interface EducatorProfileUpdate {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  status?:string,
  description?: string;
  email?:string,
  topic?: string;
  specialization?: string;
}
export interface AdminUserUpdate {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  role?:string;
  password?:string
}
export interface AdminUserDetail {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  status?: string;
  email?: string;
  specialization?: string;
  role?:UserRole;
  platform?:string;
}
export interface UpdatePassword {
  password?: string;
  newPassword?: string;
  retypePassword?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  amount: number;
  type: "credit" | "debit";
  description: string;
  timestamp: Date;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  isPremium: boolean;
  tokenCost?: number;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: "Public" | "Private";
  size: "Small" | "Medium" | "Large";
  acceptanceRate: number;
  avgGPA: number;
  avgSAT: number;
  avgACT: number;
  tuition: number;
  ranking: number;
  majors: string[];
  description: string;
  image: string;
  website: string;
  matchScore?: number;
}

export interface Application {
  id: string;
  studentId: string;
  collegeId: string;
  collegeName: string;
  collegeImage: string;
  status:
    | "Not Started"
    | "In Progress"
    | "Submitted"
    | "Accepted"
    | "Rejected"
    | "Waitlisted";
  deadline: string;
  applicationFee: number;
  requirements: ApplicationRequirement[];
  submittedDate?: string;
  decisionDate?: string;
  notes: string;
}

export interface ApplicationRequirement {
  id: string;
  name: string;
  type: "Essay" | "Transcript" | "Test Score" | "Recommendation" | "Other";
  completed: boolean;
  dueDate?: string;
}

export interface StudentProfile {
  id: string;
  studentId: string;
  gpa: number;
  satScore?: number;
  actScore?: number;
  apCourses: string[];
  honors: string[];
  extracurriculars: Activity[];
  awards: string[];
  volunteerHours: number;
  workExperience: WorkExperience[];
  intendedMajor: string;
  careerGoals: string;
}

export interface Activity {
  id: string;
  name: string;
  role: string;
  yearsInvolved: number;
  hoursPerWeek: number;
  description: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface TestScore {
  id: string;
  studentId: string;
  testType: "SAT" | "ACT" | "AP" | "SAT Subject";
  subject?: string;
  score: number;
  maxScore: number;
  date: string;
  percentile?: number;
}

export interface Essay {
  id: string;
  studentId: string;
  applicationId?: string;
  title: string;
  prompt: string;
  content: string;
  wordCount: number;
  maxWords: number;
  status: "Draft" | "In Review" | "Revised" | "Final";
  feedback?: EssayFeedback[];
  lastEdited: string;
  version: number;
}

export interface EssayFeedback {
  id: string;
  educatorId: string;
  educatorName: string;
  comment: string;
  timestamp: string;
  rating?: number;
}

export interface Document {
  id: string;
  studentId: string;
  name: string;
  type: "Transcript" | "Resume" | "Essay" | "Recommendation" | "Other";
  fileUrl: string;
  uploadDate: string;
  size: string;
  sharedWith: string[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: "Testing" | "Applications" | "Essays" | "Financial Aid" | "Other";
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}

export interface FinancialAid {
  collegeId: string;
  collegeName: string;
  tuition: number;
  roomAndBoard: number;
  booksAndSupplies: number;
  otherExpenses: number;
  totalCost: number;
  estimatedAid: number;
  netCost: number;
  scholarships: Scholarship[];
}

export interface Scholarship {
  id: string;
  name: string;
  amount: number;
  deadline: string;
  requirements: string;
  status: "Available" | "Applied" | "Awarded" | "Denied";
}
