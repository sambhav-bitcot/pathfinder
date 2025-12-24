/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { BehaviorSubject } from 'rx';
import { toast } from 'react-toastify';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LOCAL_STORAGE_KEYS, SESSION_STATUS } from './constant';
import { DEFAULT_PAGINATION } from './constant'
import { UsersPaginationType } from '@/types/users'
import { UserTabKey } from './constant'
import Cookies from 'js-cookie';
import { getPresignedUrlAction } from './graphql/auth/action';

// for global loader service
export const isLoading = new BehaviorSubject<boolean>(false);

export const isDialogOpen = new BehaviorSubject<any>({
  open: false,
  data: { message: 'Are you Sure?', title: '' },
  cancelText: 'Cancel',
  confirmText: 'Okay',
  onConfirm: () => { }
});

export const generateUUID = () => {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    if (c === 'x') {
      return r.toString(16);
    } else {
      return ((r & 0x3) | 0x8).toString(16);
    }
  });
};

const ninetySeven = 97;
export const indexToLetter = (index: number) =>
  String.fromCharCode(ninetySeven + index);

export function generateUniqueId(prefix = 'id') {
  // Generate a random number and convert it to a base36 string
  const thirtySix = 36;
  const randomString = Math.random().toString(thirtySix).substring(2);
  // Create a unique ID by combining the prefix and random string
  return `${prefix}-${randomString}`;
}

export function generateUniqueNumber() {
  // Gets the current time in milliseconds
  const timestamp = Date.now();
  // Generates a random decimal number between 0 and 1
  const randomComponent = Math.random();
  // Combines and converts them into a unique number
  return Number(`${timestamp}${Math.floor(randomComponent * 1000)}`);
}

export const forSuccess = (message: string, id?: string) =>
  toast.success(message, { autoClose: 3000, toastId: id ?? 1 });

export const forError = (message: string, id?: string) =>
  toast.error(message, { autoClose: 3000, toastId: id ?? 1 });

export const forWarning = (message: string, id?: string) =>
  toast.warning(message, { autoClose: 3000, toastId: id ?? 1 });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Debounce utility function
export type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number = 1000
): DebouncedFunction<T> => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: Parameters<T>): void {
    const context = this as unknown;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, delay);
  };
};

export const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/\D/g, '');
  if (phoneNumber.length <= 3) {
    return phoneNumber;
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else if (phoneNumber.length <= 10) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }
};

export const phoneValidationRule = {
  message: 'Please enter a valid US phone number (10 digits)',
  rule: (val: any) => {
    if (!val) return false;
    // Remove all non-digit characters for validation
    const digits = val.replace(/\D/g, '');
    // Must be exactly 10 digits
    return digits.length === 10;
  }
};
export interface DownloadOptions {
  filename?: string;
  openInNewTabOnFail?: boolean;
}

export async function downloadFromUrl(url: string, options: DownloadOptions = {}): Promise<void> {
  if (!url) return;
  const { filename, openInNewTabOnFail = true } = options;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch file');
    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    if (filename) link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(objectUrl);
  } catch (_) {
    if (openInNewTabOnFail) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}

// Date formatting functions
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });
};


export const getSessionDateAndTimeLabel = (session: any): { dateLabel: string; timeLabel: string } => {
  
  // const isRescheduled = session.status === SESSION_STATUS.RESCHEDULED;
  // const dateString = isRescheduled
  //   ? session.rescheduled_at_start_time
  //   : session.scheduled_at_start_time;
  const dateString = session.rescheduled_at_end_time === null 
  ? session.scheduled_at_start_time 
  : session.rescheduled_at_start_time;
  return {
    dateLabel: formatDate(dateString || ""),
    timeLabel: formatTime(dateString || ""),
  };
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const formatDateLong = (date: Date | null | undefined): string => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

/**
 * Get weekday name from a date (e.g., "Monday", "Tuesday")
 */
export function getWeekdayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

/**
 * Check if a date should be disabled based on today's date and educator availability
 * @param date - The date to check
 * @param availableWeekdays - Array of weekday names (e.g., ["Monday", "Tuesday"])
 * @returns true if the date should be disabled
 */
export function isDateDisabled(date: Date, availableWeekdays: string[]): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayName = getWeekdayName(date);
  const isEducatorAvailable = availableWeekdays.includes(dayName);
  return date < today || !isEducatorAvailable;
}

export function buildSafeFilename(baseName: string, extension?: string): string {
  const safeBase = (baseName || 'resource').trim().replace(/[^a-zA-Z0-9-_. ]/g, '_');
  if (!extension) return safeBase;
  return `${safeBase}.${extension}`;
}

export function getFileExtensionFromUrlOrType(url: string, mimeType?: string): string | undefined {
  try {
    const { pathname } = new URL(url);
    const extFromUrl = pathname.includes('.') ? pathname.split('.').pop() || '' : '';
    if (extFromUrl) return extFromUrl;
  } catch (_) {
    // ignore URL parse errors, fall back to mime
  }
  const extFromType = mimeType?.includes('/') ? mimeType.split('/')[1] : '';
  return extFromType || undefined;
}

export async function downloadResource(params: { title: string; fileUrl: string; mimeType?: string }): Promise<void> {
  const { title, fileUrl, mimeType } = params;
  const extension = getFileExtensionFromUrlOrType(fileUrl, mimeType);
  const filename = buildSafeFilename(title, extension);
  return downloadFromUrl(fileUrl, { filename });
}

/**
 * Get file extension with dot prefix (e.g., ".jpg", ".png")
 * Converts jpeg to jpg for consistency
 */
// export function getFileExtension(file: File): string {
//   const extension = file.name.split('.').pop()?.toLowerCase() || '';
//   // Return .jpg or .png (with dot)
//   const ext = extension === 'jpeg' ? 'jpg' : extension;
//   return `.${ext}`;
// }

export function getFileExtension(file: File): string {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';

  // Check for valid extensions (pdf, doc, docx)
  if (['pdf', 'doc', 'docx'].includes(extension)) {
    return `.${extension}`;
  }

  // If the file extension is not valid, return an empty string or handle error accordingly
  return '';
}
/**
 * Generate file path in uploads/ directory format
 * Format: uploads/baseName_timestamp_random.extension
 */
export function generateUploadsFileName(file: File): string {
  const extension = getFileExtension(file).replace('.', ''); // Remove dot for filename
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const baseName = file.name
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[^a-zA-Z0-9-_]/g, '_') // Replace special chars
    .substring(0, 30); // Limit length
  return `uploads/${baseName}_${timestamp}_${random}.${extension}`;
}

/**
 * Maps session data to a formatted structure for display
 * @param sessions - Array of Session objects
 * @param limit - Optional limit for number of sessions to return (default: all)
 * @returns Array of formatted session objects with id, title, educatorName, date, time, duration
 */
export interface FormattedSession {
  id: string;
  title: string;
  educatorName: string;
  date: string;
  time: string;
  duration: number;
}

export function mapUpcomingSessions(
  sessions: any[],
  limit?: number
): FormattedSession[] {
  const sessionsToProcess = limit ? sessions.slice(0, limit) : sessions;

  return sessionsToProcess.map((session) => {
    return {
      id: session?.id,
      title: session?.title || "Counseling Session",
      educatorName: `${session.educator?.first_name || ""} ${session?.educator?.last_name || ""}`.trim() || "Educator",
      date: getSessionDateAndTimeLabel(session)?.dateLabel || "",
      time: getSessionDateAndTimeLabel(session)?.timeLabel || "",
      duration: session?.duration_min || 30
    };
  });
}

// for videocall service
export const generateAvatarUrl = (firstName: string, lastName: string): string => {
  return `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;
};

export const stopMediaTracks = (call: any) => {
  const localStream = call?.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track: MediaStreamTrack) => {
      if (track.readyState === 'live') {
        track.stop();
      }
    });
  }
}

export const handleCleanup = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.isInCall);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.sessionToken);
};
 export const  getFormattedDateInTimezone = (timezone: string) => {
  const formattedDate = new Date().toLocaleString('en-US', {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  });

  // Convert the formatted date back into a Date object
  const dateInUserTimezone = new Date(new Date(formattedDate).toLocaleString('en-US', {
    timeZone: timezone,
  }));

  return dateInUserTimezone;
};


export const getSessionDetails = (session: any, timezone: string) => {
  const educatorName = `${session?.educator?.first_name || ''} ${session?.educator?.last_name || ''}`.trim();
  const studentName = `${session?.student?.first_name || ''} ${session?.student?.last_name || ''}`.trim();
  const scheduledTime = session.rescheduledAt || session?.scheduledAt || session?.rescheduled_at_start_time || session?.scheduled_at_start_time;
  const dateLabel = formatDate(scheduledTime);
  const timeLabel = formatTime(scheduledTime);

  const duration = session?.durationMin || session?.duration_min;
  
  const dateToCheck :any = new Date(new Date(scheduledTime));
  const currentTime: any = new Date(getFormattedDateInTimezone(timezone));
  const timeDifferenceInMillis = Math.abs(dateToCheck - currentTime);
  const timeDifferenceInMinutes = timeDifferenceInMillis / (1000 * 60);

  let timeDiferrenceToken = duration
  if (timeDifferenceInMinutes < duration) {
    timeDiferrenceToken = duration - timeDifferenceInMinutes
  }

  return {
    educatorName,
    studentName,
    dateLabel,
    timeLabel,
    timeDiferrenceToken
  };
}

export default getSessionDetails;

// Time utilities (moved from booking-form/time-utils)
export const baseTimeSlots = [
  "8:30am",
  "9:00am",
  "9:30am",
  "10:00am",
  "10:30am",
  "11:00am",
  "11:30am",
  "12:00pm",
  "1:00pm",
  "1:30pm",
  "2:00pm",
  "2:30pm",
  "3:00pm",
  "3:30pm",
  "4:00pm",
  "4:30pm",
];

export const timeToMinutes = (time: string): number => {
  const [timePart, period] = time.split(/(am|pm)/i);
  const [hoursStr, minutesStr] = timePart.split(":");
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  let totalMinutes = hours * 60 + minutes;
  if (period.toLowerCase() === "pm" && hours !== 12) {
    totalMinutes += 12 * 60;
  }
  if (period.toLowerCase() === "am" && hours === 12) {
    totalMinutes -= 12 * 60;
  }
  return totalMinutes;
};

export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? "pm" : "am";

  let displayHours = hours;
  if (hours > 12) {
    displayHours = hours - 12;
  } else if (hours === 0) {
    displayHours = 12;
  }

  return `${displayHours}:${mins.toString().padStart(2, "0")}${period}`;
};

export const generateTimeSlots = (duration: 30 | 60): string[] => {
  if (duration === 30) {
    return baseTimeSlots;
  }

  const slots: string[] = [];
  for (let i = 0; i < baseTimeSlots.length; i += 2) {
    const startTime = baseTimeSlots[i];
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = startMinutes + 60;

    const lastSlotMinutes = timeToMinutes(baseTimeSlots[baseTimeSlots.length - 1]);
    if (endMinutes <= lastSlotMinutes + 30) {
      slots.push(startTime);
    }
  }
  return slots;
};

// Map API availabilities (DAY_OF_WEEK strings) to readable weekday names
export function mapAvailabilitiesToWeekdays(days: string[]): string[] {
  const map: Record<string, string> = {
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
    SUNDAY: 'Sunday',
  };
  return days.map((d) => map[d] ?? d);
}

export function formatHHMMSSTo12Hour(time: string): string {
  if (!time) return '';
  // Expecting HH:mm:ss
  const [hStr, mStr] = time.split(".");
  let hours = Number(hStr);
  const minutes = Number(mStr);
  const period = hours >= 12 ? 'pm' : 'am';
  if (hours === 0) hours = 12;
  if (hours > 12) hours = hours - 12;
  return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Format date as YYYY-MM-DD in local timezone (avoid UTC shift from toISOString)
export function formatLocalYYYYMMDD(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Convert a 12-hour time like "9:30am" to 24h dotted format "09.30"
export function format12HourToHHDot(time: string): string {
  if (!time) return '';
  const match = time.match(/^(\d{1,2}):(\d{2})\s?(am|pm)$/i);
  if (!match) return '';
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3].toLowerCase();
  if (period === 'pm' && hours !== 12) hours += 12;
  if (period === 'am' && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, '0')}.${minutes}`;
}

// Get uppercase day string required by API (e.g., MONDAY)
export function getUppercaseDayOfWeek(date: Date): string {
  return date
    .toLocaleDateString('en-US', { weekday: 'long', timeZone: "America/Los_Angeles" })
    .toUpperCase();
}

// Common function to fix and parse invalid JSON string
export const parsedInput = (input: string): Record<string, number> => {
  if (!input || typeof input !== 'string') {
    console.error('Invalid session amount format');
    return {};
  }

  try {
    const validJsonString = input.replace(/(\d+):/g, '"$1":');
    return JSON.parse(validJsonString);
  } catch (error) {
    console.error('Error parsing session amount:', error);
    return {};
  }
}
// Maps tab value from Tabs to proper UserTabKey
export function getUserTabKey(value: string): UserTabKey {
  return value === '' ? 'all' : value as UserTabKey;
}
// Default pagination for a user management tab
export function defaultUserPagination(role: UserTabKey): UsersPaginationType {
  return {
    page: DEFAULT_PAGINATION.PAGE,
    limit: DEFAULT_PAGINATION.LIMIT,
    search: '',
    role: role === 'all' ? null : role.toUpperCase(),
    sortOrder: 'DESC',
  };
}
// Get count for a tab
export function getUserCountForTab(
  tab: UserTabKey,
  totalUsers: number,
  students: number,
  educators: number
) {
  return tab === 'all' ? totalUsers : tab === 'student' ? students : educators;
}


export const getUserRole = () => {
  const user = Cookies.get('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser?.role || null;
  }
  return null;
};

export const getUserDetails = () => {
  const user = Cookies.get("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser || null;
  }
  return null;
};

export const showTokenInfo = (duration: string, sessionAmount: string | Record<string, number>) => {
  const amount = typeof sessionAmount === 'string'
    ? parsedInput(sessionAmount)[duration]
    : sessionAmount[duration];

  return `${amount} tokens / ${duration} min`;
};

export const parsedTokenAmount = (sessionToken: string | Record<string, number>) => {
  const sessionAllToken = typeof sessionToken === 'string'
    ? parsedInput(sessionToken)
    : sessionToken;
  return sessionAllToken || {};
}



export const getPresignedUrl = async (selectedFile: File, toast: any) => {

  const presignedUrlRes = await getPresignedUrlAction(selectedFile);
  let file_path: string | null = null;
  let presignedUrl: string | null = null;
  if (!presignedUrlRes?.getPresignedUrlForArray?.success) {
    toast({
      title: presignedUrlRes?.getPresignedUrlForArray?.message || "Failed to get presigned url",
      description: "Please try again.",
      variant: "destructive",
    });
    return null;
  }
  if (presignedUrlRes.getPresignedUrlForArray.success) {
    file_path =
      presignedUrlRes?.getPresignedUrlForArray?.data?.[0]?.file_path;
    presignedUrl =
      presignedUrlRes?.getPresignedUrlForArray?.data?.[0]?.signedUrl;
    if (file_path && presignedUrl && selectedFile) {
      let response = await fetch(presignedUrl, {
        method: "PUT",
        body: selectedFile,
        headers: {
          "Content-Type": selectedFile.type,
        },
      });
      if (response.ok) {
        return file_path;
      } else {
        toast({
          title: "Failed to upload file",
          description: "Please try again.",
          variant: "destructive",
        });
        throw new Error("Failed to upload file");
      }
    }
    return file_path;
  }
};
