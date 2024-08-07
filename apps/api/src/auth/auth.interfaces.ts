export interface SignUpResponse {
  id: number;
  name?: string;
  email: string;
  role: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}
