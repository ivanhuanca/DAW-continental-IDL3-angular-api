import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../services/api/api.service';
import { CoreService } from '../../../core/core.service';
import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  ventasForm: any = FormGroup;

  @Input() endpoint: string = '';

  selection: any;


  AD = {
    label: 'DNI',
    type: 'text',
    example: '47522224',
    formControlName: 'dni',
    matAutocomplete: 'clientes',
    hint: '8 digitos',
  }


  cliOps: any;

  option: any;

  proOps: any;

  constructor(private _fb: FormBuilder,
    private _apiService: ApiService,
    private _dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
  ) {
  }


  initForm() {

    this.ventasForm = this._fb.group({
      dni: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{8}$'),
        Validators.minLength(8),
        Validators.maxLength(8),
        this.validateOp
      ]
      ],
      producto: ['', [Validators.required]],
      cantidad: [1,
        [
          Validators.required,
          Validators.pattern('^(0*[1-9][0-9]*)$')
        ]
      ],
    })

    /*this.selection = this.ventasForm.get('dni').valueChanges.pipe(
      debounceTime(300), // Espera 300 ms de inactividad en la entrada
      distinctUntilChanged(), // Evita solicitudes duplicadas
      switchMap((response: any) => this.findItemOption('clientes', response))
    );*/

    this.cliOps = this.ventasForm.get('dni').valueChanges.pipe(
      debounceTime(300), // Espera 300 ms de inactividad en la entrada
      distinctUntilChanged(), // Evita solicitudes duplicadas
      switchMap((response: any) => this.findItemOption('clientes', response))
    );

    this.proOps = this.ventasForm.get('producto').valueChanges.pipe(
      debounceTime(300), // Espera 300 ms de inactividad en la entrada
      distinctUntilChanged(), // Evita solicitudes duplicadas
      switchMap((response: any) => this.findItemOption('productos', response))
    );
  }

  validateOp(d: any) {
    /*console.log('validateOp', d.value, d.errors, d)
    if(d.status=="VALID"){
      console.log("VALID")
    }*/https://apiperu.dev/api/dni/INGRESAR_NUMERO_DNI_AQUI?api_token=INGRESAR_TOKEN_AQUI
    console.log(d.status)
    console.log(d)
    return null
  }

  findItemOption(endpoint: string, q: string) {
    this.option = this._apiService.getItemOption(endpoint, q)
    return this.option
  }

  ngOnInit(): void {
    console.log(this.endpoint)
    this.initForm();
    this.ventasForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.ventasForm.valid) {
      if (this.data) { //Actualizar
        console.log('update', this.data, this.endpoint)
        this._apiService.updateItem(this.endpoint, this.data.id, this.ventasForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Venta actualizada con exito!', 'ok')
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      } else {
        console.log('create', this.endpoint)
        this._apiService.addItem(this.endpoint, this.ventasForm.value).subscribe({
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
