import assert from 'node:assert/strict';
import test from 'node:test';
import { calculatePartnerDiscount } from './partner-discount.js';

test('рассчитывает скидку на всех границах из ТЗ', () => {
  const cases = [
    [9_999, 0],
    [10_000, 5],
    [49_999, 5],
    [50_000, 10],
    [299_999, 10],
    [300_000, 15]
  ];

  for (const [totalQuantity, expectedDiscount] of cases) {
    assert.equal(calculatePartnerDiscount(totalQuantity), expectedDiscount);
  }
});
