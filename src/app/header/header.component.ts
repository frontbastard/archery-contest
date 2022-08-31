import { Component, Input, OnInit } from '@angular/core';
import { UserRoutes } from '../common/routes';
import { LocaleService } from '../services/locale.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public readonly UserRoutes = UserRoutes;
  public locales = null;
  public locale = null;

  @Input() sidenav;

  constructor(private _localeService: LocaleService) {}

  ngOnInit(): void {
    this.locales = this._localeService.locales;
    this.locale = this._localeService.locale;
    this._localeService.detectLocale();
  }

  public updateLocale(event: any): void {
    this._localeService.updateLocale(event.target.value);
  }

  public trackByLangs(_index, lang): string {
    return lang.code;
  }
}
