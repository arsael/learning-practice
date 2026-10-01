import express from 'express';
import { getPartnersWithDiscount } from './partner-service.js';

const app = express();

app.get('/api/partners', async (_request, response) => {
  const partners = await getPartnersWithDiscount();

  response.json(partners);
});

app.listen(3000);
