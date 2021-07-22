import { Injectable } from '@angular/core';
import * as Cryptojs from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptojsService {
  readonly KEY: string = this.decode(environment.key);

  constructor() { }

  encryptStorage(key: string, data: any): void {
    try {
      localStorage.setItem(key.trim(), Cryptojs.AES.encrypt(JSON.stringify(data), this.KEY).toString());
    } catch (e) {
      throw new Error(e);
    }
  }

  decryptStorage(key: string): any {
    try {
      return localStorage.getItem(key) ? JSON.parse(Cryptojs.AES.decrypt(localStorage.getItem(key)?.trim() || '', this.KEY).toString(Cryptojs.enc.Utf8)) : '';
    } catch (e) {
      throw new Error(e);
    }
  }

  encode(decoded: any): string {
    return Cryptojs.enc.Base64.stringify(Cryptojs.enc.Utf8.parse(decodeURIComponent(decoded)));
  }

  decode(encoded: string): any {
    return Cryptojs.enc.Utf8.stringify(Cryptojs.enc.Base64.parse(encoded));
  }
}
