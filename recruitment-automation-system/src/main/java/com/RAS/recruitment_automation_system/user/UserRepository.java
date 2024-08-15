package com.RAS.recruitment_automation_system.user;

import com.RAS.recruitment_automation_system.usersDetail.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> , JpaSpecificationExecutor<User> {

    Optional<User> findByEmail(String email);

}