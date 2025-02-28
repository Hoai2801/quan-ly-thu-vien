-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: LibraryDB
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `isbn` varchar(255) DEFAULT NULL,
  `total_copies` int DEFAULT '1',
  `publisher` varchar(255) DEFAULT NULL,
  `published_year` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `isbn` (`isbn`),
  KEY `idx_books_title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Dac Nhan Tam','Dale Carnegie','Self-help','978-1-60309-452-8',5,'NXB Tre','2019'),(2,'Harry Potter and the Sorcerer\'s Stone','J.K. Rowling','Fantasy','978-0-7475-3269-9',10,'Bloomsbury','1997'),(3,'Clean Code','Robert C. Martin','Programming','978-0-13-235088-4',3,'Pearson','2008'),(4,'Sapiens','Yuval Noah Harari','History','978-0-06-231609-7',7,'Harper','2014'),(5,'The Lean Startup','Eric Ries','Business','978-0-307-88789-4',4,'Crown','2011');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow_records`
--

DROP TABLE IF EXISTS `borrow_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrow_records` (
  `borrow_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `book_id` int NOT NULL,
  `borrow_date` date DEFAULT (curdate()),
  `return_date` date DEFAULT NULL,
  `due_date` date NOT NULL,
  `renewal_count` int DEFAULT '0',
  PRIMARY KEY (`borrow_id`),
  KEY `member_id` (`member_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `borrow_records_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `borrow_records_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_records`
--

LOCK TABLES `borrow_records` WRITE;
/*!40000 ALTER TABLE `borrow_records` DISABLE KEYS */;
INSERT INTO `borrow_records` VALUES (1,1,2,'2025-01-02','2025-02-28','2025-01-16',0),(2,2,1,'2025-01-05',NULL,'2025-01-19',0),(3,3,3,'2025-01-07',NULL,'2025-01-21',0),(4,4,4,'2025-01-10',NULL,'2025-01-24',0),(5,5,5,'2025-01-12',NULL,'2025-01-26',0),(6,1,3,'2025-01-15',NULL,'2025-01-29',0),(7,2,2,'2025-01-17',NULL,'2025-01-31',0),(8,3,4,'2025-01-19',NULL,'2025-02-02',0),(9,4,1,'2025-01-22',NULL,'2025-02-05',0),(10,5,5,'2025-01-25',NULL,'2025-02-08',0),(11,1,2,'2025-01-28',NULL,'2025-02-11',0),(12,2,3,'2025-02-01',NULL,'2025-02-15',0),(13,3,1,'2025-02-04',NULL,'2025-02-18',0),(14,4,5,'2025-02-06',NULL,'2025-02-20',0),(15,5,4,'2025-02-09',NULL,'2025-02-23',0),(16,1,5,'2025-02-12',NULL,'2025-02-26',0),(17,2,4,'2025-02-14',NULL,'2025-02-28',0),(18,3,3,'2025-02-17',NULL,'2025-03-03',0),(19,4,2,'2025-02-19',NULL,'2025-03-05',0),(20,5,1,'2025-02-22',NULL,'2025-03-08',0),(21,5,1,'2025-02-26','2025-02-27','2025-02-28',0);
/*!40000 ALTER TABLE `borrow_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `membership_date` date DEFAULT (curdate()),
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_members_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'Nguyen Van A','a.nguyen@example.com','0123456789','123 Le Loi, HCM',_binary '','2025-02-28'),(2,'Tran Thi B','b.tran@example.com','0987654321','456 Tran Hung Dao, HN',_binary '','2025-02-28'),(3,'Pham Van C','c.pham@example.com','0345678912','789 Nguyen Hue, DN',_binary '','2025-02-28'),(4,'Le Thi D','d.le@example.com','0778899001','321 Cach Mang, CT',_binary '','2025-02-28'),(5,'Hoang Van E','e.hoang@example.com','0899922333','654 Ly Thuong Kiet, BD',_binary '','2025-02-28');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `message` text NOT NULL,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,1,'Sach cua ban sap den han tra. Vui long tra sach truoc ngay 16-01-2025','2025-02-28 07:48:07'),(2,2,'Sach cua ban sap den han tra. Vui long tra sach truoc ngay 19-01-2025','2025-02-28 07:48:07'),(3,3,'Sach cua ban sap den han tra. Vui long tra sach truoc ngay 21-01-2025','2025-02-28 07:48:07'),(4,4,'Sach cua ban sap den han tra. Vui long tra sach truoc ngay 24-01-2025','2025-02-28 07:48:07'),(5,5,'Sach cua ban sap den han tra. Vui long tra sach truoc ngay 26-01-2025','2025-02-28 07:48:07');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `borrow_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `borrow_id` (`borrow_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`borrow_id`) REFERENCES `borrow_records` (`borrow_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,5000.00,'2025-02-28 07:48:07'),(2,3,10000.00,'2025-02-28 07:48:07'),(3,5,7500.00,'2025-02-28 07:48:07'),(4,7,5000.00,'2025-02-28 07:48:07'),(5,9,12000.00,'2025-02-28 07:48:07'),(6,11,3000.00,'2025-02-28 07:48:07'),(7,13,15000.00,'2025-02-28 07:48:07'),(8,15,9000.00,'2025-02-28 07:48:07'),(9,17,6000.00,'2025-02-28 07:48:07');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `renewals`
--

DROP TABLE IF EXISTS `renewals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `renewals` (
  `renewal_id` int NOT NULL AUTO_INCREMENT,
  `borrow_id` int NOT NULL,
  `renewal_date` date NOT NULL,
  `new_due_date` date NOT NULL,
  PRIMARY KEY (`renewal_id`),
  KEY `borrow_id` (`borrow_id`),
  CONSTRAINT `renewals_ibfk_1` FOREIGN KEY (`borrow_id`) REFERENCES `borrow_records` (`borrow_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `renewals`
--

LOCK TABLES `renewals` WRITE;
/*!40000 ALTER TABLE `renewals` DISABLE KEYS */;
INSERT INTO `renewals` VALUES (1,1,'2025-02-28','2025-01-30'),(2,2,'2025-02-28','2025-02-02'),(3,3,'2025-02-28','2025-02-04'),(4,5,'2025-02-28','2025-02-10'),(5,7,'2025-02-28','2025-02-14'),(6,9,'2025-02-28','2025-02-18'),(7,11,'2025-02-28','2025-02-24'),(8,13,'2025-02-28','2025-02-28'),(9,15,'2025-02-28','2025-03-04'),(10,17,'2025-02-28','2025-03-08');
/*!40000 ALTER TABLE `renewals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` int NOT NULL,
  `expired` bit(1) NOT NULL,
  `revoked` bit(1) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_type` enum('BEARER') DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKpddrhgwxnms2aceeku9s2ewy5` (`token`),
  KEY `FKj8rfw4x0wjjyibfqq566j4qng` (`user_id`),
  CONSTRAINT `FKj8rfw4x0wjjyibfqq566j4qng` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (52,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBRE1JTiIsImlhdCI6MTc0MDc0ODY5NCwiZXhwIjoxNzQwODM1MDk0fQ.1PDXYrSsnySfI2jqXEEtH3FozVYlFeuCWhNtZhvzRhU','BEARER',15),(53,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVU0VSIiwiaWF0IjoxNzQwNzQ4NzE2LCJleHAiOjE3NDA4MzUxMTZ9.OQL5HCoHZRAyXXdrrr3gtXmWO4rh2U2h2DrozqpHWos','BEARER',16),(54,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVU0VSIiwiaWF0IjoxNzQwNzQ4NzQzLCJleHAiOjE3NDA4MzUxNDN9.haF8HPgNXeCqagFgitl6Fd4GaTOR1khtSU6n-BLZpQY','BEARER',16),(102,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVU0VSIiwiaWF0IjoxNzQwNzQ4ODUxLCJleHAiOjE3NDA4MzUyNTF9.M7jpyr1i1eTbHXxYfbObKNYV2xBP8V69Of1182Rrqmk','BEARER',16),(103,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBRE1JTiIsImlhdCI6MTc0MDc0ODg5NCwiZXhwIjoxNzQwODM1Mjk0fQ.YzVq6iNxVHLNFxm3cGzi9VHRoHwE4QyPhOIi6Z9GfSs','BEARER',15),(104,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBRE1JTiIsImlhdCI6MTc0MDc0ODkyMywiZXhwIjoxNzQwODM1MzIzfQ.WjsecSCFApDbmrzvKUbKqONQ4xx8lKCQ_ont5_kP2_w','BEARER',15),(152,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBRE1JTiIsImlhdCI6MTc0MDc0OTA1OCwiZXhwIjoxNzQwODM1NDU4fQ.oI-r9BMY5AwWvzpuqS0jQdb6sSNZLkk4sThM2v-1ovk','BEARER',15),(153,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBRE1JTiIsImlhdCI6MTc0MDc0OTA3MiwiZXhwIjoxNzQwODM1NDcyfQ.UT9zFi1e4fdkVJGEoc-2bUOgAx0CLLXhgL_C6hNmzo4','BEARER',15),(202,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBRE1JTiIsImlhdCI6MTc0MDc0OTIyNywiZXhwIjoxNzQwODM1NjI3fQ.eWBII4fAIKag4jIjFPbb4zfyn-awq0Iea5eSVVVTVNs','BEARER',15),(252,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBRE1JTiIsImlhdCI6MTc0MDc0OTQxNCwiZXhwIjoxNzQwODM1ODE0fQ.4iKs6hMcNP5tNcSavVFyN7bmsKNnUSYfz7n-FFIcsQw','BEARER',15),(302,_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJWSVAiLCJpYXQiOjE3NDA3NDk2NTEsImV4cCI6MTc0MDgzNjA1MX0.6YZDYK_wE4-algTmhO_K74VodvhafoAghAwN4ALD2QM','BEARER',18),(303,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVU0VSIiwiaWF0IjoxNzQwNzQ5NjY5LCJleHAiOjE3NDA4MzYwNjl9.Z19HbaDCWbQUxng4t3BfEeLG-o6khXI0NYR-Ev4FAKQ','BEARER',16),(304,_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVU0VSIiwiaWF0IjoxNzQwNzUwMzMyLCJleHAiOjE3NDA4MzY3MzJ9.gPhELWrSRjpWZ3-fn-p1OHdvjKx_Y8Ew4QkFvsR653A','BEARER',16),(352,_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBRE1JTiIsImlhdCI6MTc0MDc1MTIzOSwiZXhwIjoxNzQwODM3NjM5fQ.2_OliBc37dyXGEnNRat29-fJSyHIiMUUcp6f8Ne12zc','BEARER',15);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_seq`
--

DROP TABLE IF EXISTS `token_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_seq`
--

LOCK TABLES `token_seq` WRITE;
/*!40000 ALTER TABLE `token_seq` DISABLE KEYS */;
INSERT INTO `token_seq` VALUES (451);
/*!40000 ALTER TABLE `token_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (15,'ADMIN','$2a$10$PxJN2JnFididYf46i.fxtOv.kvYpaIGDf27CY0DWEIDmAVAs8lL9C','ADMIN'),(16,'USER','$2a$10$Fx1LtadhIeDofi2GpfPXSO70p4yWyoBN0LF8VJ34oI4WIfZ/q9Ote','USER'),(18,'VIP','$2a$10$af8u2ZeAi7gaNSYoTVGI8udM.rhqj41cAJmqNO5Hqn6KfPgz7y.hy','ADMIN');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-28 21:02:50
