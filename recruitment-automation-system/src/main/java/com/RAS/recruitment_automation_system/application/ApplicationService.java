package com.RAS.recruitment_automation_system.application;

import com.RAS.recruitment_automation_system.common.PageResponse;
import com.RAS.recruitment_automation_system.joblisting.JobListing;
import com.RAS.recruitment_automation_system.joblisting.JobListingRepository;
import com.RAS.recruitment_automation_system.joblisting.JobListingRequest;
import com.RAS.recruitment_automation_system.joblisting.JobListingResponse;
import com.RAS.recruitment_automation_system.user.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.core.ApplicationMapping;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;
    private final JobListingRepository jobListingRepository;



    public PageResponse<ApplicationResponse> findAllApplication(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("applicationDate").descending());
        Page<Application> applicationPage = applicationRepository.findAllwithIdowner(pageable, user.getId());
        List<ApplicationResponse> applicationResponses = applicationPage
                .stream()
                .map(applicationMapper::toApplicationResponse)
                .toList();

        return new PageResponse<>(
                applicationResponses,
                applicationPage.getNumber(),
                applicationPage.getSize(),
                applicationPage.getTotalElements(),
                applicationPage.getTotalPages(),
                applicationPage.isFirst(),
                applicationPage.isLast()
        );
    }
    public PageResponse<ApplicationResponse> findApplicationById(int appId, int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("applicationDate").descending());
        Page<Application> applicationPage = applicationRepository.findAllByAppId(appId, pageable, user.getId());
        List<ApplicationResponse> applicationResponses = applicationPage
                .stream()
                .map(applicationMapper::toApplicationResponse)
                .toList();

        return new PageResponse<>(
                applicationResponses,
                applicationPage.getNumber(),
                applicationPage.getSize(),
                applicationPage.getTotalElements(),
                applicationPage.getTotalPages(),
                applicationPage.isFirst(),
                applicationPage.isLast()
        );
    }
    public void updateApplicationById(Integer appId, ApplicationRequest request, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();

        Application application = applicationRepository.findById(appId)
                .orElseThrow(() -> new RuntimeException("application not found"));
        application.setCandidateName(request.candidateName());
        application.setCandidateEmail(request.candidateEmail());
        application.setResumeUrl(request.resumeUrl());
        application.setCoverLetter(request.coverLetter());
        application.setStatus(request.status());
        application.setApplicationDate(request.applicationDate());
        application.setOwner(user);
        application.setJobListing(jobListingRepository.findById(request.jobId()).get());
        applicationRepository.save(application);

    }
    public void deleteApplicationById(Integer appId) {

        applicationRepository.deleteById(appId);
    }
    public void updateCandidateStatus(Integer appId, String status) {
        Application application = applicationRepository.findById(appId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus(status);
        applicationRepository.save(application);
    }



    public Integer createApplication(Integer jobId, ApplicationRequest request, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        JobListing jobListing = jobListingRepository.findById(jobId).get();
        Application application = new Application();
        application.setCandidateName(request.candidateName());
        application.setCandidateEmail(request.candidateEmail());
        application.setResumeUrl(request.resumeUrl());
        application.setCoverLetter(request.coverLetter());
        application.setStatus(request.status());
        application.setApplicationDate(Date.valueOf(LocalDate.now()));
        application.setJobListing(jobListing);
        application.setOwner(user);
        applicationRepository.save(application);
        return application.getId();
    }

    public Map<String, Long> getStatusCounts(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Map<String, Long> statusCounts = new HashMap<>();
        statusCounts.put("Reviewed", applicationRepository.countByStatusAndOwnerId("Reviewed", user.getId()));
        statusCounts.put("Interviewed", applicationRepository.countByStatusAndOwnerId("Interviewed", user.getId()));
        statusCounts.put("Accepted", applicationRepository.countByStatusAndOwnerId("Accepted", user.getId()));
        statusCounts.put("Rejected", applicationRepository.countByStatusAndOwnerId("Rejected", user.getId()));
        return statusCounts;
    }

    public PageResponse<ApplicationResponse> findAllApplicationforRecruiter(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("applicationDate").descending());
        Page<Application> applicationPage = applicationRepository.findAllwithIdownerJoinJobsListing(pageable, user.getId());
        List<ApplicationResponse> applicationResponses = applicationPage
                .stream()
                .map(applicationMapper::toApplicationResponse)
                .toList();

        return new PageResponse<>(
                applicationResponses,
                applicationPage.getNumber(),
                applicationPage.getSize(),
                applicationPage.getTotalElements(),
                applicationPage.getTotalPages(),
                applicationPage.isFirst(),
                applicationPage.isLast()
        );
    }
}