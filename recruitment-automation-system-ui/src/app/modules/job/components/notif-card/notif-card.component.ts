import { Component, Input } from '@angular/core';
import { NotificationResponse } from "../../../../services/models/notification-response";
import { NotificationService } from "../../../../services/services/notification.service";
import {DeleteNotification$Params} from "../../../../services/fn/notification/delete-notification";

@Component({
  selector: 'app-notif-card',
  templateUrl: './notif-card.component.html',
  styleUrls: ['./notif-card.component.css']
})
export class NotifCardComponent {
  @Input() notif: NotificationResponse = {};

  constructor(private notificationService: NotificationService) {}

  markAsRead(): void {
    if (this.notif.id !== undefined) {
      this.notificationService.updateIsRead({ NotifId: this.notif.id }).subscribe(
        () => {
          this.notif.read = true;
        },
        error => {
          console.error('Error marking notification as read', error);
        }
      );
    } else {
      console.error('Notification ID is undefined');
    }
  }

  deleteNotif(): void {
    if (this.notif.id) {
      const params: DeleteNotification$Params = { NotifId: this.notif.id };
      this.notificationService.deleteNotification(params).subscribe(
        () => {
          window.location.reload();
          console.log('Notification deleted successfully');
        },
        error => {
          console.error('Error deleting notification', error);
        }
      );
    }
  }
}
