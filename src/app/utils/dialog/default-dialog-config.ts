import { MatDialogConfig } from '@angular/material/dialog';
import { DialogData } from 'src/app/modules/pokemon/models/dialog-data';

export function defaultDialogConfig(): MatDialogConfig<DialogData> {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = '80vw';
  dialogConfig.maxWidth = '70rem';
  return dialogConfig;
}
