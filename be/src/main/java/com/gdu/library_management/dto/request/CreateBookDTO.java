package com.gdu.library_management.dto.request;

import lombok.Data;

@Data
public class CreateBookDTO {
    private String title;
    private String author;
    private String genre;
    private String isbn;
    private String publisher;
    private String publicationYear;
    private int copies;
}
