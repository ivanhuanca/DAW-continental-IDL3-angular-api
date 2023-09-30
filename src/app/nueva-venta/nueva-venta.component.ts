import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private _fb: FormBuilder) {
    this.ventasForm = this._fb.group({
      dni: '',
      producto: '',
      cantidad: '',
    })
  }

  onFormSubmit() {
    if (this.ventasForm.valid) {
      console.log(this.ventasForm.value)
    }
  }
}
