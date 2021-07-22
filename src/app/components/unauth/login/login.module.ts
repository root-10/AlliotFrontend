import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { environment } from 'src/environments/environment';
import { LoaderModule } from '../../shared/loader/loader.module';
import { ModalModule } from '../../shared/modal/modal.module';

export function loginTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, environment.translate, '.json');
}

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: loginTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ModalModule,
    LoaderModule
  ]
})
export class LoginModule { }
