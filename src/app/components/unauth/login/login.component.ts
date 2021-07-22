import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CryptojsService } from 'src/app/services/cryptojs/cryptojs.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoader: boolean = false;
  form: Login = {
    user: '',
    pass: ''
  };
  isUserInputFocused: boolean = false;
  isPasswordInputFocused: boolean = false;
  typeInputPassword: string = 'password';

  constructor(
    private _router: Router,
    private _cryptojs: CryptojsService,
    private _restService: RestService
  ) { }

  ngOnInit(): void { }

  focusedInput(type: string, option: boolean): void {
    switch (type) {
      case 'user':
        this.isUserInputFocused = !option && !this.form.user ? false : true;
        break;
      case 'password':
        this.isPasswordInputFocused = !option && !this.form.pass ? false : true;
    }
  }

  async login(): Promise<void> {
    if (this.form.user && this.form.pass) {
      try {
        this.isLoader = true;
        const data: any = await this._restService.postLogin(this.form.user, this.form.pass);
        this.isLoader = false;
        console.log(data);
        this._cryptojs.encryptStorage('user', data);
        await this._router.navigateByUrl('home', { replaceUrl: true });
      } catch {
        console.log('error');
      }
    }
  }

}

interface Login {
  user: string,
  pass: string
};