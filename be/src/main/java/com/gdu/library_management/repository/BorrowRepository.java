package com.gdu.library_management.repository;

import com.gdu.library_management.entity.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowRepository extends JpaRepository<Borrow, Integer> {

//    @Query("SELECT MONTH(b.borrowDate), COUNT(b) FROM Borrow b WHERE YEAR(b.borrowDate) = :year GROUP BY MONTH(b.borrowDate) ORDER BY MONTH(b.borrowDate)")
//    List<Object[]> countBorrowsPerMonth(int year);

    @Query(value = """
                SELECT 
                    YEAR(br.due_date) AS year,
                    MONTH(br.due_date) AS month,

                    -- Số sách trả đúng hạn
                    SUM(CASE 
                        WHEN br.return_date IS NOT NULL 
                             AND br.return_date <= br.due_date 
                        THEN 1 ELSE 0 
                    END) AS returned_on_time,

                    -- Số sách quá hạn nhưng KHÔNG gia hạn
                    SUM(CASE 
                        WHEN (
                            (br.return_date IS NOT NULL AND br.return_date > br.due_date)  -- Đã trả nhưng muộn
                            OR (br.return_date IS NULL AND br.due_date < CURRENT_DATE)  -- Chưa trả và đã quá hạn
                        ) 
                        AND NOT EXISTS (
                            SELECT 1 FROM renewals r WHERE r.borrow_id = br.borrow_id
                        )
                        THEN 1 ELSE 0 
                    END) AS overdue_no_renewal,

                    -- Số sách đã gia hạn trước khi trả
                    SUM(CASE 
                        WHEN (
                            SELECT MAX(r.new_due_date) FROM renewals r 
                            WHERE r.borrow_id = br.borrow_id
                        ) > br.due_date 
                        AND (br.return_date IS NULL OR br.return_date > br.due_date)
                        THEN 1 ELSE 0 
                    END) AS renewed_books

                FROM borrow_records br
                GROUP BY YEAR(br.due_date), MONTH(br.due_date)
                ORDER BY YEAR(br.due_date), MONTH(br.due_date);
            """, nativeQuery = true)
    List<Object[]> getBookReturnReportByMonth();

    @Query("SELECT COUNT(b) FROM Borrow b WHERE b.returnDate IS NULL AND b.dueDate >= CURRENT_DATE")
    Integer countBorrowedBooks();

    @Query(value = """
                SELECT COUNT(*) FROM borrow_records b
                LEFT JOIN renewals r ON b.borrow_id = r.borrow_id
                WHERE b.return_date IS NULL
                AND (
                    SELECT COALESCE(MAX(r.new_due_date), b.due_date)
                    FROM renewals r WHERE r.borrow_id = b.borrow_id
                ) < CURRENT_DATE
            """, nativeQuery = true)
    Integer countOverdueBooks();


    @Query("SELECT COUNT(b) FROM Borrow b WHERE b.book.id = :id AND b.returnDate IS NULL AND b.dueDate > CURRENT_DATE")
    int countBorrowedByBookId(Integer id);

    @Query(value = """
                SELECT COUNT(*) FROM borrow_records b
                LEFT JOIN renewals r ON b.borrow_id = r.borrow_id
                WHERE b.book_id = :id
                AND b.return_date IS NULL
                AND (
                    CASE 
                        WHEN r.new_due_date IS NOT NULL THEN r.new_due_date
                        ELSE b.due_date
                    END
                ) < CURRENT_DATE
            """, nativeQuery = true)
    int countOverdueByBookId(@Param("id") Integer id);
}
