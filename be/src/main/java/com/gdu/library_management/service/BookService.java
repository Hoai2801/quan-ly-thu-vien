package com.gdu.library_management.service;

import com.gdu.library_management.dto.request.CreateBookDTO;
import com.gdu.library_management.dto.response.BookResponse;
import com.gdu.library_management.entity.Book;
import com.gdu.library_management.repository.BookRepository;
import com.gdu.library_management.repository.BorrowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final BorrowRepository borrowRepository;
    public ResponseEntity<String> insertBook(CreateBookDTO dto) {
        Book book = new Book();
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setGenre(dto.getGenre());
        book.setIsbn(dto.getIsbn());
        book.setPublisher(dto.getPublisher());
        book.setPublicationYear(dto.getPublicationYear());
        book.setCopies(dto.getCopies());
        bookRepository.save(book);
        return ResponseEntity.ok("success");
    }

    public ResponseEntity<List<BookResponse>> getBooks() {
        List<Book> books = bookRepository.findAll();
        List<BookResponse> bookResponses = books.stream().map((book) -> {
            int borrowed = borrowRepository.countBorrowedByBookId(book.getId());
            int overdue = borrowRepository.countOverdueByBookId(book.getId());
            BookResponse response = new BookResponse();
            response.setId(book.getId());
            response.setTitle(book.getTitle());
            response.setAuthor(book.getAuthor());
            response.setGenre(book.getGenre());
            response.setIsbn(book.getIsbn());
            response.setPublisher(book.getPublisher());
            response.setPublicationYear(book.getPublicationYear());
            response.setCopies(book.getCopies());
            response.setAvailableCopies(book.getCopies() - (borrowed + overdue));
            return response;
        }).toList();
        return ResponseEntity.ok(bookResponses);
    }

    public ResponseEntity<List<Book>> searchBooks(String keyword) {
        List<Book> books = bookRepository.findByTitleContaining(keyword);
        return ResponseEntity.ok(books);
    }

    public Integer getTotalBooks() {
        return Math.toIntExact(bookRepository.count());
    }

    public ResponseEntity<String> updateBook(Integer id, CreateBookDTO createBookDTO) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book == null) {
            return ResponseEntity.badRequest().body("Book record not found");
        }
        book.setTitle(createBookDTO.getTitle());
        book.setAuthor(createBookDTO.getAuthor());
        book.setGenre(createBookDTO.getGenre());
        book.setIsbn(createBookDTO.getIsbn());
        book.setPublisher(createBookDTO.getPublisher());
        book.setPublicationYear(createBookDTO.getPublicationYear().substring(0, 4));
        book.setCopies(createBookDTO.getCopies());
        bookRepository.save(book);
        return ResponseEntity.ok("Updated successfully");
    }

    public ResponseEntity<String> deleteBook(Integer id) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book == null) {
            return ResponseEntity.badRequest().body("Không tìm thấy sách");
        }
        bookRepository.delete(book);
        return ResponseEntity.ok("Deleted successfully");
    }
}
