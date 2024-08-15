package com.RAS.recruitment_automation_system.notification;

import com.RAS.recruitment_automation_system.user.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificationService{
    public final NotificationRepository notificationRepository;
    public final NotificationMapper notificationMapper;


    public Integer createNotification(NotificationRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Notification notification = notificationMapper.toNotification(request);
        notification.setUser(user);
        notificationRepository.save(notification);
        return notification.getId();
    }

    public NotificationResponse findAllNotifications(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Notification notification = notificationRepository.findNotificationById(user.getId()).get();
        return notificationMapper.toNotificationResponse(notification);
    }


    public NotificationResponse findNotificationById(Integer notifId) {
        return notificationRepository
                .findNotificationById(notifId)
                .map(notificationMapper::toNotificationResponse)
                .orElseThrow(() -> new EntityNotFoundException("No Notification found with ID:: " + notifId));
    }


    public NotificationResponse updateIsRead(Integer notifId) {
        Notification notification = notificationRepository
                .findNotificationById(notifId)
                .orElseThrow(() -> new EntityNotFoundException("No Notification found with ID:: " + notifId));
        notification.setRead(true);
        notificationRepository.save(notification);
        return notificationMapper.toNotificationResponse(notification);
    }

    public void deleteNotification(Integer notifId) {
        notificationRepository
                .findNotificationById(notifId)
                .ifPresent(notificationRepository::delete);
    }


}
