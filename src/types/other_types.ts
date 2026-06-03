// Credentials required for logging in
export interface LoginCredentials {
    email: string;
    password:  string;
  }
  
  // User roles allowed in the system
  export type UserRole = "candidate" | "recruiter";
  
  // Complete profile information of the user
  export interface UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    createdAt: string;
  }
  
  // Response returned upon a successful authentication/login
  export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: UserProfile;
  }