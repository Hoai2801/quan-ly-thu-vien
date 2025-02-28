package com.gdu.library_management.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "borrow_records")
@Data
public class Borrow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer borrowId;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(name = "borrow_date", nullable = false)
    private LocalDate borrowDate = LocalDate.now();

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @OneToMany(mappedBy = "borrow", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Renewal> renewals = new ArrayList<>();
}


