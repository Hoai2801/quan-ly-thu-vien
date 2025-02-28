package com.gdu.library_management.repository;

import com.gdu.library_management.entity.Renewal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RenewalRepository extends JpaRepository<Renewal, Long> {
}
