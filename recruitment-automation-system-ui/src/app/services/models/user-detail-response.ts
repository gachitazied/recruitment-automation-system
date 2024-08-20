/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface UserDetailResponse {
  address?: string;
  email?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  phoneNumber?: string;
  user?: User;
  username?: string;
}
