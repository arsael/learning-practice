import { useEffect, useState } from 'react';
import logo from '../resources/company-logo.svg';
import '../styles.css';

const App = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch('/api/partners')
      .then((response) => response.json())
      .then(setPartners);
  }, []);

  return (
    <main className="page">
      <header className="header">
        <img className="logo" src={logo} alt="CRM" />
        <h1>CRM: Список партнеров и скидок</h1>
      </header>
      <section className="partner-list" aria-label="Список партнеров">
        {partners.map((partner) => (
          <article className="partner-card" key={partner.partner_id}>
            <div>
              <h2>{partner.company_name}</h2>
              <p>{partner.contact_email}</p>
              <p>{partner.phone || 'Телефон не указан'}</p>
              <p>Рейтинг: {partner.rating ?? 'не указан'}</p>
            </div>
            <strong>{partner.discount}%</strong>
          </article>
        ))}
      </section>
    </main>
  );
};

export default App;
