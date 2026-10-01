import assert from 'node:assert/strict';
import { calculatePartnerDiscount } from './partner-discount.js';

const cases = [
  [9999, 0],
  [10000, 5],
  [49999, 5],
  [50000, 10],
  [300000, 15]
];

for (const [totalQuantity, expectedDiscount] of cases) {
  assert.equal(calculatePartnerDiscount(totalQuantity), expectedDiscount);
}

console.log('Проверка граничных значений пройдена.');
