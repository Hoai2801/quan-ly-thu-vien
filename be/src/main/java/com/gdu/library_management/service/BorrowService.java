package com.gdu.library_management.service;

import com.gdu.library_management.dto.request.CreateBorrowDTO;
import com.gdu.library_management.dto.response.BorrowResponse;
import com.gdu.library_management.entity.Book;
import com.gdu.library_management.entity.Borrow;
import com.gdu.library_management.entity.Member;
import com.gdu.library_management.entity.Renewal;
import com.gdu.library_management.repository.BookRepository;
import com.gdu.library_management.repository.BorrowRepository;
import com.gdu.library_management.repository.MemberRepository;
import com.gdu.library_management.repository.RenewalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BorrowService {
    private final BorrowRepository borrowRepository;
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;
    private final RenewalRepository renewalRepository; 
    public ResponseEntity<String> insertBorrow(CreateBorrowDTO createBorrowDTO) {
        Borrow borrow = new Borrow();
        Member member = memberRepository.findById(createBorrowDTO.getMemberId()).orElse(null);
        if (member == null) {
            return ResponseEntity.badRequest().body("Thành viên không tìm thấy");
        }
        Book book = bookRepository.findById(createBorrowDTO.getBookId()).orElse(null);
        if (book == null) {
            return ResponseEntity.badRequest().body("Không tìm thấy sách");
        }
        int borrowed = borrowRepository.countBorrowedBooks();
        int overdue = borrowRepository.countOverdueBooks();
        if (book.getCopies() - borrowed - overdue <= 0) {
            return ResponseEntity.badRequest().body("Không còn sách tồn kho"); 
        }
        borrow.setMember(member);
        borrow.setBook(book);
        borrow.setBorrowDate(LocalDate.now());
        // sẽ update khi người dùng trả lại sách
        borrow.setReturnDate(null);
        if (createBorrowDTO.getDueDate().isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest().body("Ngày trả sách không được là quá khứ");
        }
        borrow.setDueDate(createBorrowDTO.getDueDate());
        borrowRepository.save(borrow);
        return ResponseEntity.ok("success");
    }

    public List<BorrowResponse> getBorrows() {
        List<Borrow> borrows = borrowRepository.findAll();
        List<BorrowResponse> responses = new ArrayList<>();

        for (Borrow borrow : borrows) {
            BorrowResponse response = new BorrowResponse();
            response.setBorrowId(borrow.getBorrowId());
            response.setMember(borrow.getMember());
            response.setBook(borrow.getBook());
            response.setReturnDate(borrow.getReturnDate());
            response.setDueDate(borrow.getDueDate());

            // Lấy danh sách ngày gia hạn từ bảng Renewal
            List<LocalDate> renewalDates = borrow.getRenewals().stream()
                    .map(Renewal::getNewDueDate)
                    .sorted()
                    .toList();
            response.setRenewalDates(renewalDates);

            responses.add(response);
        }

        return responses;
    }

    public ResponseEntity<String> returnBook(Integer id) {
        Borrow borrow = borrowRepository.findById(id).orElse(null);
        if (borrow == null) {
            return ResponseEntity.badRequest().body("Borrow not found");
        }

        // Xóa các bản ghi gia hạn trước khi đánh dấu đã trả sách
//        renewalRepository.deleteByBorrow(borrow);

        borrow.setReturnDate(LocalDate.now());
        borrowRepository.save(borrow);
        return ResponseEntity.ok("success");
    }


    public Integer getTotalBorrowedBooks() {
        return borrowRepository.countBorrowedBooks();
    }

    public Integer getTotalOverdueBooks() {
        return borrowRepository.countOverdueBooks();
    }

    public ResponseEntity<String> updateBorrow(Integer id, CreateBorrowDTO dto) {
        Borrow borrow = borrowRepository.findById(id).orElse(null);
        if (borrow == null) {
            return ResponseEntity.badRequest().body("Borrow record not found");
        }
        Member member = memberRepository.findById(dto.getMemberId()).orElse(null);
        if (member == null) {
            return ResponseEntity.badRequest().body("Member not found");
        }
        Book book = bookRepository.findById(dto.getBookId()).orElse(null);
        if (book == null) {
            return ResponseEntity.badRequest().body("Book not found");
        }

        // Không cho phép cập nhật `dueDate` vì đã lưu trong `Renewal`
        if (dto.getReturnDate() != null && dto.getReturnDate().isBefore(borrow.getBorrowDate())) {
            return ResponseEntity.badRequest().body("Return date cannot be before borrow date.");
        }
        if (dto.getStatus().equals("BORROWED")) {
            borrow.setReturnDate(null);
        } else {
            borrow.setReturnDate(dto.getReturnDate());
        }
        borrow.setMember(member);
        borrow.setBook(book);
        borrowRepository.save(borrow);
        return ResponseEntity.ok("Updated successfully");
    }

    public List<Map<String, Object>> getBookReturnReportByMonth() {
        List<Object[]> results = borrowRepository.getBookReturnReportByMonth();
        List<Map<String, Object>> reports = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("year", row[0]);
            map.put("month", row[1]);
            map.put("returned_on_time", row[2]);
            map.put("overdue_no_renewal", row[3]);
            map.put("renewed_books", row[4]);
            reports.add(map);
        }
        System.out.println(reports);
        return reports;
    }

    public ResponseEntity<String> renewBorrow(Integer borrowId) {
        Borrow borrow = borrowRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrow record not found"));

        if (borrow.getRenewals().size() >= 3) {
            return ResponseEntity.badRequest().body("Cannot renew more than 3 times.");
        }

        if (borrow.getReturnDate() != null) {
            return ResponseEntity.badRequest().body("Cannot renew a returned book.");
        }

        LocalDate newDueDate = borrow.getDueDate().plusDays(7);

        Renewal renewal = new Renewal();
        renewal.setBorrow(borrow);
        renewal.setNewDueDate(newDueDate);
        renewalRepository.save(renewal);

        return ResponseEntity.ok("Renewal successful. New due date: " + newDueDate);
    }

}
