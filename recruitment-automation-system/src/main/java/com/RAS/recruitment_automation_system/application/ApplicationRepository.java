package com.RAS.recruitment_automation_system.application;

import com.RAS.recruitment_automation_system.joblisting.JobListing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ApplicationRepository extends JpaRepository<Application,Integer> , JpaSpecificationExecutor<Application> {

    @Query("""
SELECT a
FROM Application a
WHERE a.id = :appId
AND a.owner.id = :id
""")
    Page<Application> findAllByAppId(@Param("appId") int appId, Pageable pageable, int id);

    @Query("SELECT COUNT(a) FROM Application a JOIN JobListing j ON a.jobListing.id = j.id WHERE j.owner.id = :id AND a.status = :status")
    long countByStatusAndOwnerId(@Param("status") String status, @Param("id") int id);

    @Query("""
SELECT a
FROM Application a
WHERE a.owner.id = :id
""")
    Page<Application> findAllwithIdowner(Pageable pageable, int id);

    @Query("""
SELECT a
FROM Application a
JOIN JobListing j ON a.jobListing.id = j.id
WHERE j.owner.id = :id
""")
    Page<Application> findAllwithIdownerJoinJobsListing(Pageable pageable,@Param("id") int id);
}