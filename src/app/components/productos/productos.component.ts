import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  endpoint: string = 'productos';

  displayedColumns: string[] = ['id', 'nombre', 'stock', 'precio', 'acciones'];

}
