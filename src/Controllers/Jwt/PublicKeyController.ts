import { Request, Response, Router } from 'express';
import PublicKeyService from '../../Services/Jwt/PublicKeyService';

export default class PublicKeyController {
  public path = '/jwt/public-key';
  public router = Router();
  private publicKeyService: PublicKeyService;

  constructor(publicKeyService: PublicKeyService) {
    this.publicKeyService = publicKeyService;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(this.path, this.getPublicKey.bind(this));
  }

  private getPublicKey(req: Request, res: Response): void {
    try {
      const publicKey = this.publicKeyService.get();
      res.json(JSON.parse(publicKey));
    } catch (error) {
      console.error('Error retrieving public key:', error);
      res.status(500).send('Error retrieving public key');
    }
  }
}
