CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(17,2) NOT NULL,
    description TEXT,
    category VARCHAR(64) NOT NULL
);