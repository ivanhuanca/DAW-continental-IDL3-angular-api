import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VentasService } from '../services/ventas.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css']
})
export class NuevaVentaComponent implements OnInit {
  ventasForm: FormGroup;

  muebles: string[] = [
    'Mueble Tipo 1',
    'Mueble Tipo 2',
    'Mueble Tipo 3',
    'Mueble Tipo 4'
  ];

  constructor(private _fb: FormBuilder,
    private _ventasService: VentasService,
    private _dialogRef: MatDialogRef<NuevaVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
    ) {
    this.ventasForm = this._fb.group({
      dni: '',
      producto: '',
      cantidad: '',
    })
  }

  ngOnInit(): void {
    this.ventasForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.ventasForm.valid) {
      if (this.data) { //Actualizar
        this._ventasService.updateVenta(this.data.id, this.ventasForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Venta actualizada con exito!', 'ok')
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      } else {
        this._ventasService.addVenta(this.ventasForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Venta Añadida con exito!', 'ok')
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    }
  }
}
