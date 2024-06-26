CREATE TABLE `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'User ID',
  `user_name` VARCHAR(255) NOT NULL UNIQUE COMMENT 'User Name',
  `email` VARCHAR(255) NOT NULL UNIQUE COMMENT 'Email',
  `password` VARCHAR(30) NOT NULL COMMENT 'Password',
  `image` BLOB COMMENT 'Image',
  `is_deleted` TINYINT(1) DEFAULT FALSE COMMENT 'Is Deleted',
  `is_blocked` TINYINT(1) DEFAULT FALSE COMMENT 'Is Blocked'
);

CREATE TABLE `cats` (
  `cat_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Cat ID',
  `user_id` INT NOT NULL COMMENT 'User ID',
  `cat_name` VARCHAR(255) NOT NULL COMMENT 'Cat Name',
  `is_kitten` TINYINT(1) DEFAULT FALSE COMMENT 'Is Kitten',
  `media_type` enum('image', 'video')
  `file` BLOB COMMENT 'Image',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);

CREATE TABLE `favorite_cats` (
  `favorite_cat_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Favorite Cat ID',
  `user_id` INT NOT NULL COMMENT 'User ID',
  `cat_id` INT NOT NULL COMMENT 'Cat ID',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
  FOREIGN KEY (`cat_id`) REFERENCES `cats`(`cat_id`)
);

CREATE TABLE `liked_cats` (
  `liked_cat_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Liked Cat ID',
  `user_id` INT NOT NULL COMMENT 'User ID',
  `cat_id` INT NOT NULL COMMENT 'Cat ID',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
  FOREIGN KEY (`cat_id`) REFERENCES `cats`(`cat_id`)
);

CREATE TABLE `tag_categories` (
  `tag_category_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Tag Category ID',
  `name` VARCHAR(30) NOT NULL UNIQUE COMMENT 'Name'
);

CREATE TABLE `tags` (
  `tag_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Tag ID',
  `tag_category_id` INT COMMENT 'Tag Category ID',
  `name` VARCHAR(30) NOT NULL UNIQUE COMMENT 'Name',
  FOREIGN KEY (`tag_category_id`) REFERENCES `tag_categories`(`tag_category_id`)
);

CREATE TABLE `tags_of_cats` (
  `tag_of_cat_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Tag Of Cat ID',
  `tag_id` INT NOT NULL COMMENT 'Tag ID',
  `cat_id` INT NOT NULL COMMENT 'Cat ID',
  FOREIGN KEY (`tag_id`) REFERENCES `tags`(`tag_id`),
  FOREIGN KEY (`cat_id`) REFERENCES `cats`(`cat_id`)
);