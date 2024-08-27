package com.RAS.recruitment_automation_system.joblisting;

import com.RAS.recruitment_automation_system.common.PageResponse;
import com.RAS.recruitment_automation_system.user.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class JobListingService {
    private final JobListingRepository jobListingRepository;

    private final JobListingMapper jobListingMapper;
    public Integer createJobListing(JobListingRequest request , Authentication connectedUser) {

        User user = ((User) connectedUser.getPrincipal());
        JobListing jobListing = jobListingMapper.toJobListing(request);
        jobListing.setOwner(user);
        return jobListingRepository.save(jobListing).getId();
    }

    public PageResponse<JobListingResponse> findAllJobs(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("postedDate").descending());
        Page<JobListing> jobListingPage = jobListingRepository.findAllwithOwner(pageable , user.getId());
        List<JobListingResponse> jobListingResponses = jobListingPage
                .stream()
                .map(jobListingMapper::toJobListingResponse)
                .toList();

        return new PageResponse<>(
                jobListingResponses,
                jobListingPage.getNumber(),
                jobListingPage.getSize(),
                jobListingPage.getTotalElements(),
                jobListingPage.getTotalPages(),
                jobListingPage.isFirst(),
                jobListingPage.isLast()
        );
    }

    public PageResponse<JobListingResponse> findJobsById(int jobId, int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("postedDate").descending());
        Page<JobListing> jobListingPage = jobListingRepository.findAllByJobId(jobId, pageable, user.getId());
        List<JobListingResponse> jobListingResponses = jobListingPage
                .stream()
                .map(jobListingMapper::toJobListingResponse)
                .toList();

        return new PageResponse<>(
                jobListingResponses,
                jobListingPage.getNumber(),
                jobListingPage.getSize(),
                jobListingPage.getTotalElements(),
                jobListingPage.getTotalPages(),
                jobListingPage.isFirst(),
                jobListingPage.isLast()
        );
    }


    public void updateJobListingById(Integer jobId, JobListingRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());


        JobListing jobListing = jobListingRepository.findByJobIdAndOwner(jobId, user.getId());
        if (jobListing == null) {
            throw new IllegalArgumentException("Job listing not found" + jobId);
        }


        jobListing.setTitle(request.title());
        jobListing.setDescription(request.description());
        jobListing.setLocation(request.location());
        jobListing.setDepartment(request.department());
        jobListing.setRequirements(request.requirements());
        jobListing.setClosingDate(request.postedDate());
        jobListing.setPostedDate(request.closingDate());
        jobListingRepository.save(jobListing);

    }

    public void deleteJobListingById(Integer jobId){
        jobListingRepository.deleteById(jobId);
    }

    public PageResponse<JobListingResponse> searchJobsByTitle(String title, int page, int size, String sort, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size);

        Page<JobListing> jobPage;
        if ("oldest".equalsIgnoreCase(sort)) {
            jobPage = jobListingRepository.findJobsSortedByPostedDateDesc(pageable, user.getId());
        } else {
            jobPage = jobListingRepository.findJobsSortedByPostedDateAsc(pageable, user.getId());
        }

        jobPage = jobListingRepository.findByTitleContainingIgnoreCase(pageable, title, user.getId());

        List<JobListingResponse> jobResponses = jobPage.stream()
                .map(jobListingMapper::toJobListingResponse)
                .collect(Collectors.toList());

        return new PageResponse<>(
                jobResponses,
                jobPage.getNumber(),
                jobPage.getSize(),
                jobPage.getTotalElements(),
                jobPage.getTotalPages(),
                jobPage.isFirst(),
                jobPage.isLast()
        );

    }
    public PageResponse<JobListingResponse> searchJobsForCandidate(String title, int page, int size, String sort) {

        Pageable pageable;
        if ("oldest".equalsIgnoreCase(sort)) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "postedDate"));
        } else {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "postedDate"));
        }
        Page<JobListing> jobPage = jobListingRepository.findByTitleContaining(title, pageable);
        List<JobListingResponse> jobResponses = jobPage.stream()
                .map(jobListingMapper::toJobListingResponse)
                .collect(Collectors.toList());

        return new PageResponse<>(
                jobResponses,
                jobPage.getNumber(),
                jobPage.getSize(),
                jobPage.getTotalElements(),
                jobPage.getTotalPages(),
                jobPage.isFirst(),
                jobPage.isLast()
        );

    }



    public Map<Date, Long> getJobStatisticsByDate(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());

        List<JobListing> jobListings = jobListingRepository.findAllwithOwner(user.getId());
        return jobListings.stream()
                .collect(Collectors.groupingBy(JobListing::getPostedDate, Collectors.counting()));
    }

    public PageResponse<JobListingResponse> findAllJobsforCondidate(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("postedDate").descending());
        Page<JobListing> jobListingPage = jobListingRepository.findAll(pageable);
        List<JobListingResponse> jobListingResponses = jobListingPage
                .stream()
                .map(jobListingMapper::toJobListingResponse)
                .toList();

        return new PageResponse<>(
                jobListingResponses,
                jobListingPage.getNumber(),
                jobListingPage.getSize(),
                jobListingPage.getTotalElements(),
                jobListingPage.getTotalPages(),
                jobListingPage.isFirst(),
                jobListingPage.isLast()
        );
    }
}
