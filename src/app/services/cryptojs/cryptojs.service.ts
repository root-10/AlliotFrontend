import { Injectable } from '@angular/core';
import * as Cryptojs from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptojsService {

  constructor() { }

  encryptStorage(key: string, data: any): void {
    try {
      localStorage.setItem(key, Cryptojs.AES.encrypt(JSON.stringify(data), environment.key).toString());
    } catch (e) {
      throw new Error(e);
    }
  }

  decryptStorage(key: string): any {
    try {
      return localStorage.getItem(key) ? JSON.parse(Cryptojs.AES.decrypt(localStorage.getItem(key) || '', environment.key).toString(Cryptojs.enc.Utf8)) : '';
    } catch (e) {
      throw new Error(e);
    }
  }
}
