const partnerTypes = ['ЗАО', 'ООО', 'ИП'];

const PartnerForm = ({ partner, onChange }) => (
  <form className="partner-form" onSubmit={(event) => event.preventDefault()}>
    <label>
      Наименование
      <input name="company_name" value={partner.company_name} onChange={onChange} required />
    </label>
    <label>
      Тип партнера
      <select name="partner_type" value={partner.partner_type} onChange={onChange}>
        {partnerTypes.map((partnerType) => <option key={partnerType}>{partnerType}</option>)}
      </select>
    </label>
    <label>
      Рейтинг
      <input name="rating" type="number" min="0" step="1" value={partner.rating} onChange={onChange} required />
    </label>
    <label>
      Адрес
      <input name="address" value={partner.address} onChange={onChange} />
    </label>
    <label>
      ФИО директора
      <input name="director_name" value={partner.director_name} onChange={onChange} />
    </label>
    <label>
      Телефон
      <input name="phone" placeholder="+7 (900) 000-00-00" value={partner.phone} onChange={onChange} />
    </label>
    <label>
      Email компании
      <input name="contact_email" type="email" placeholder="company@example.ru" value={partner.contact_email} onChange={onChange} required />
    </label>
  </form>
);

export default PartnerForm;
