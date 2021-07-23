import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private _router: Router
  ) { }

  async logout(): Promise<void> {
    localStorage.clear();
    await this._router.navigateByUrl('login', { replaceUrl: true });
  }
}
