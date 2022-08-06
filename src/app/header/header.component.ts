import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UserRoutes } from '../common/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public siteLanguage = 'English';
  public readonly UserRoutes = UserRoutes;
  public languageList = [
    { code: 'en', label: 'English' },
    { code: 'ua', label: 'Українська' },
  ];

  constructor(private translocoService: TranslocoService) {}

  public changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.siteLanguage = this.languageList.find(l => l.code === lang).label;
  }

  public trackByLangs(index, lang) {
    return lang.code;
  }
}
