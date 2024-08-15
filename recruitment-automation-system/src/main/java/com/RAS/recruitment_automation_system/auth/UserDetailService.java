package com.RAS.recruitment_automation_system.auth;

import com.RAS.recruitment_automation_system.user.User;
import com.RAS.recruitment_automation_system.usersDetail.UserDetail;
import com.RAS.recruitment_automation_system.usersDetail.UserDetailRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserDetailService {
   private final UserDetailRepository userDetailRepository;

    public void saveUserDetail(RegistrationUserDetailRequest request , Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        if (connectedUser == null || !connectedUser.isAuthenticated()) {
            throw new IllegalStateException("User is not authenticated");
        }
        var userDetail = UserDetail.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress())
                .user(user)
                .build();
        userDetailRepository.save(userDetail);


    }
}
