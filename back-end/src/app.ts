import express from 'express';
import cors = require('cors');
import routes from './routes';
import Middlewares from './middlewares';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(routes);
    this.app.use(Middlewares.error);
  }

  public start(PORT: string | number):void {
    console.log(`Rodando na porta ${PORT}`);
    
    this.app.listen(PORT);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
