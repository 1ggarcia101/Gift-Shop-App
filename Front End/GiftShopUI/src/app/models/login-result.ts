import { LoginStatus } from './login-status';

export interface LoginResult {
  status: string;
  loginStatus: LoginStatus;
  token: string;
  refreshToken: string;
}
