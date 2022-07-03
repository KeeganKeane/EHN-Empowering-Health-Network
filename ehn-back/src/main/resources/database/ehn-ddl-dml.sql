-- DDL --

CREATE DATABASE IF NOT EXISTS ehn_db;

USE ehn_db;

-- DROP TABLES users, posts, post_ratings, post_reports, post_comments, foods, food_ratings, food_comments, food_requests;
-- Above line must be commented out when executing for fist time

CREATE TABLE IF NOT EXISTS users (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(64) NOT NULL,
	email VARCHAR(256) NOT NULL,
	password VARCHAR(64) NOT NULL,
	age_group TINYINT NOT NULL,
	vaccination_status TINYINT,
	positive_result_date DATE,
	last_logged_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	current_infected_flag TINYINT,
	admin_flag TINYINT DEFAULT 0,
	parosmia_flag TINYINT,
	active_flag TINYINT DEFAULT 1,
    FULLTEXT (username) WITH PARSER ngram
);

CREATE TABLE IF NOT EXISTS posts (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	create_user_id BIGINT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	title VARCHAR(128) NOT NULL,
	content VARCHAR(1024) NOT NULL,
	like_count BIGINT DEFAULT 0,
	active_flag TINYINT DEFAULT 1,
	FOREIGN KEY (create_user_id) REFERENCES users (id),
    FULLTEXT (title, content) WITH PARSER ngram
);

CREATE TABLE IF NOT EXISTS post_ratings (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	post_id BIGINT NOT NULL,
	user_id BIGINT NOT NULL,
	rating TINYINT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (post_id) REFERENCES posts (id),
	FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS post_reports (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	post_id BIGINT NOT NULL,
	user_id BIGINT NOT NULL,
	message VARCHAR(256),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	active_flag TINYINT DEFAULT 1,
	FOREIGN KEY (post_id) REFERENCES posts (id),
	FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS post_comments (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	post_id BIGINT NOT NULL,
	user_id BIGINT NOT NULL,
	comment_content VARCHAR(1024) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	active_flag TINYINT DEFAULT 1,
	FOREIGN KEY (post_id) REFERENCES posts (id),
	FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS foods (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(128) NOT NULL,
	photo_address VARCHAR(1024),
	tastes_same_count BIGINT DEFAULT 0,
 	tastes_different_count BIGINT DEFAULT 0, 
 	tastes_worse_count BIGINT DEFAULT 0, 
 	no_taste_count BIGINT DEFAULT 0,
	active_flag TINYINT DEFAULT 1 
);

CREATE TABLE IF NOT EXISTS food_ratings (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	food_id BIGINT NOT NULL,
	user_id BIGINT NOT NULL,
	rating TINYINT NOT NULL,
	FOREIGN KEY (food_id) REFERENCES foods (id),
	FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS food_comments (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	food_id BIGINT NOT NULL,
	user_id BIGINT NOT NULL,
	comment_content VARCHAR(1024) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (food_id) REFERENCES foods (id),
	FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS food_requests (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	user_id BIGINT NOT NULL,
	message VARCHAR(256) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users (id)
);


-- DML --

INSERT INTO users (username, email, password, age_group, vaccination_status, positive_result_date, current_infected_flag, parosmia_flag) VALUES('john_tanaka', 'j_tanaka@sample.com', 'jt_pass', 3, 3, "2021-05-16", 0, 1);
INSERT INTO users (username, email, password, age_group, vaccination_status, positive_result_date, current_infected_flag, parosmia_flag) VALUES('mickey_tannie', 'm_tannie@sample.com', 'mt_pass', 5, 0, "2022-03-22", 1, 0);
INSERT INTO users (username, email, password, age_group) VALUES('roberta_rockutena', 'r_rockutena@sample.com', 'rr_pass', 2);
INSERT INTO users (username, email, password, age_group, vaccination_status, positive_result_date, current_infected_flag, parosmia_flag) VALUES('pedro_rockstone', 'p_rockstone@sample.com', 'pr_pass', 3, 3, "2020-04-30", 0, 0);
INSERT INTO users (username, email, password, age_group) VALUES('dr_jun', 'd_jun@sample.com', 'dj_pass', 2);
INSERT INTO users (username, email, password, age_group, admin_flag) VALUES ('ad_min', 'a_min@sample.com', 'ad_pass', 3, 1);
 
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (1, 'John title 1', 'John content 1', 10, '2021-06-16 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, created_at) VALUES (1, 'John title 2', 'John content 2', '2021-07-16 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (1, 'John title 3', 'John content 3', 20, '2021-07-25 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (1, 'John title 4', 'John content 4', 15, '2021-08-06 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (1, 'John title 5', 'John content 5', 100, '2021-10-15 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (2, 'Mickey title 1', 'Mickey content 1', 10, '2022-04-01 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (2, 'Mickey title 2', 'Mickey content 2', 20, '2022-04-02 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (2, 'Mickey title 3', 'Mickey content 3', 20, '2022-04-03 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (2, 'Mickey title 4', 'Mickey content 4', 15, '2022-04-04 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (2, 'Mickey title 5', 'Mickey content 5', 30, '2022-04-05 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (2, 'Mickey title 6', 'Mickey content 6', 30, '2022-04-06 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (2, 'Mickey title 7', 'Mickey content 7', 75, '2022-04-07 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (2, 'Mickey title 8', 'Mickey content 8', 10, '2022-04-08 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (2, 'Mickey title 9', 'Mickey content 9', 60, '2022-04-09 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (2, 'Mickey title 10', 'Mickey content 10', 90, '2022-04-10 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (4, 'Pedro title 1', 'Pedro content 1', 1, '2022-01-10 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, created_at) VALUES (4, 'Pedro title 2', 'Pedro content 2', '2022-02-10 00:00:01.000000');
INSERT INTO posts (create_user_id, title, content, like_count, created_at) VALUES (4, 'Pedro title 3', 'Pedro content 3', 2, '2022-03-10 00:00:01.000000');
 
INSERT INTO post_ratings (post_id, user_id, rating) VALUES (5, 3, 1);
INSERT INTO post_ratings (post_id, user_id, rating) VALUES (12, 3, 1);
INSERT INTO post_ratings (post_id, user_id, rating) VALUES (15, 3, 1);
INSERT INTO post_ratings (post_id, user_id, rating) VALUES (5, 1, 1);
 
INSERT INTO post_reports (post_id, user_id, message, created_at) VALUES (9, 3, 'report message 1', '2022-01-01 00:00:01.000000');
INSERT INTO post_reports (post_id, user_id, message, created_at) VALUES (9, 1, 'report message 2', '2022-02-02 00:00:01.000000');
INSERT INTO post_reports (post_id, user_id, message, created_at) VALUES (17, 3, 'report message 3', '2022-03-01 00:00:01.000000');
 
INSERT INTO post_comments (post_id, user_id, comment_content) VALUES (5, 3, 'comment 1');
INSERT INTO post_comments (post_id, user_id, comment_content) VALUES (15, 1, 'comment 2');
INSERT INTO post_comments (post_id, user_id, comment_content) VALUES (5, 2, 'comment 3');
INSERT INTO post_comments (post_id, user_id, comment_content) VALUES (15, 3, 'comment 4');
INSERT INTO post_comments (post_id, user_id, comment_content) VALUES (15, 4, 'comment 5');
 
INSERT INTO foods (name, photo_address, tastes_same_count, tastes_different_count, tastes_worse_count, no_taste_count) VALUES ('Snickers Bar', 'https://spoonacular.com/productImages/61911-312x231.jpg', 20, 40, 20, 20);
INSERT INTO foods (name, photo_address, tastes_same_count, tastes_different_count, tastes_worse_count, no_taste_count) VALUES ('snack', 'https://spoonacular.com/productImages/126459-312x231.jpg', 40, 40, 10, 10);
INSERT INTO foods (name, photo_address, tastes_same_count, tastes_different_count, tastes_worse_count, no_taste_count) VALUES ('Snickers Almond Fun Size', 'https://spoonacular.com/productImages/128057-312x231.jpg', 40, 40, 15, 5);
INSERT INTO foods (name, photo_address, tastes_same_count, tastes_different_count, tastes_worse_count, no_taste_count) VALUES ('Snickers 2 To Go Pumpkins', 'https://spoonacular.com/productImages/223234-312x231.jpg', 10, 40, 40, 10);
INSERT INTO foods (name, photo_address, tastes_same_count, tastes_different_count, tastes_worse_count, no_taste_count) VALUES ('Snickers Minis', 'https://spoonacular.com/productImages/126586-312x231.jpg', 20, 40, 20, 20);
 
INSERT INTO food_ratings (food_id, user_id, rating) VALUES (1, 1, 0);
INSERT INTO food_ratings (food_id, user_id, rating) VALUES (2, 1, 1);
INSERT INTO food_ratings (food_id, user_id, rating) VALUES (4, 1, 2);
INSERT INTO food_ratings (food_id, user_id, rating) VALUES (5, 1, 3);
 
INSERT INTO food_comments (food_id, user_id, comment_content) VALUES (1, 1, 'John comment 1');
INSERT INTO food_comments (food_id, user_id, comment_content) VALUES (2, 1, 'John comment 2');
INSERT INTO food_comments (food_id, user_id, comment_content) VALUES (2, 3, 'Roberta comment 1');
INSERT INTO food_comments (food_id, user_id, comment_content) VALUES (3, 1, 'John comment 3');
INSERT INTO food_comments (food_id, user_id, comment_content) VALUES (4, 1, 'John comment 4');
 
INSERT INTO food_requests (user_id, message, created_at) VALUES(1, 'message 1', '2022-01-10 00:00:01.000000');
INSERT INTO food_requests (user_id, message, created_at) VALUES(3, 'message 2', '2022-01-25 00:00:01.000000');
