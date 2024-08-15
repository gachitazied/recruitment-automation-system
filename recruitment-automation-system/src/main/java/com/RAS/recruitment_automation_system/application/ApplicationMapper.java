package com.RAS.recruitment_automation_system.application;


import org.springframework.stereotype.Service;

@Service
public class ApplicationMapper {
    public Application toApplication(ApplicationRequest request) {

        return Application.builder()
                .candidateName(request.candidateName())
                .candidateEmail(request.candidateEmail())
                .resumeUrl(request.resumeUrl())
                .coverLetter(request.coverLetter())
                .status(request.status())
                .applicationDate(request.applicationDate())
                .build();
    }
    public ApplicationResponse toApplicationResponse(Application application) {

        return ApplicationResponse.builder()
                .id(application.getId())
                .candidateName(application.getCandidateName())
                .candidateEmail(application.getCandidateEmail())
                .resumeUrl(application.getResumeUrl())
                .coverLetter(application.getCoverLetter())
                .status(application.getStatus())
                .applicationDate(application.getApplicationDate())
                .jobListing(application.getJobListing())
                .build();
    }
}