import flash from 'connect-flash/lib/flash.js';
import connectMongodbSession from 'connect-mongodb-session';
import csurf from 'csurf';
import express from 'express';
import expressHandlebars from 'express-handlebars';
import session from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';
import path from 'path';
import appConfig from './config/index.js';
import CoreHelpers from './helpers/core.js';
import {
  isAuthenticatedMiddleware,
  setAuthMiddleware,
} from './middleware/auth.js';
import {
  clientErrorHandlerMiddleware,
  errorHandlerMiddleware,
  logErrorsMiddleware,
} from './middleware/error.js';
import { fileMiddleware } from './middleware/files.js';
import { userMiddleware } from './middleware/user.js';
import { notFoundPageRoute } from './routes/error.js';
import { homeRoute } from './routes/home.js';
import profileRoute from './routes/profile.js';
import tasksRoute from './routes/tasks.js';

const { MONGO_URI, DATABASE_NAME, SESSION_SECRET_PHRASE, PORT, HOST } =
  appConfig;

const app = express();

// Views
const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: CoreHelpers,
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'app/views');

// Middleware
app.use(express.static(path.resolve(path.resolve(), 'app/public')));
app.use(express.urlencoded({ extended: true }));

// Session
const store = new connectMongodbSession(session)({
  collection: 'sessions',
  uri: MONGO_URI,
  databaseName: DATABASE_NAME,
});

app.use(
  session({
    secret: SESSION_SECRET_PHRASE,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(fileMiddleware);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'", 'https://cdnjs.cloudflare.com/'],
      },
    },
  })
);
app.use(flash());
app.use(csurf());
app.use(setAuthMiddleware);
app.use(userMiddleware);

// Routes
app.use('/', homeRoute);
app.use('/profile', profileRoute);
app.use('/tasks', isAuthenticatedMiddleware, tasksRoute);
app.get('*', notFoundPageRoute);
app.use(logErrorsMiddleware);
app.use(clientErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

async function start() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    dbName: DATABASE_NAME,
  });

  app.listen(PORT, HOST, () => {
    console.info(`Server is running ${HOST}:${PORT}`);
  });
}

start();
