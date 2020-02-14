import express, { Request, Response, NextFunction } from 'express';
import { MainController, PlanetController } from './controllers';
import * as bodyParser from 'body-parser';
import * as paginate from 'express-paginate';
import * as ERRO from '../utils/erros.json';


const app: express.Application = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.disable('x-powered-by');
app.use(
  bodyParser.json({
    limit: '50mb'
  })
);
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/', MainController, PlanetController);
app.use(paginate.middleware(10, 50));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  res.send(ERRO.NOT_FOUND);
});

app.listen(port, () =>
  console.log(`The Web Server is Listening at http://${host}:${port}`)
);

export const App: express.Application = app;