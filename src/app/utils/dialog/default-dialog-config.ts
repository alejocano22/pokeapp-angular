import { MatDialogConfig } from '@angular/material/dialog';

export function defaultDialogConfig(): MatDialogConfig<any> {
  const dialogConfig = new MatDialogConfig();

  // dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '50vw';

  return dialogConfig;
}
