DROP TABLE IF EXISTS sales_history;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS partners;

CREATE TABLE partners (
    partner_id INTEGER PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    inn VARCHAR(12) NOT NULL UNIQUE,
    contact_email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(30),
    rating NUMERIC(2, 1) CHECK (rating BETWEEN 0 AND 5)
);

CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE sales_history (
    sale_id INTEGER PRIMARY KEY,
    partner_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    sale_date DATE NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
    CONSTRAINT fk_sales_history_partner
        FOREIGN KEY (partner_id)
        REFERENCES partners (partner_id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_sales_history_product
        FOREIGN KEY (product_id)
        REFERENCES products (product_id)
        ON DELETE RESTRICT
);
