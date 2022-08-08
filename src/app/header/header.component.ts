import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UserRoutes } from '../common/routes';
import { LocaleService } from '../services/locale.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public readonly UserRoutes = UserRoutes;

  constructor(public localeService: LocaleService) {}

  ngOnInit(): void {
    this.localeService.detectLocale();
  }

  public updateLocale(event: any): void {
    this.localeService.updateLocale(event.target.value);
  }

  public trackByLangs(_index, lang): string {
    return lang.code;
  }
}
