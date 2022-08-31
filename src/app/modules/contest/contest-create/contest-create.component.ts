import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContestRoutes } from 'src/app/common/routes';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { Contest } from 'src/app/models/contest.model';
import { addContest } from 'src/app/store/contest/contest.actions';

@Component({
  selector: 'app-contest-create',
  templateUrl: './contest-create.component.html',
  styleUrls: ['./contest-create.component.scss'],
})
export class ContestCreateComponent implements OnInit {
  public form: FormGroup;
  public controls = {
    name: new FormControl('', [Validators.required, Validators.minLength(2)]), // TODO: Create trimValueAccessor
    description: new FormControl(''),
    hidden: new FormControl(false),
  };

  public get isHiddenTranslationPath(): string {
    return this.form.value.hidden
      ? 'contest.fields.status.hidden'
      : 'contest.fields.status.visible';
  }

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group(this.controls);
  }

  public submitted(): void {
    this._store.dispatch(
      addContest({
        data: { ...this.form.value },
      } as ActionRequestPayload<Contest>)
    );
    this._goToList(); // TODO: Question: subsctiption/try/catch?
  }

  public submitCancelled(): void {
    this.form.reset();
    this._goToList();
  }

  private _goToList() {
    this._router.navigate([ContestRoutes.Root]);
  }
}
