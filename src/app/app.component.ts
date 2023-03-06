import { RouterModule } from '@angular/router';
import { ProductosListComponent } from './core/components/productos/productos-list/productos-list.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductosCrearComponent } from './core/components/productos/productos-crear/productos-crear.component';
import { AppNavbarComponent } from './shared/app-navbar/app-navbar.component';
import { AppSidebarComponent } from './shared/app-sidebar/app-sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports:
  [CommonModule,
  ProductosListComponent,
  ProductosCrearComponent,
  RouterModule,
  AppNavbarComponent,
  AppSidebarComponent
]
})
export class AppComponent {
  title = 'client';

}
