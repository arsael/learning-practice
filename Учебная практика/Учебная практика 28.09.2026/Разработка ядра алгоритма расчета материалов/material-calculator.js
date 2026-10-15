const productTypes = new Map([[1, 1.2], [2, 0.8]]);
const materialTypes = new Map([[1, 5], [2, 2]]);

export const calculateMaterialRequirement = (productTypeId, materialTypeId, quantity, param1, param2) => {
  if (
    !Number.isInteger(productTypeId) ||
    !Number.isInteger(materialTypeId) ||
    !Number.isInteger(quantity) ||
    !Number.isFinite(param1) ||
    !Number.isFinite(param2) ||
    quantity <= 0 ||
    param1 <= 0 ||
    param2 <= 0
  ) {
    return -1;
  }

  const productCoefficient = productTypes.get(productTypeId);
  const wastePercentage = materialTypes.get(materialTypeId);

  if (productCoefficient === undefined || wastePercentage === undefined) {
    return -1;
  }

  // Округление вверх не допускает недостатка материала при дробном результате.
  return Math.ceil(quantity * param1 * param2 * productCoefficient * (1 + wastePercentage / 100));
};
