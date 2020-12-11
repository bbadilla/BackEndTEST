import express = require('express');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';
const bodyParser = require('body-parser');
const cors = require('cors'); 


const app: express.Application = express();

//Container
loadContainer(app);

// Cors
app.use(cors());

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Controllers
app.use(loadControllers(
    'src/controllers/*.controller.ts'
));

export { app };
