CREATE USER 'restaurantuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `mexican_restaurant`.* TO 'restaurantuser'@'localhost';
FLUSH PRIVILEGES;
