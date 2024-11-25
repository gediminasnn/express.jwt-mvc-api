import Bootstrap from './Utils/Bootstrap';
import JwtController from './Controllers/JwtController';
import JwtService from './Services/JwtService';

(async () => {
  try {
    const app = new Bootstrap([]);
    app.listen();
  } catch (e) {
    console.error('Error starting the application:', e);
    process.exit(1);
  }
})();
