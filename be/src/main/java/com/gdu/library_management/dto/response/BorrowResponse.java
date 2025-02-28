package com.gdu.library_management.dto.response;

import com.gdu.library_management.entity.Book;
import com.gdu.library_management.entity.Member;
import lombok.Data;

import java.time.LocalDate;

import java.util.List;

@Data
public class BorrowResponse {
    private Integer borrowId;
    private Book book;
    private Member member;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private List<LocalDate> renewalDates; // Danh sách ngày gia hạn

    public String getStatus() {
        LocalDate latestDueDate = dueDate;
        if (!renewalDates.isEmpty()) {
            latestDueDate = renewalDates.getLast(); // Lấy ngày gia hạn mới nhất
        }

        if (returnDate != null) {
            return "RETURNED";
        } else if (LocalDate.now().isAfter(latestDueDate)) {
            return "OVERDUE";
        } else {
            return "BORROWED";
        }
    }
}

