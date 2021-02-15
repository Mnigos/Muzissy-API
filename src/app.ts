import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes';

const app: Application = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(routes);

export default app;
