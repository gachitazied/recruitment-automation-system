package com.RAS.recruitment_automation_system.joblisting;

import com.RAS.recruitment_automation_system.common.PageResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public Integer createJobListing(JobListingRequest request) {
        JobListing jobListing = jobListingMapper.toJobListing(request);

        return jobListingRepository.save(jobListing).getId();
    }

    public PageResponse<JobListingResponse> findAllJobs(int page, int size) {
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

    public PageResponse<JobListingResponse> findJobsById(int jobId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("postedDate").descending());
        Page<JobListing> jobListingPage = jobListingRepository.findAllByJobId(jobId, pageable);
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


    public void updateJobListingById(Integer jobId, JobListingRequest request) {
        JobListing jobListing = jobListingRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job listing not found"));
        jobListing.setTitle(request.title());
        jobListing.setDescription(request.description());
        jobListing.setLocation(request.location());
        jobListing.setDepartment(request.department());
        jobListing.setRequirements(request.requirements());
        jobListing.setClosingDate(request.postedDate());
        jobListing.setPostedDate(request.closingDate());
        jobListingRepository.save(jobListing);

    }

    public void deleteJobListingById(Integer jobId) {

        jobListingRepository.deleteById(jobId);
    }

    public PageResponse<JobListingResponse> searchJobsByTitle(String title, int page, int size, String sort) {
        Pageable pageable;
        if ("oldest".equalsIgnoreCase(sort)) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "postedDate"));
        } else {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "postedDate"));
        }
        Page<JobListing> jobPage = jobListingRepository.findByTitleContainingIgnoreCase(title, pageable);
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


    public Map<Date, Long> getJobStatisticsByDate() {

        List<JobListing> jobListings = jobListingRepository.findAll();
        return jobListings.stream()
                .collect(Collectors.groupingBy(JobListing::getPostedDate, Collectors.counting()));
    }
}
