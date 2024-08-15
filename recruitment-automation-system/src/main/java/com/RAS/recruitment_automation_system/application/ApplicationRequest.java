package com.RAS.recruitment_automation_system.application;

import com.RAS.recruitment_automation_system.joblisting.JobListing;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

public record ApplicationRequest(
        Integer id,


        String candidateName,


        String candidateEmail,


        String resumeUrl,


        String coverLetter,


        String status,


        Date applicationDate,

        JobListing jobListing

) {

    public JobListing getJobListingId() {
        return jobListing;
    }
}