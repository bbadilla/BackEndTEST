import express = require('express');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';

const app: express.Application = express();

//Container
loadContainer(app);

//Controllers
app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname }
));

export { app };