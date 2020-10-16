import { MatDialogConfig } from '@angular/material/dialog';

export function defaultDialogConfig(): MatDialogConfig<any> {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = '50vw';
  return dialogConfig;
}
