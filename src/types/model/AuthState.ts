import { AuthStatus } from '../enum/AuthStatus';

export interface AuthState {
  token: string | null;
  id: string | null;
  status: AuthStatus;
  hasLoadedOnce: boolean;
}
