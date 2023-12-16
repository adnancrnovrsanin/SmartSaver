export interface User {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface RegisterRequestDto {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
