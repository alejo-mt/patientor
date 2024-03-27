import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/ping', (_req, res) => {
  return res.status(200).json({ message: 'pong' });
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
