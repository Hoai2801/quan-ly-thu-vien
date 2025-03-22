package com.gdu.library_management.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateBorrowDTO {
    private Integer bookId;
    private Integer memberId;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private String status;
}
