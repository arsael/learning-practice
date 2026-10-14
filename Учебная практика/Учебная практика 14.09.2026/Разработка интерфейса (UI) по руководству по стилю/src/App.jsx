import { useCallback, useEffect, useState } from 'react';
import MainWindow from '../../../Учебная практика 21.09.2026/Проектирование многооконной архитектуры и навигации/src/MainWindow.jsx';
import PartnerEditWindow from '../../../Учебная практика 21.09.2026/Проектирование многооконной архитектуры и навигации/src/PartnerEditWindow.jsx';
import PartnerHistoryWindow from '../../../Учебная практика 28.09.2026/Разработка интерфейса истории реализации продукции/src/PartnerHistoryWindow.jsx';
import '../styles.css';

const App = () => {
  const [partners, setPartners] = useState([]);
  const [currentPartner, setCurrentPartner] = useState(null);
  const [page, setPage] = useState('main');
  const [loadError, setLoadError] = useState('');

  const loadPartners = useCallback(async () => {
    try {
      const response = await fetch('/api/partners');

      if (!response.ok) {
        throw new Error();
      }

      setPartners(await response.json());
      setLoadError('');
    } catch {
      setLoadError('Не удалось получить список партнеров. Проверьте подключение к базе данных и обновите страницу.');
    }
  }, []);

  useEffect(() => {
    loadPartners();
  }, [loadPartners]);

  const openNewPartner = () => {
    setCurrentPartner(null);
    setPage('edit');
  };

  const openPartner = async (partnerId) => {
    try {
      const response = await fetch(`/api/partners/${partnerId}`);

      if (!response.ok) {
        throw new Error();
      }

      setCurrentPartner(await response.json());
      setPage('edit');
    } catch {
      setLoadError('Не удалось открыть карточку партнера. Проверьте подключение к базе данных и повторите попытку.');
    }
  };

  const savePartner = async (partner) => {
    const method = partner.partner_id ? 'PUT' : 'POST';
    const url = partner.partner_id ? `/api/partners/${partner.partner_id}` : '/api/partners';
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partner)
    });

    if (!response.ok) {
      throw new Error();
    }
  };

  const returnToMain = async () => {
    await loadPartners();
    setPage('main');
  };

  const openHistory = (partner) => {
    setCurrentPartner(partner);
    setPage('history');
  };

  if (page === 'edit') {
    return <PartnerEditWindow partner={currentPartner} onBack={returnToMain} onSave={savePartner} onSaved={returnToMain} />;
  }

  if (page === 'history') {
    return <PartnerHistoryWindow partner={currentPartner} onBack={returnToMain} />;
  }

  return <MainWindow partners={partners} error={loadError} onAdd={openNewPartner} onSelect={openPartner} onHistory={openHistory} />;
};

export default App;
