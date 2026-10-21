import { query } from '../../Учебная практика 14.09.2026/Интеграция с БД и агрегация данных (SQL + Backend)/partner-service.js';

export const getSalesHistoryByPartner = async (partnerId) => {
  const result = await query(
    `SELECT products.product_name, sales_history.quantity, TO_CHAR(sales_history.sale_date, 'DD.MM.YYYY') AS sale_date
     FROM sales_history
     JOIN products ON products.product_id = sales_history.product_id
     WHERE sales_history.partner_id = $1
     ORDER BY sales_history.sale_date DESC`,
    [partnerId]
  );

  return result.rows;
};
