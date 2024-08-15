package com.RAS.recruitment_automation_system.usersDetail;

import com.RAS.recruitment_automation_system.user.User;
import org.springframework.stereotype.Service;

@Service
public class UserDetailMapper {

    public UserDetail toUserDetail(UserDetailRequest request) {

        return UserDetail.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .phoneNumber(request.phoneNumber())
                .address(request.address())
                .build();
    }

    public UserDetailResponse toUserDetailResponse(UserDetail userDetail) {

        return UserDetailResponse.builder()
                .id(userDetail.getId())
                .firstName(userDetail.getFirstName())
                .lastName(userDetail.getLastName())
                .phoneNumber(userDetail.getPhoneNumber())
                .address(userDetail.getAddress())
                .build();
    }

    public UserDetailResponse toUserDetailAndUserResponse(UserDetail userDetail, User user) {
        return UserDetailResponse.builder()
                .id(userDetail.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .firstName(userDetail.getFirstName())
                .lastName(userDetail.getLastName())
                .phoneNumber(userDetail.getPhoneNumber())
                .address(userDetail.getAddress())
                .user(user)
                .build();
    }

}
