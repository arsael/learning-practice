import express from 'express';
import { getPartnersWithDiscount } from './partner-service.js';
import { createPartner, getPartnerById, updatePartner } from '../../Учебная практика 21.09.2026/Интеграция формы с БД (CRUD-операции и обновление UI)/partner-crud-service.js';
import { getSalesHistoryByPartner } from '../../Учебная практика 28.09.2026/Разработка интерфейса истории реализации продукции/history-service.js';
import { logError } from '../../Учебная практика 28.09.2026/Модульное тестирование (Unit Testing) и аудит безопасности/logger.js';

const app = express();

app.use(express.json());

app.get('/api/partners', async (_request, response) => {
  try {
    const partners = await getPartnersWithDiscount();

    response.json(partners);
  } catch (error) {
    logError(error);
    response.status(500).json({ message: 'Не удалось получить список партнеров.' });
  }
});

app.get('/api/partners/:partnerId', async (request, response) => {
  try {
    const partner = await getPartnerById(request.params.partnerId);

    if (!partner) {
      response.status(404).json({ message: 'Партнер не найден.' });
      return;
    }

    response.json(partner);
  } catch (error) {
    logError(error);
    response.status(500).json({ message: 'Не удалось открыть карточку партнера.' });
  }
});

app.post('/api/partners', async (request, response) => {
  try {
    const partner = await createPartner(request.body);

    response.status(201).json(partner);
  } catch (error) {
    logError(error);
    response.status(error.status ?? 500).json({ message: error.message });
  }
});

app.put('/api/partners/:partnerId', async (request, response) => {
  try {
    const partner = await updatePartner(request.params.partnerId, request.body);

    if (!partner) {
      response.status(404).json({ message: 'Партнер не найден.' });
      return;
    }

    response.json(partner);
  } catch (error) {
    logError(error);
    response.status(error.status ?? 500).json({ message: error.message });
  }
});

app.get('/api/partners/:partnerId/history', async (request, response) => {
  try {
    response.json(await getSalesHistoryByPartner(request.params.partnerId));
  } catch (error) {
    logError(error);
    response.status(500).json({ message: 'Не удалось получить историю продаж.' });
  }
});

app.listen(3000);
