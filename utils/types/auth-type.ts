export interface SignInInput {
  email: string;
  password: string;
}
export interface SignupFormType {
  firstName: string;
  lastName: string;
  email: string;
  // phone: string;
  role: string;
  platform?: string;
  active_status?: boolean;
  timezone:string
}

export interface SignUpRespose {
  signUp?: {
    success: string;
    message: string;
  };
  success?: string;
  message?: string;
}



export interface SignInResponse {
  signIn: {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      role: string;
      platform: string;
      avatar_path: string | null;
      active_status: boolean;
      created_at: string;
      updated_at: string;
      last_login_at: string | null;
      profile: {
        timezone: string;

        session_description: string | null;
        session_topic: string | null;
        specialization: string | null;
      };
    };
    accessToken: string;
    message: string;
    token: string;
    refreshToken: string;
    success: string;
  };
}
