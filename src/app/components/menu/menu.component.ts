import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  title = "sueña y crea"
  rutes = ['clientes', 'pedidos', 'productos']
  constructor(private router: Router) {}

  irARuta(vista:string) {
    this.router.navigate([vista]);
  }
}
