import { useEffect, useState } from 'react';
import logo from '../../../Учебная практика 14.09.2026/Разработка интерфейса (UI) по руководству по стилю/resources/company-logo.svg';

const PartnerHistoryWindow = ({ partner, onBack }) => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = `CRM: История реализации продукции — ${partner.company_name}`;
    fetch(`/api/partners/${partner.partner_id}/history`)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(setHistory)
      .catch(() => setError('Не удалось получить историю продаж. Проверьте подключение к базе данных и повторите попытку.'));
  }, [partner]);

  return (
    <main className="page">
      <header className="header">
        <img className="logo" src={logo} alt="CRM" />
        <h1>CRM: История реализации продукции — {partner.company_name}</h1>
      </header>
      {error && <p className="page-error" role="alert">{error}</p>}
      <table className="history-table">
        <thead><tr><th>Наименование продукции</th><th>Количество (шт.)</th><th>Дата продажи</th></tr></thead>
        <tbody>{history.map((sale, index) => <tr key={`${sale.product_name}-${sale.sale_date}-${index}`}><td>{sale.product_name}</td><td>{sale.quantity}</td><td>{sale.sale_date}</td></tr>)}</tbody>
      </table>
      <button className="secondary-button" type="button" onClick={onBack}>Назад</button>
    </main>
  );
};

export default PartnerHistoryWindow;
