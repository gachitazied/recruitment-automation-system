package com.RAS.recruitment_automation_system.usersDetail;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDetailRepository extends JpaRepository<UserDetail, Integer> {
    Optional<UserDetail> findByPhoneNumber(String phoneNumber);
}
