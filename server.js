import express from 'express';
import routes from './routes/index';
import envLoader from './utils/env_loader';

const app = express();
const port = process.env.PORT || 5000;
const env = process.env.npm_lifecycle_event || 'dev';

app.use(express.json({ limit: '200mb' }));
app.use('/', routes);

envLoader();
app.listen(port, () => {
  console.log(`[${env}] => Server running on http://localhost:${port}`);
});

export default app;
