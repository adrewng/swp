-- ============================================
-- DROP TABLES BEFORE CREATE (optional)
-- ============================================
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS auction_members;
DROP TABLE IF EXISTS auctions;
DROP TABLE IF EXISTS batteries;
DROP TABLE IF EXISTS contracts;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS feedbacks;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS product_categories;
DROP TABLE IF EXISTS product_imgs;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS transaction_detail;
DROP TABLE IF EXISTS user_packages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS vehicles;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- CREATE TABLES
-- ============================================

CREATE TABLE `auction_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `auction_id` int DEFAULT NULL,
  `bid_price` decimal(15,2) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `auctions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  `starting_price` decimal(15,2) DEFAULT NULL,
  `original_price` decimal(15,2) DEFAULT NULL,
  `target_price` decimal(15,2) DEFAULT NULL,
  `deposit` decimal(15,2) DEFAULT NULL,
  `winner_id` int DEFAULT NULL,
  `winning_price` decimal(15,2) DEFAULT NULL,
  `duration` bigint DEFAULT '0',
  `step` decimal(15,2) DEFAULT '0.00',
  `note` varchar(1000) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'draft',
  `start_at` timestamp NULL DEFAULT NULL,
  `end_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `batteries` (
  `product_id` int NOT NULL,
  `capacity` varchar(50) DEFAULT NULL,
  `health` varchar(50) DEFAULT NULL,
  `chemistry` varchar(50) DEFAULT NULL,
  `voltage` varchar(50) DEFAULT NULL,
  `dimension` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
);

CREATE TABLE `contracts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contract_code` varchar(50) DEFAULT NULL,
  `seller_id` int NOT NULL,
  `buyer_id` int NOT NULL,
  `product_id` int NOT NULL,
  `deposit_amount` decimal(15,2) NOT NULL,
  `vehicle_price` decimal(15,2) NOT NULL,
  `commission_percent` decimal(5,2) DEFAULT '1.00',
  `dispute_city` varchar(100) DEFAULT NULL,
  `status` enum('pending','signed','completed','cancelled') DEFAULT 'pending',
  `url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contract_code` (`contract_code`)
);

CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `favorite_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contract_id` int NOT NULL,
  `seller_id` int NOT NULL,
  `buyer_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contract_id` (`contract_id`),
  CONSTRAINT `feedbacks_chk_1` CHECK ((`rating` >= 1 AND `rating` <= 5))
);

CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `message` varchar(2000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_read` int DEFAULT '0',
  `post_id` int DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `price` decimal(10,2) DEFAULT NULL,
  `service_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `buyer_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `code` varchar(100) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `tracking` varchar(50) DEFAULT 'PENDING',
  PRIMARY KEY (`id`)
);

CREATE TABLE `product_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `slug` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `product_imgs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `url` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_category_id` int DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `model` varchar(50) DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `image` varchar(2000) DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `reviewed_by` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `pushed_at` timestamp NULL DEFAULT NULL,
  `priority` int DEFAULT '1',
  `warranty` varchar(100) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `status_verify` varchar(10) DEFAULT 'unverified',
  `previousOwners` int DEFAULT NULL,
  `reject_count` int DEFAULT '0',
  `is_finally_rejected` int DEFAULT '0',
  `rejected_reason` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auction_id` int NOT NULL,
  `user_id` int NOT NULL,
  `reason` varchar(255) NOT NULL,
  `fault_type` enum('seller','winner') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `reported_by` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `roles` VALUES
(1,'customer',NULL),
(2,'admin',NULL),
(3,'staff',NULL);

CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `number_of_post` int DEFAULT '0',
  `number_of_push` int DEFAULT '0',
  `service_ref` varchar(100) DEFAULT NULL,
  `product_type` varchar(20) DEFAULT NULL,
  `duration` int DEFAULT '0',
  `feature` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `services` VALUES 
(1,'post','Đăng bài cho xe có phí',NULL,11000.00,1,0,'1','vehicle',30,NULL),
(2,'post','Đăng bài cho pin có phí',NULL,35000.00,1,0,'2','battery',30,NULL),
(7,'package','Gói Pro','Dành cho người dùng thường xuyên muốn tăng lượt tiếp cận.',10000.00,5,5,'1,3','vehicle',30,'Đăng tối đa 15 tin/tháng, Tin nổi bật trên trang chủ, Báo cáo chi tiết, Hỗ trợ ưu tiên'),
(8,'package','Gói Enterprise','Tối ưu cho đại lý hoặc doanh nghiệp có nhiều tài khoản.',499000.00,20,20,'1,3','vehicle',30,'Không giới hạn tin đăng, Quản lý nhóm & tài khoản con, Tin ưu tiên trong kết quả tìm kiếm, Báo cáo chuyên sâu & xuất file'),
(9,'package','Gói Pro','Dành cho người dùng thường xuyên muốn tăng lượt tiếp cận.',199000.00,5,5,'2,4','battery',30,'Đăng tối đa 15 tin/tháng, Tin nổi bật trên trang chủ, Báo cáo chi tiết, Hỗ trợ ưu tiên'),
(16,'purchase','Mua sản phẩm','Dịch vụ cho phép người dùng mua hoặc đặt cọc sản phẩm',0.00,0,0,NULL,'product',0,'Thanh toán sản phẩm, bao gồm mua trực tiếp hoặc đặt cọc'),
(17,'auction','Đấu giá','đấu giá cho người dùng',0.00,0,0,NULL,NULL,0,NULL),
(18,'deposit','đặt cọc','người dùng đặt cọc',0.00,0,0,NULL,NULL,0,NULL),
(21,'topup','Nạp ví','nạp tiền vào tài khoản',NULL,0,0,NULL,NULL,0,NULL),
(23,'package','Gói Pro Battery','Gói dịch vụ cao cấp',150000.00,5,5,'2,4','battery',0,'Đăng bài, đẩy tin, ưu tiên hiển thị');

CREATE TABLE `transaction_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `user_id` int NOT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `credits` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_packages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `package_id` int NOT NULL,
  `service_id` int NOT NULL,
  `order_id` int NOT NULL,
  `purchased_at` datetime NOT NULL,
  `expires_at` datetime NOT NULL,
  `status` enum('active','expired','cancelled') DEFAULT 'active',
  `total_amount` int NOT NULL DEFAULT '0',
  `used_amount` int NOT NULL DEFAULT '0',
  `remaining_amount` int NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_package_service` (`user_id`,`package_id`,`service_id`,`order_id`)
);

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(20) DEFAULT 'active',
  `full_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(2000) DEFAULT NULL,
  `rating` int DEFAULT '0',
  `total_credit` decimal(10,2) DEFAULT '0.00',
  `role_id` int DEFAULT '1',
  `refresh_token` varchar(2000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expired_refresh_token` varchar(2000) DEFAULT NULL,
  `avatar` varchar(2000) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);



CREATE TABLE `vehicles` (
  `product_id` int NOT NULL,
  `seats` int DEFAULT NULL,
  `mileage_km` varchar(20) DEFAULT NULL,
  `license_plate` varchar(50) DEFAULT NULL,
  `engine_number` varchar(50) DEFAULT NULL,
  `is_verified` int DEFAULT '0',
  `power` varchar(50) DEFAULT NULL,
  `health` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
);
