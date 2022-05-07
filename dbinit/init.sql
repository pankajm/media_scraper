CREATE DATABASE db_media;

USE db_media

DROP TABLE IF EXISTS media_info;

CREATE TABLE `media_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `media_url` varchar(2048) DEFAULT NULL,
  `type` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 

DROP TABLE IF EXISTS users;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(256) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

INSERT INTO `db_media`.`users`
(
`username`,
`password`)
VALUES
('abc@gmail.com',
'81DC9BDB52D04DC20036DBD8313ED055'), ('xyz@yahoo.in', 'CC03E747A6AFBBCBF8BE7668ACFEBEE5');



