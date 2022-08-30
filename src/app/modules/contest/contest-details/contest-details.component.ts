import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContestRoutes } from 'src/app/common/routes';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { Contest } from 'src/app/models/contest.model';
import { LocaleService } from 'src/app/services/locale.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import {
  deleteContest,
  loadContest,
  updateContest,
} from 'src/app/store/contest/contest.actions';
import { selectContest } from 'src/app/store/contest/contest.selectors';

@Component({
  selector: 'app-contest-details',
  templateUrl: './contest-details.component.html',
})
export class ContestDetailsComponent implements OnInit {
  public contest: Contest;
  public form: FormGroup;
  public controls = {
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl(''),
    hidden: new FormControl(''),
  };
  public tabIndex = 0;

  public get isContestInitialized(): boolean {
    return Boolean(this.contest);
  }

  public get isHiddenTranslationPath(): string {
    return this.form.value.hidden
      ? 'contest.fields.status.hidden'
      : 'contest.fields.status.visible';
  }

  constructor(
    public localeService: LocaleService,
    private _route: ActivatedRoute,
    private _store: Store,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group(this.controls);

    this._store.select(selectContest).subscribe(contest => {
      if (contest === null) {
        const contestId = this._route.snapshot.paramMap.get('id');
        this._loadContest(contestId);
        return;
      }

      this.form.setValue({
        name: contest.name,
        description: contest.description,
        hidden: contest.hidden,
      });

      this.contest = { ...contest };
    });
  }

  public submitted(): void {
    if (this.form.invalid) return;
    this.contest = {
      ...this.contest,
      ...this.form.value,
    };

    this._store.dispatch(
      updateContest({
        data: this.contest,
      } as ActionRequestPayload<Contest>)
    );
    this._goBack();
  }

  public submitCancelled(): void {
    this.form.setValue({
      name: this.contest.name,
      description: this.contest.description,
      hidden: this.contest.hidden,
    });

    this._goBack();
  }

  public contestStatusClass(): string {
    return this.contest.hidden ? 'label-danger' : 'label-success';
  }

  private _loadContest(id: string): void {
    this._store.dispatch(
      loadContest({
        data: id,
      } as ActionRequestPayload<string>)
    );
  }

  public deleteContestDialog(contest: Contest): void {
    const dialogRef = this._dialog.open(DialogComponent, {
      data: {
        entity: contest,
        dialog: {
          title: 'contest.dialogs.deleteContest.title',
          content: 'contest.dialogs.deleteContest.content',
          actionButton: 'common.delete',
          actionButtonColor: 'warn',
        },
      },
    });

    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this._store.dispatch(
          deleteContest({
            data: id,
          } as ActionRequestPayload<string>)
        );
        this._goToList();
      }
    });
  }

  private _goBack() {
    this.tabIndex = 0;
  }

  private _goToList() {
    this._router.navigate([ContestRoutes.Root]);
  }
}
