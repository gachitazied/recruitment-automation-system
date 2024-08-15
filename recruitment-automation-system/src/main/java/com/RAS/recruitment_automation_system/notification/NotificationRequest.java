package com.RAS.recruitment_automation_system.notification;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

public record NotificationRequest(

         int id,
         @NotNull(message = "100")
         @NotEmpty(message = "100")
         String message,
         @NotNull(message = "101")
         @NotEmpty(message = "101")
         boolean isRead,
         Date date

) {
}
