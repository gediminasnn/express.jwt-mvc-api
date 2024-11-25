import { SignJWT, JWTPayload, KeyLike } from 'jose';
import jwkToPem from 'jwk-to-pem';
import { createPrivateKey } from 'crypto';

export default class GenerateService {
  private alg: string = 'RS256';
  private privateKeyJwk: string;

  constructor() {
    this.privateKeyJwk = process.env.PRIVATE_KEY as string;
  }

  public async generate(payload: JWTPayload): Promise<string> {
    const privateKeyPem = jwkToPem(JSON.parse(this.privateKeyJwk), { private: true });

    const privateKey = createPrivateKey({
      key: privateKeyPem,
      format: 'pem',
    });

    return new SignJWT(payload)
      .setProtectedHeader({
        alg: this.alg,
        jku: `${process.env.API_URL}jwt/public-key`,
      })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(privateKey);
  }
}
