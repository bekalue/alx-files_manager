import express from 'express';
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

app.use('/', routes);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});

export default app;
