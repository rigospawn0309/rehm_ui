import { Subject } from 'rxjs';
import { ProductoService } from 'src/app/core/services/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/core/models/producto.model';
import { CommonModule } from '@angular/common';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit{
productosList:Producto[] = [];

private _unsubscribeAll = new Subject<void>();


constructor(
  private _ProductoService: ProductoService,
){}

ngOnInit(): void{
  this.getProductos();
}

ngOnDestroy(): void {
  this._unsubscribeAll.next();
  this._unsubscribeAll.complete();
}

getProductos(): void {this._ProductoService.getProductos()
  .subscribe({
    next: (productos) => {
      this.productosList = productos;
      console.log('ProductosListComponent/getProductos():', this.productosList);
    },
    error: (e) => console.error(e),
    complete(){
      console.log('ProductosListComponent/getProductos().sub.complete()');
    }
  });
}

deleteProducto(id: any){
    try {
      this._ProductoService.deleteProducto(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Producto Eliminado con exito',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error: (e) => console.error(e),
        complete(){
          console.log('ProductosListComponent/deleteProducto().sub.complete()');
        }
      });
    } catch (err) {
      console.log( 'ProductosListComponent/deleteProducto().catch, err:' , err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo ha ido Mal!',
        footer: '<a href="/">Quieres volver a la lista?</a>'
      })
    }
  }
}
