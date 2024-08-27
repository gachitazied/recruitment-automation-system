/* tslint:disable */
/* eslint-disable */
import { NotificationResponse } from '../models/notification-response';
export interface PageResponseNotificationResponse {
  content?: Array<NotificationResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
