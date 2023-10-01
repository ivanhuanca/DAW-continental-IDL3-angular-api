import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  endpoint: string = 'pedidos';

  displayedColumns: string[] = ['id', 'dni', 'producto', 'cantidad', 'acciones'];

  ngOnInit(): void {
  }


}
