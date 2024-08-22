package com.RAS.recruitment_automation_system.joblisting;

import com.RAS.recruitment_automation_system.application.Application;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import java.sql.Date;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "job_listing")
public class JobListing {
    @Id
    @GeneratedValue
    private int id;
    private String title;
    private String description;
    private String location;
    private String department;
    private String requirements;
    private Date postedDate;
    private Date closingDate;

    @JsonIgnore
    @OneToMany(mappedBy = "jobListing")
    private List<Application> applications;
}
