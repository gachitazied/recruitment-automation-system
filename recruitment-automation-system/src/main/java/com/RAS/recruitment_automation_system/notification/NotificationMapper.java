package com.RAS.recruitment_automation_system.notification;

import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
public class NotificationMapper {
    public Notification toNotification(NotificationRequest notificationRequest) {
        return Notification.builder()
                .message(notificationRequest.message())
                .isRead(false)
                .date(Date.valueOf(LocalDate.now()))
                .build();
    }


    public NotificationResponse toNotificationResponse(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .message(notification.getMessage())
                .isRead(notification.isRead())
                .date(notification.getDate())
                .build();
    }
}
