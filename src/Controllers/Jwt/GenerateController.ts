import { Request, Response, Router } from 'express';
import GenerateService from '../../Services/Jwt/GenerateService';

export default class GenerateController {
  public path = '/jwt/token';
  public router = Router();
  private generateService: GenerateService;

  constructor(generateService: GenerateService) {
    this.generateService = generateService;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(this.path, this.getToken.bind(this));
  }

  private async getToken(req: Request, res: Response): Promise<void> {
    try {
      const payload = { sub: 'user123', name: 'John Doe' }; // Example payload
      const token = await this.generateService.generate(payload);
      res.json({ token });
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).send('Error generating token');
    }
  }
}
