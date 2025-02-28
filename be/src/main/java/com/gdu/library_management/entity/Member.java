package com.gdu.library_management.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "members")
public class Member {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String address;
    @Column(name = "membership_date")
    private LocalDate membershipDate;
    @Column(name = "is_active")
    private boolean isActive;
}
