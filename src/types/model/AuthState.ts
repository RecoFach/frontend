import { AuthStatus } from '../enum/AuthStatus';

export interface AuthState {
  token: string;
  id: string;
  status: AuthStatus;
  hasLoadedOnce: boolean;
}
