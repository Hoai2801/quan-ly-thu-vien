package com.gdu.library_management.controller;

import com.gdu.library_management.dto.request.CreateBookDTO;
import com.gdu.library_management.dto.response.BookResponse;
import com.gdu.library_management.entity.Book;
import com.gdu.library_management.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor
@CrossOrigin
public class BookController {
    private final BookService bookService;
    
    @GetMapping
    ResponseEntity<List<BookResponse>> getBooks() {
        return bookService.getBooks();
    }
    
    @PostMapping
    ResponseEntity<String> insertBook(@RequestBody CreateBookDTO createBookDTO) {
        return bookService.insertBook(createBookDTO);
    }
    
    @GetMapping("/search")
    ResponseEntity<List<Book>> searchBooks(@RequestParam String keyword) {
        return bookService.searchBooks(keyword);
    }
    
    @GetMapping("/total")
    ResponseEntity<Integer> getTotalBooks() {
        return ResponseEntity.ok(bookService.getTotalBooks());
    }
    
    @PutMapping("/{id}")
    ResponseEntity<String> updateBook(@PathVariable Integer id, @RequestBody CreateBookDTO createBookDTO) {
        return bookService.updateBook(id, createBookDTO);
    }
    
    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteBook(@PathVariable Integer id) {
        return bookService.deleteBook(id);
    }
}
