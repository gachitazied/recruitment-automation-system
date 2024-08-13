package com.RAS.recruitment_automation_system.joblisting;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobListingResponse {
    private int id;
    private String title;
    private String description;
    private String location;
    private String department;
    private String requirements;
    private java.sql.Date postedDate;
    private java.sql.Date closingDate;
}
