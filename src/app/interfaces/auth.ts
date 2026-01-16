export interface Auth {
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;

}  

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AccessToken {
  userid: number;
  email: string;
  role: string;
}