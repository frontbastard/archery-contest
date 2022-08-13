import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeUk from '@angular/common/locales/uk';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './http-interceptors/auth-interceptors';
import { MaterialModule } from './material/material.module';
import { UserManageModule } from './modules/user-manage/user-manage.module';
import { TranslocoRootModule } from './transloco-root.module';

registerLocaleData(localeEn, 'en');
registerLocaleData(localeUk, 'uk');
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UserManageModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Archery Contest App',
      logOnly: environment.production,
    }),
    TranslocoRootModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // TODO: Refactor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
