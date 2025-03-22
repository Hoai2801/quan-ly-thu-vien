package com.gdu.library_management.controller;

import com.gdu.library_management.dto.request.CreateBorrowDTO;
import com.gdu.library_management.dto.response.BorrowResponse;
import com.gdu.library_management.entity.Borrow;
import com.gdu.library_management.entity.Renewal;
import com.gdu.library_management.service.BorrowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/borrow")
@CrossOrigin
public class BorrowController {
    private final BorrowService borrowService;
    
    @PostMapping
    public ResponseEntity<String> insertBorrow(@RequestBody CreateBorrowDTO createBorrowDTO) {
        return borrowService.insertBorrow(createBorrowDTO);
    }
    
    @GetMapping
    public ResponseEntity<List<BorrowResponse>> getBorrows() {
        return ResponseEntity.ok(borrowService.getBorrows());
    }
    
    @PutMapping("/return/{id}")
    public ResponseEntity<String> returnBook(@PathVariable Integer id) {
        return borrowService.returnBook(id);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<String> updateBorrow(@PathVariable Integer id, @RequestBody CreateBorrowDTO createBorrowDTO) {
        System.out.println(id);
        System.out.println(createBorrowDTO);
        return borrowService.updateBorrow(id, createBorrowDTO);
    }
    
    @GetMapping("/total/borrowed")
    public ResponseEntity<Integer> getTotalBorrowedBooks() {
        return ResponseEntity.ok(borrowService.getTotalBorrowedBooks());
    }
    
    @GetMapping("/total/overdue")
    public ResponseEntity<Integer> getTotalOverdueBooks() {
        return ResponseEntity.ok(borrowService.getTotalOverdueBooks());
    }
    
//    @GetMapping("/report")
//    ResponseEntity<List<Map<String, Object>>> getMonthlyReport(@RequestParam int year) {
//        return ResponseEntity.ok(borrowService.getMonthlyBorrowReport(year));
//    }

    @GetMapping("/report")
    public ResponseEntity<List<Map<String, Object>>> getBookReturnReportByMonth() {
        return ResponseEntity.ok(borrowService.getBookReturnReportByMonth());
    }

    @PostMapping("/renew/{borrowId}")
    public ResponseEntity<String> renewBorrow(@PathVariable Integer borrowId) {
        return borrowService.renewBorrow(borrowId);
    }

}
