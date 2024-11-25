import express, { Request, Response, NextFunction } from 'express';
import { validateEnv, initLogger } from './BootstrapUtils';
import BootstrapInterface from './BootstrapInterface';
import ControllerInterface from '../Controllers/ControllerInterface';

export default class Bootstrap implements BootstrapInterface {
  public app: express.Application;
  private port: number;
  private controllers: ControllerInterface[];

  constructor(controllers: ControllerInterface[]) {
    this.app = express();
    this.controllers = controllers;
    this.port = parseInt(process.env.API_PORT as string, 10) || 3000;
    this.config();
    this.mount();
  }

  private config(): void {
    validateEnv();
    initLogger();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private mount(): void {
    this.app.get('/', (req: Request, res: Response, next: NextFunction): void => {
        res.send('Hello World!');
      });
    this.controllers.forEach((controller: ControllerInterface) => {
      this.app.use(controller.path, controller.router);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }
}
