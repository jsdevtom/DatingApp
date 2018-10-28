export interface AuthState {
  isAuthenticated: boolean;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginSuccessResponse {
  token: string;
}


export interface LoginFailureResponse {
  error: Error;
}

export interface SignUpDto {
  username: string;
  password: string;
}

export interface SignUpFailureResponse {
  error: Error;
}
