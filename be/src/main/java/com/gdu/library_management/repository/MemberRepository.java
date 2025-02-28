package com.gdu.library_management.repository;

import com.gdu.library_management.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    @Query("SELECT COUNT(m) FROM Member m WHERE m.isActive = true")
    Integer totalMembers();
}
