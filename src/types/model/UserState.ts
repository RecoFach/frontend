import { UserStatus } from '../enum/UserStatus';
import { User } from './User';

export interface UserState {
  status: UserStatus;
  profile: User | null;
}
