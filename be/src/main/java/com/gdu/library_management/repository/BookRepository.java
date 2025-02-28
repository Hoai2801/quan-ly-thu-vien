package com.gdu.library_management.repository;

import com.gdu.library_management.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("SELECT b FROM Book b WHERE b.title LIKE %?1%")
    List<Book> findByTitleContaining(String keyword);
}
