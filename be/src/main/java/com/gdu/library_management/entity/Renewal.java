package com.gdu.library_management.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "renewals")
@Data
public class Renewal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer renewalId;

    @ManyToOne
    @JoinColumn(name = "borrow_id", nullable = false)
    private Borrow borrow;

    @Column(name = "renewal_date", nullable = false)
    private LocalDate renewalDate = LocalDate.now();

    @Column(name = "new_due_date", nullable = false)
    private LocalDate newDueDate;
}
