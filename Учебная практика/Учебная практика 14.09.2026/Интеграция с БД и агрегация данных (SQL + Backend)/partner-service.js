import { Pool } from 'pg';
import { calculatePartnerDiscount } from '../Разработка ядра бизнес-логики (Расчет скидки)/partner-discount.js';

const pool = new Pool({
  host: process.env.PGHOST ?? 'localhost',
  port: Number(process.env.PGPORT ?? 5432),
  database: process.env.PGDATABASE ?? 'partner_crm'
});

export const getPartnersWithDiscount = async () => {
  const result = await pool.query(`
    SELECT
      partners.partner_id,
      partners.company_name,
      partners.contact_email,
      partners.phone,
      partners.rating,
      partners.partner_type,
      partners.address,
      partners.director_name,
      COALESCE(SUM(sales_history.quantity), 0)::INTEGER AS total_quantity
    FROM partners
    LEFT JOIN sales_history ON sales_history.partner_id = partners.partner_id
    GROUP BY partners.partner_id
    ORDER BY partners.company_name;
  `);

  return result.rows.map((partner) => ({
    ...partner,
    discount: calculatePartnerDiscount(partner.total_quantity)
  }));
};

export const query = (text, values) => pool.query(text, values);

export const closeDatabaseConnection = () => pool.end();
