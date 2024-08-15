package com.RAS.recruitment_automation_system.joblisting;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

public record JobListingRequest(
        Integer id,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String title,
        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String description,
        @NotNull(message = "102")
        @NotEmpty(message = "102")
        String location,
        @NotNull(message = "103")
        @NotEmpty(message = "103")
        String department,
        @NotNull(message = "104")
        @NotEmpty(message = "104")
        String requirements,

        Date postedDate,
        Date closingDate
) {

}
