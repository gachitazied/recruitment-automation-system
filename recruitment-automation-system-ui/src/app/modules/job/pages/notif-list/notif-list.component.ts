import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "../../../../services/services/notification.service";
import {PageResponseNotificationResponse} from "../../../../services/models/page-response-notification-response";

@Component({
  selector: 'app-notif-list',
  templateUrl: './notif-list.component.html',
  styleUrls: ['./notif-list.component.css']
})
export class NotifListComponent implements OnInit {

  NotificationResponse: PageResponseNotificationResponse  = {};
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';
  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {
  }
  private findAllNotifications() {
    this.notificationService.findAllNotifications({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (notifications) => {
        this.NotificationResponse = notifications;
      },
      error: (error) => {
        console.log('Error occurred:', error);
      }
    })
  }

  ngOnInit(): void {

    this.findAllNotifications();
  }
  gotToPage(page: number) {
    this.page = page;
    this.findAllNotifications();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllNotifications();  }

  goToPreviousPage() {
    this.page --;
    this.findAllNotifications();  }

  goToLastPage() {
    this.page = this.NotificationResponse.totalPages as number - 1;
    this.findAllNotifications();  }

  goToNextPage() {
    this.page++;
    this.findAllNotifications();  }

  get isLastPage() {
    return this.page === this.NotificationResponse.totalPages as number - 1;
  }

}
