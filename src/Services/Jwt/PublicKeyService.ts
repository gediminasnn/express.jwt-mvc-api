export default class PublicKeyService {
  private publicKey: string;

  constructor() {
    const publicKeyJwk = process.env.PUBLIC_KEY as string;
    this.publicKey = JSON.stringify(JSON.parse(publicKeyJwk));
  }

  public get(): string {
    return this.publicKey;
  }
}
