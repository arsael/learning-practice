import { query } from '../../Учебная практика 14.09.2026/Интеграция с БД и агрегация данных (SQL + Backend)/partner-service.js';

const partnerTypes = ['ЗАО', 'ООО', 'ИП'];

const normalizePartner = (partner) => ({
  companyName: partner.company_name?.trim(),
  partnerType: partner.partner_type,
  rating: Number(partner.rating),
  address: partner.address?.trim() ?? '',
  directorName: partner.director_name?.trim() ?? '',
  phone: partner.phone?.trim() || null,
  contactEmail: partner.contact_email?.trim()
});

const validatePartner = (partner) => {
  if (!partner.companyName || !partner.contactEmail) {
    const error = new Error('Заполните наименование и email компании.');
    error.status = 400;
    throw error;
  }

  if (!Number.isInteger(partner.rating) || partner.rating < 0) {
    const error = new Error('Рейтинг должен быть целым числом от 0. Удалите знаки препинания и повторите попытку.');
    error.status = 400;
    throw error;
  }

  if (!partnerTypes.includes(partner.partnerType)) {
    const error = new Error('Выберите тип партнера из списка.');
    error.status = 400;
    throw error;
  }
};

export const getPartnerById = async (partnerId) => {
  const result = await query(
    `SELECT partner_id, company_name, partner_type, rating, address, director_name, phone, contact_email
     FROM partners
     WHERE partner_id = $1`,
    [partnerId]
  );

  return result.rows[0];
};

export const createPartner = async (data) => {
  const partner = normalizePartner(data);
  validatePartner(partner);
  const result = await query(
    `INSERT INTO partners (partner_id, company_name, inn, contact_email, phone, rating, partner_type, address, director_name)
     VALUES ((SELECT COALESCE(MAX(partner_id), 0) + 1 FROM partners), $1, (SELECT COALESCE(MAX(inn::BIGINT), 0) + 1 FROM partners)::VARCHAR, $2, $3, $4, $5, $6, $7)
     RETURNING partner_id, company_name, partner_type, rating, address, director_name, phone, contact_email`,
    [partner.companyName, partner.contactEmail, partner.phone, partner.rating, partner.partnerType, partner.address, partner.directorName]
  );

  return result.rows[0];
};

export const updatePartner = async (partnerId, data) => {
  const partner = normalizePartner(data);
  validatePartner(partner);
  const result = await query(
    `UPDATE partners
     SET company_name = $1, contact_email = $2, phone = $3, rating = $4, partner_type = $5, address = $6, director_name = $7
     WHERE partner_id = $8
     RETURNING partner_id, company_name, partner_type, rating, address, director_name, phone, contact_email`,
    [partner.companyName, partner.contactEmail, partner.phone, partner.rating, partner.partnerType, partner.address, partner.directorName, partnerId]
  );

  return result.rows[0];
};
