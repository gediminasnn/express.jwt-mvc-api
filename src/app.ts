import Bootstrap from './Utils/Bootstrap';
import GenerateController from './Controllers/Jwt/GenerateController';
import PublicKeyController from './Controllers/Jwt/PublicKeyController';
import GenerateService from './Services/Jwt/GenerateService';
import PublicKeyService from './Services/Jwt/PublicKeyService';

(async () => {
  try {
    // Instantiate Services
    const generateService = new GenerateService();
    const publicKeyService = new PublicKeyService();

    // Instantiate Controllers
    const generateController = new GenerateController(generateService);
    const publicKeyController = new PublicKeyController(publicKeyService);

    // Initialize and start the application
    const app = new Bootstrap([generateController, publicKeyController]);
    app.listen();
  } catch (e) {
    console.error('Error starting the application:', e);
    process.exit(1);
  }
})();
