SELECT
    p.partner_id,
    p.company_name,
    COUNT(sh.sale_id) AS delivery_count
FROM partners AS p
LEFT JOIN sales_history AS sh ON sh.partner_id = p.partner_id
GROUP BY p.partner_id, p.company_name
ORDER BY p.company_name;

BEGIN;

INSERT INTO partners (
    partner_id,
    company_name,
    inn,
    contact_email,
    phone,
    rating
)
VALUES (
    4,
    'ООО «Новый партнер»',
    '7707654321',
    'new.partner@example.ru',
    '+7 (999) 444-55-66',
    4.5
);

INSERT INTO sales_history (
    sale_id,
    partner_id,
    product_id,
    sale_date,
    quantity,
    total_amount
)
VALUES (
    106,
    4,
    1,
    DATE '2026-03-31',
    10,
    5000.00
);

COMMIT;

SELECT
    pr.product_name,
    sh.sale_date,
    sh.quantity,
    sh.total_amount
FROM sales_history AS sh
JOIN products AS pr ON pr.product_id = sh.product_id
WHERE sh.partner_id = 1
    AND sh.sale_date BETWEEN DATE '2026-03-01' AND DATE '2026-03-31'
ORDER BY sh.sale_date;
