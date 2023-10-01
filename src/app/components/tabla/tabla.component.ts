import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { DialogComponent } from 'src/app/components/dialog/dialog/dialog.component';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit, AfterViewInit {

  @Input() displayedColumns: Array<any> = [];
  @Input() endpoint: string = '';

  //displayedColumns: string[] = ['id', 'dni', 'producto', 'cantidad', 'acciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,
    private _apiService: ApiService,
    private _coreService: CoreService) { }

  openNuevaVentaForm() {
    const dialogRef = this._dialog.open(DialogComponent);
    dialogRef.componentInstance.endpoint = this.endpoint;
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVentasLista();
        }
      }
    });
  }

  ngOnInit(): void {
    this.getVentasLista();
  }

  getVentasLista() {
    console.log(this.endpoint)
    this._apiService.getItemsList(this.endpoint).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }

  deleteVenta(id: number) {
    this._apiService.deleteItem(this.endpoint, id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Venta eliminada!', 'ok')
        this.getVentasLista()
      },
      error: console.log,
    })
  }

  editVentaForm(data: any) {
    console.log(data)
    const dialogRef = this._dialog.open(DialogComponent, {
      data
    });
    dialogRef.componentInstance.endpoint = this.endpoint;

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVentasLista();
        }
      }
    });
  }

  //Filtro de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    // Configura el paginador y la ordenación después de que se inicialicen
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
