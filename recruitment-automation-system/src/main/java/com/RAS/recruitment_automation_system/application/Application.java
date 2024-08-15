package com.RAS.recruitment_automation_system.application;

import com.RAS.recruitment_automation_system.joblisting.JobListing;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Date;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "application")
public class Application {
    @Id
    @GeneratedValue
    private int id;
    @ManyToOne
    @JoinColumn(name = "jobId", nullable = false)
    private JobListing jobListing;
    private String candidateName;
    private String candidateEmail;
    private String resumeUrl;
    private String coverLetter;
    private String status;
    private Date applicationDate;
}
