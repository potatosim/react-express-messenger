import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/message', (req, res) => {
  res.json({ message: 'Hello' });
});

app.listen(PORT, () => {
  console.log('server is running');
});
