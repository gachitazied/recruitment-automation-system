package com.RAS.recruitment_automation_system.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationUserDetailRequest {
    @NotEmpty(message = "firstName name cannot be empty")
    @NotBlank(message = "firstName name cannot be empty")
    private String firstName;

    @NotEmpty(message = "lastName cannot be empty")
    @NotBlank(message = "lastName name cannot be empty")
    private String lastName;
    @NotEmpty(message = "phoneNumber cannot be empty")
    @NotBlank(message = "phoneNumber name cannot be empty")
    private String phoneNumber;
    @NotEmpty(message = "address cannot be empty")
    @NotBlank(message = "address name cannot be empty")
    private String address;
}
