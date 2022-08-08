import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './services/in-memory-data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { UserManageModule } from './modules/user-manage/user-manage.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthInterceptor } from './http-interceptors/auth-interceptors';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { TranslocoRootModule } from './transloco-root.module';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeUk from '@angular/common/locales/uk';

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
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
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
