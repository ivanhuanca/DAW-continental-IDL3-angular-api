import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NuevaVentaComponent } from './nueva-venta/nueva-venta.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DAW-continental-IDL3-angular-api';
  constructor(private _dialog: MatDialog) { }

  openNuevaVentaForm() {
    this._dialog.open(NuevaVentaComponent);
  }
}
