import { expect, test } from '../../../Учебная практика 14.09.2026/node_modules/@playwright/test/index.js';
import { calculateMaterialRequirement } from '../../Разработка ядра алгоритма расчета материалов/material-calculator.js';

test('рассчитывает расход материала', () => {
  expect(calculateMaterialRequirement(1, 1, 10, 2, 3)).toBe(76);
});

test('округляет расход вверх', () => {
  expect(calculateMaterialRequirement(2, 2, 1, 1, 1)).toBe(1);
});

test('возвращает -1 для несуществующего типа', () => {
  expect(calculateMaterialRequirement(3, 1, 1, 1, 1)).toBe(-1);
  expect(calculateMaterialRequirement(1, 3, 1, 1, 1)).toBe(-1);
});

test('возвращает -1 для отрицательного параметра', () => {
  expect(calculateMaterialRequirement(1, 1, 1, -1, 1)).toBe(-1);
  expect(calculateMaterialRequirement(1, 1, 1, 1, -1)).toBe(-1);
});

test('возвращает -1 для нулевого количества', () => {
  expect(calculateMaterialRequirement(1, 1, 0, 1, 1)).toBe(-1);
  expect(calculateMaterialRequirement(1, 1, -1, 1, 1)).toBe(-1);
  expect(calculateMaterialRequirement(1, 1, 1, Number.NaN, 1)).toBe(-1);
});
