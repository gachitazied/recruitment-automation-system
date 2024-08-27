package com.RAS.recruitment_automation_system.joblisting;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobListingRepository extends JpaRepository<JobListing,Integer>, JpaSpecificationExecutor<JobListing> {

    @Query("""
SELECT j
FROM JobListing j
WHERE j.id = :jobId
AND j.owner.id = :id
""")
    Page<JobListing> findAllByJobId(@Param("jobId") int jobId, Pageable pageable, int id);



   @Query("""
SELECT j
FROM JobListing j
WHERE j.owner.id = :id
""")
    Page<JobListing> findAllwithOwner(Pageable pageable, int id);

    @Query("""
SELECT j
FROM JobListing j
WHERE j.id = :jobId
AND j.owner.id = :id
""")
    JobListing findByJobIdAndOwner(@Param("jobId") int jobId, int id);


    @Query("""
    select j
    from JobListing j
    where j.owner.id = :id
    """)
    List<JobListing> findAllwithOwner(int id);


    @Query("""
SELECT j
FROM JobListing j
WHERE j.owner.id = :id
ORDER BY j.postedDate DESC
""")
    Page<JobListing> findJobsSortedByPostedDateDesc(Pageable pageable, int id);
    @Query("""
SELECT j
FROM JobListing j
WHERE j.owner.id = :id
ORDER BY j.postedDate ASC
""")
    Page<JobListing> findJobsSortedByPostedDateAsc(Pageable pageable, int id);

@Query("""
SELECT j    
FROM JobListing j
WHERE j.owner.id = :id
AND j.title LIKE %:title%
""")
    Page<JobListing> findByTitleContainingIgnoreCase(Pageable pageable, String title, int id);

    Page<JobListing> findByTitleContaining(String title, Pageable pageable);
}
