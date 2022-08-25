import { Component } from '@angular/core';
import { ContestRoutes, UserRoutes } from '../common/routes';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public readonly UserRoutes = UserRoutes;
  public readonly ContestRoutes = ContestRoutes;
}
