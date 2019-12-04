import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import models from './models';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);