import express, { json, urlencoded } from 'express';
const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

// Добавляем заголовок Access-Control-Allow-Origin в ответ сервера
app.use((req, res, next ) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/api/contact', (req, res) => {
  const { name, email, message, baseCurrency, targetCurrency,amountBase,amountTarget } = req.body;
  // Далее здесь можно обрабатывать данные формы, сохранять их в базу данных и т.д.
  console.log("Получены данные формы:", name, email, message, baseCurrency, targetCurrency,amountBase,amountTarget);
  res.sendStatus(200); // Отправляем ответ клиенту, что данные получены успешно
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});