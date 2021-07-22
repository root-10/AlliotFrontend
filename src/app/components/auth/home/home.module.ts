import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { environment } from 'src/environments/environment';
import { ModalModule } from '../../shared/modal/modal.module';
import { LoaderModule } from '../../shared/loader/loader.module';

export function loginTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, environment.translate, '.json');
}

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
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
export class HomeModule { }
