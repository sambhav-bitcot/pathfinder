export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  active_status: boolean;
  avatar_path: string | null;
  created_at: string;
  phone?: string;
  platform?: string;
  profile?: {
    session_description: string;
    session_topic: string;
    specialization?: string;
    timezone?: string;
  } ;
}

export interface UpdateUserType {
  updateUserId: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  platform?: string;
  avatar_path?: string;
}

export interface TokenResponse {
  gettoken: {
    message: string;
    success: string;
    tokenBalance: number;
  };
}