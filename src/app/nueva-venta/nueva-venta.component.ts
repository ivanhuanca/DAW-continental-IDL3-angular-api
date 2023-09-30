import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VentasService } from '../services/ventas.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css']
})
export class NuevaVentaComponent {
  ventasForm: FormGroup;

  muebles: string[] = [
    'Mueble Tipo 1',
    'Mueble Tipo 2',
    'Mueble Tipo 3',
    'Mueble Tipo 4'
  ];

  constructor(private _fb: FormBuilder,
    private _ventasService: VentasService,
    private _dialogRef: DialogRef<NuevaVentaComponent>) {
    this.ventasForm = this._fb.group({
      dni: '',
      producto: '',
      cantidad: '',
    })
  }

  onFormSubmit() {
    if (this.ventasForm.valid) {
      this._ventasService.addVenta(this.ventasForm.value).subscribe({
        next: (val: any) => {
          alert('Venta Añadida con exito!')
          this._dialogRef.close()
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    }
  }
}
