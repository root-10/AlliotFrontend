import { Component, OnInit } from '@angular/core';
import { CryptojsService } from 'src/app/services/cryptojs/cryptojs.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _cryptojs: CryptojsService,
    private _restService: RestService
  ) { }

  async ngOnInit(): Promise<void> {
    let hola: any = await this._restService.readUser(1);
    console.log('------>', hola);
  }

}
