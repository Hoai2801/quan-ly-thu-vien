package com.gdu.library_management.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Integer id;
    private String title;
    private String author;
    private String genre;
    private String isbn;
    private String publisher;
    @Column(name = "published_year")
    private String publicationYear;
    @Column(name = "total_copies")
    private int copies;
}
