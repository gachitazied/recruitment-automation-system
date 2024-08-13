package com.RAS.recruitment_automation_system.auth;

import com.RAS.recruitment_automation_system.user.User;
import jakarta.persistence.*;

public class UserDetailResponse {

    private Long id;
    private User user;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
}
