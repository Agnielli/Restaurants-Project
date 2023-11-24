create database restaurants;
use restaurants;


CREATE TABLE `restaurant` (
  `restaurant_id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `rest_name` varchar(80),
  `style` varchar(100),
  `email` varchar(75) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rest_description` varchar(500),
  `phone` varchar(20),
  `rest_img` varchar(100),
  `rest_isdeleted` tinyint(1) DEFAULT '0',
  UNIQUE KEY `email_UNIQUE` (`email`)
) ;

CREATE TABLE `dishes` (
  `dishes_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `dishes_name` varchar(45) NOT NULL,
  `dishes_description` varchar(500),
  `dishes_img` varchar(100) DEFAULT NULL,
  `restaurant_id` int UNSIGNED,
  `dishes_isdeleted` tinyint(1) DEFAULT '0',
  KEY `fk_restaurant_id` (`restaurant_id`),
  CONSTRAINT `fk_restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from restaurant;
select * from dishes;