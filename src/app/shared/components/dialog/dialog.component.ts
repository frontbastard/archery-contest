import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

interface Data<TEntity> {
  entity: TEntity;
  dialog: {
    title: string;
    content: string;
    actionButton: string;
    actionButtonColor?: string;
  };
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data<User>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
