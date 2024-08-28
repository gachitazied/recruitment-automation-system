package com.RAS.recruitment_automation_system.application;


import com.RAS.recruitment_automation_system.common.PageResponse;

import com.RAS.recruitment_automation_system.email.EmailService;
import com.RAS.recruitment_automation_system.notification.NotificationMapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/app")
@RequiredArgsConstructor
@Tag(name = "application")
public class ApplicationController {
    private final ApplicationService applicationService;
    public final NotificationMapper notificationMapper;
    private final EmailService emailService;


    @PostMapping("/create/{jobId}")
    public ResponseEntity<Integer> createApplication(
            @PathVariable Integer jobId,
            @Valid @RequestBody ApplicationRequest request,
            Authentication connectedUser
    ) {

        return ResponseEntity.ok(applicationService.createApplication(jobId, request, connectedUser));
    }



    @GetMapping("/find/all")
    public ResponseEntity<PageResponse<ApplicationResponse>> findAllApplication(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(applicationService.findAllApplication(page, size, connectedUser));
    }
    @GetMapping("/find/allforRecruiter")
    public ResponseEntity<PageResponse<ApplicationResponse>> findAllApplicationforRecruiter(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(applicationService.findAllApplicationforRecruiter(page, size, connectedUser));
    }

    @GetMapping("/find/{appId}")
    public ResponseEntity<PageResponse<ApplicationResponse>> findApplicationById(
            @PathVariable("appId") Integer appId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    )
    {
        PageResponse<ApplicationResponse> response = applicationService.findApplicationById(appId, page, size, connectedUser);

        if (response.getContent().isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.ok(response);
    }
    @PatchMapping("/update/{appId}")
    public ResponseEntity<Void> updateApplicationById(
            @PathVariable("appId") Integer appId,
            @Valid @RequestBody ApplicationRequest request, Authentication connectedUser
    ) {
        applicationService.updateApplicationById(appId, request, connectedUser);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/delete/{appId}")
    public ResponseEntity<Void> deleteApplicationById(
            @PathVariable("appId") Integer appId
    ) {
        applicationService.deleteApplicationById(appId);
        return ResponseEntity.noContent().build();
    }
    @PatchMapping("/UpdateStatus/{appId}")
    public ResponseEntity<Void> UpdateCandidateStatus(
            @PathVariable("appId") Integer appId,
            @RequestBody String status
    ) {
        applicationService.updateCandidateStatus(appId, status);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status-stats")
    public ResponseEntity<Map<String, Long>> getStatusStats(Authentication connectedUser) {
        Map<String, Long> stats = applicationService.getStatusCounts(connectedUser);
        return ResponseEntity.ok(stats);
    }

}