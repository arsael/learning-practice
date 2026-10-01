import assert from 'node:assert/strict';
import { calculatePartnerDiscount } from '../Разработка ядра бизнес-логики (Расчет скидки)/partner-discount.js';
import { closeDatabaseConnection, getPartnersWithDiscount } from '../Интеграция с БД и агрегация данных (SQL + Backend)/partner-service.js';

const partners = await getPartnersWithDiscount();

assert.equal(calculatePartnerDiscount(0), 0);
assert.ok(partners.length > 0);
assert.ok(partners.every((partner) => Number.isInteger(partner.discount)));

await closeDatabaseConnection();

console.log('Проверка списка партнеров пройдена.');
