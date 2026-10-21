import { useEffect, useState } from 'react';
import PartnerForm from '../../Разработка формы добавления, редактирования партнера/src/PartnerForm.jsx';
import NotificationDialog from '../../Обработка исключений и интерактивные уведомления (UX, UI)/src/NotificationDialog.jsx';
import MaterialCalculator from '../../../Учебная практика 28.09.2026/Интеграция метода расчета и комплексное тестирование/src/MaterialCalculator.jsx';

const createPartner = (partner) => ({
  partner_id: partner?.partner_id,
  company_name: partner?.company_name ?? '',
  partner_type: partner?.partner_type ?? 'ООО',
  rating: partner?.rating ?? 0,
  address: partner?.address ?? '',
  director_name: partner?.director_name ?? '',
  phone: partner?.phone ?? '',
  contact_email: partner?.contact_email ?? ''
});

const PartnerEditWindow = ({ partner, onBack, onSave, onSaved }) => {
  const [formData, setFormData] = useState(() => createPartner(partner));
  const [savedData] = useState(() => JSON.stringify(createPartner(partner)));
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    document.title = partner ? 'CRM: Карточка партнера [Редактирование]' : 'CRM: Карточка партнера [Добавление]';
  }, [partner]);

  const updateField = (event) => {
    setFormData((currentData) => ({ ...currentData, [event.target.name]: event.target.value }));
  };

  const closeDialog = () => {
    const action = dialog?.action;

    setDialog(null);
    action?.();
  };

  const leaveEditor = () => {
    // Снимок исходных значений отделяет программную загрузку карточки от правок пользователя.
    if (JSON.stringify(formData) !== savedData) {
      setDialog({
        type: 'warning',
        title: 'Несохраненные изменения',
        message: 'Изменения будут потеряны безвозвратно. Нажмите «Вернуться», если хотите продолжить.',
        buttonText: 'Вернуться',
        action: onBack
      });
      return;
    }

    onBack();
  };

  const submit = async () => {
    if (!formData.company_name.trim() || !formData.contact_email.trim()) {
      setDialog({
        type: 'error',
        title: 'Ошибка заполнения',
        message: 'Наименование и email компании обязательны. Заполните поля и повторите сохранение.',
        buttonText: 'Понятно'
      });
      return;
    }

    if (!Number.isInteger(Number(formData.rating)) || Number(formData.rating) < 0) {
      setDialog({
        type: 'error',
        title: 'Ошибка рейтинга',
        message: 'Рейтинг должен быть целым числом от 0. Удалите знаки препинания и повторите попытку.',
        buttonText: 'Понятно'
      });
      return;
    }

    try {
      await onSave(formData);
      setDialog({
        type: 'information',
        title: 'Сохранение выполнено',
        message: partner ? 'Данные партнера обновлены.' : 'Новый партнер добавлен в базу данных.',
        buttonText: 'Закрыть',
        action: onSaved
      });
    } catch {
      setDialog({
        type: 'error',
        title: 'Ошибка базы данных',
        message: 'Не удалось сохранить данные. Проверьте подключение к базе данных и повторите попытку.',
        buttonText: 'Понятно'
      });
    }
  };

  return (
    <main className="page">
      <header className="header"><h1>{partner ? 'Карточка партнера' : 'Добавление партнера'}</h1></header>
      <PartnerForm partner={formData} onChange={updateField} />
      <MaterialCalculator />
      <div className="form-actions">
        <button className="primary-button" type="button" onClick={submit}>Сохранить</button>
        <button className="secondary-button" type="button" onClick={leaveEditor}>Назад</button>
      </div>
      <NotificationDialog dialog={dialog} onClose={closeDialog} />
    </main>
  );
};

export default PartnerEditWindow;
