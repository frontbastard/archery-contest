import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageDetailsComponent } from './user-manage-details.component';

describe('UserManageDetailsComponent', () => {
  let component: UserManageDetailsComponent;
  let fixture: ComponentFixture<UserManageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
