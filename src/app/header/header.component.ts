import { Component } from '@angular/core';
import { UserRoutes } from '../common/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public readonly UserRoutes = UserRoutes;
}
