export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface RegisterRequestDto {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
