import { useEffect } from 'react';
import logo from '../../../Учебная практика 14.09.2026/Разработка интерфейса (UI) по руководству по стилю/resources/company-logo.svg';

const MainWindow = ({ partners, error, onAdd, onSelect }) => {
  useEffect(() => {
    document.title = 'CRM: Реестр партнеров';
  }, []);

  return (
    <main className="page">
      <header className="header">
        <img className="logo" src={logo} alt="CRM" />
        <h1>CRM: Реестр партнеров</h1>
      </header>
      <button className="primary-button" type="button" onClick={onAdd}>Добавить партнера</button>
      {error && <p className="page-error" role="alert">{error}</p>}
      <section className="partner-list" aria-label="Список партнеров">
        {partners.map((partner) => (
          <button className="partner-card" type="button" key={partner.partner_id} onClick={() => onSelect(partner.partner_id)}>
            <span>
              <strong>{partner.company_name}</strong>
              <span>{partner.contact_email}</span>
              <span>{partner.phone || 'Телефон не указан'}</span>
              <span>Рейтинг: {partner.rating ?? 'не указан'}</span>
            </span>
            <span>{partner.discount}%</span>
          </button>
        ))}
      </section>
    </main>
  );
};

export default MainWindow;
