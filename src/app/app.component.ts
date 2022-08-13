import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private _notification: NotificationService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _media: MediaMatcher
  ) {}

  ngOnInit(): void {
    this.mobileQuery = this._media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this._notification.startListen();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
