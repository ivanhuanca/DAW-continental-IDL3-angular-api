import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NuevaVentaComponent } from './nueva-venta/nueva-venta.component';
import { VentasService } from './services/ventas.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DAW-continental-IDL3-angular-api';

  displayedColumns: string[] = ['id', 'dni', 'producto', 'cantidad', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,
    private _ventasService: VentasService) { }

  openNuevaVentaForm() {
    const dialogRef = this._dialog.open(NuevaVentaComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getVentasList();
        }
      }
    })
  }

  ngOnInit(): void{
    this.getVentasList();
  }

  getVentasList() {
    this._ventasService.getVentasList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err:any) => {
        console.error(err)
      }
    })
  }

  deleteVenta(id: number){
    this._ventasService.deleteVenta(id).subscribe({
      next: (res) => {
        alert('venta eliminada!')
        this.getVentasList()
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
