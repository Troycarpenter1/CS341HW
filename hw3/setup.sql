--Troy Carpenter

CREATE DATABASE IF NOT EXISTS carpentt27_db;
USE carpentt27_db;

-- Toppings Table
CREATE TABLE IF NOT EXISTS toppings (
    T_ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(5,2) NOT NULL
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    O_ID INT AUTO_INCREMENT PRIMARY KEY,
    T_ID INT,
    quantity INT,
    notes VARCHAR(255),
    month INT,
    year INT,
    FOREIGN KEY (T_ID) REFERENCES toppings(T_ID)
);

-- Insert sample data
INSERT INTO toppings (name, price) VALUES
('plain', 9.99),
('vegan', 11.50),
('chocolate', 12.10),
('cherry', 14.95);

INSERT INTO orders (T_ID, quantity, notes, month, year) VALUES
(1, 2, 'extra sprinkles', 1, 2023),
(2, 1, 'no sprinkles', 2, 2023),
(3, 3, 'extra chocolate', 3, 2023),
(1, 4, 'no sprinkles', 4, 2023),
(2, 5, 'extra sprinkles', 5, 2023),
(3, 6, 'no sprinkles', 6, 2023);
