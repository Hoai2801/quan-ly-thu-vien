package com.gdu.library_management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponse {
    private Integer id;
    private String title;
    private String author;
    private String genre;
    private String isbn;
    private String publisher;
    private String publicationYear;
    private int copies;
    private int availableCopies;
}
