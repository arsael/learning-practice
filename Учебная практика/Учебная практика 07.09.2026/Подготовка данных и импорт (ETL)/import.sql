\copy partners (partner_id, company_name, inn, contact_email, phone, rating) FROM 'Подготовленные данные/partners_clean.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');
\copy products (product_id, product_name) FROM 'Подготовленные данные/products.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');
\copy sales_history (sale_id, partner_id, product_id, sale_date, quantity, total_amount) FROM 'Подготовленные данные/sales_clean.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');
