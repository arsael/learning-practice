import { useState } from 'react';
import { calculateMaterialRequirement } from '../../Разработка ядра алгоритма расчета материалов/material-calculator.js';

const initialValues = {
  productTypeId: 1,
  materialTypeId: 1,
  quantity: 1,
  param1: 1,
  param2: 1
};

const MaterialCalculator = () => {
  const [values, setValues] = useState(initialValues);
  const [message, setMessage] = useState('');

  const changeValue = (event) => {
    setValues((currentValues) => ({ ...currentValues, [event.target.name]: Number(event.target.value) }));
  };

  const calculate = () => {
    try {
      const result = calculateMaterialRequirement(values.productTypeId, values.materialTypeId, values.quantity, values.param1, values.param2);

      setMessage(result === -1 ? 'Расчет невозможен: проверьте идентификаторы типов, количество и параметры продукции.' : `Требуемый расход материала: ${result}`);
    } catch {
      setMessage('Расчет не выполнен. Проверьте введенные значения и повторите попытку.');
    }
  };

  return (
    <section className="calculator" aria-label="Расчет материалов">
      <h2>Расчет материалов</h2>
      <label>Тип продукции<input name="productTypeId" type="number" value={values.productTypeId} onChange={changeValue} /></label>
      <label>Тип материала<input name="materialTypeId" type="number" value={values.materialTypeId} onChange={changeValue} /></label>
      <label>Количество продукции<input name="quantity" type="number" value={values.quantity} onChange={changeValue} /></label>
      <label>Параметр 1<input name="param1" type="number" value={values.param1} onChange={changeValue} /></label>
      <label>Параметр 2<input name="param2" type="number" value={values.param2} onChange={changeValue} /></label>
      <button className="primary-button" type="button" onClick={calculate}>Рассчитать</button>
      {message && <p role="status">{message}</p>}
    </section>
  );
};

export default MaterialCalculator;
