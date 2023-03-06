import { ProductosListComponent } from './app/core/components/productos/productos-list/productos-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { __importDefault } from 'tslib';
import { importProvidersFrom } from '@angular/core';
import { ProductosCrearComponent } from './app/core/components/productos/productos-crear/productos-crear.component';
import { provideHttpClient } from "@angular/common/http";

const routes: Routes = [
  {path: '',  component: ProductosListComponent},
  {path: 'crear-producto',  component: ProductosCrearComponent},
  {path: 'editar-producto/:id',  component: ProductosCrearComponent},
  {path: '**',  redirectTo: '', pathMatch: 'full'},
  ];

bootstrapApplication(AppComponent,{
  providers:[
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideHttpClient()
  ]
})
  .catch(err => console.error(err));
