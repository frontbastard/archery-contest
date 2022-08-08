import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UserRoutes } from '../common/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public siteLanguage = 'English';
  public readonly UserRoutes = UserRoutes;
  public languageList = [
    { code: 'en', label: 'English' },
    { code: 'uk', label: 'Українська' },
  ];

  constructor(
    private route: ActivatedRoute,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.translocoService.setActiveLang(params['lang']);
    // });
  }

  public changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.siteLanguage = this.languageList.find(l => l.code === lang).label;
  }

  public trackByLangs(_index, lang) {
    return lang.code;
  }
}
