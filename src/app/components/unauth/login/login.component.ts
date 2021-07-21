import { Component, OnInit } from '@angular/core';
import { CryptojsService } from 'src/app/services/cryptojs/cryptojs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _cryptojs: CryptojsService
  ) { }

  ngOnInit(): void {
  }

}
