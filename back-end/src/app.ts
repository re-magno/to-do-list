import cors = require('cors');
import express = require('express');
// import errorHandler from './middlewares/errorHandler';
// import routes from './routes';


class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    // this.app.use(routes);
    // this.app.use(errorHandler);
  }

  public start(PORT: string | number):void {
    console.log(`Executando na porta ${PORT}`);
    this.app.listen(PORT);
  }
}

export { App };
