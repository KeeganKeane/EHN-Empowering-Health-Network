CREATE DATABASE IF NOT EXISTS ehn_db;

USE ehn_db;

DROP TABLES IF EXISTS users, posts, post_ratings, post_reports, post_comments, foods, food_ratings, food_comments, food_requests;

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
	content VARCHAR(4096) NOT NULL,
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
	id BIGINT PRIMARY KEY,
	name VARCHAR(128) NOT NULL,
	photo_address VARCHAR(1024),
	tastes_same_count BIGINT DEFAULT 0,
 	tastes_different_count BIGINT DEFAULT 0,
 	tastes_worse_count BIGINT DEFAULT 0,
 	no_tastes_count BIGINT DEFAULT 0,
	active_flag TINYINT DEFAULT 1,
	FULLTEXT (name) WITH PARSER ngram
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