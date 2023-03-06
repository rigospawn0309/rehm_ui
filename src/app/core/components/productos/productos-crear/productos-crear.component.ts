import { Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Producto } from 'src/app/core/models/producto.model';
import { Categoria } from './../../../models/categoria.model';

import { AppSettingsService } from 'src/app/core/configs/app-settings.service';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-productos-crear',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './productos-crear.component.html',
  styleUrls: ['./productos-crear.component.css']
})
export class ProductosCrearComponent {
  productoForm: FormGroup
  submitted = false;
  titulo = 'Crear Producto'
  id: string | null;
  categoriasList: Categoria [] = [];
  operadores: string [] = [];
  estados: string [] = [];

  private _unsubscribeAll = new Subject<void>();


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _productoService: ProductoService,
    private _categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private appconfig: AppSettingsService

    ) {
    this.productoForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      operador: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      descripcionHTML: ['', Validators.required],
      estado: ['', Validators.required],
      cantidad: ['', Validators.required],
      precioCompra: ['', Validators.required]
    })
    this.id = this.route.snapshot.paramMap.get('id')
  }
  ngOnInit(): void{
    this.getCategorias();
    this.operadores = this.appconfig.operadores;
    this.estados = this.appconfig.estados;
    this.esEditar();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getCategorias(): void {this._categoriaService.getCategorias()
    .subscribe({
      next: (data) => {
        this.categoriasList = data
        console.log('ProductosCrearComponent getCategorias():', data);
      },
      error: (e) => console.error(e),
      complete(){
        console.log(' ProductosCrearComponent getCategorias().sub().complete()');
      }
    });
  }
  onSubmit(){
    try {
      const productoFormObj: Producto = {
        marca: this.productoForm.value.marca,
        modelo: this.productoForm.value.modelo,
        operador: this.productoForm.value.operador,
        categoria: this.productoForm.value.categoria,
        descripcion: this.productoForm.value.descripcion,
        descripcionHTML: this.productoForm.value.descripcionHTML,
        estado: this.productoForm.value.estado,
        cantidad: this.productoForm.value.cantidad,
        precioCompra: this.productoForm.value.precioCompra
      }
      console.log( 'ProductosCrearComponent onSubmit(), try:' , productoFormObj);

      if(this.id !== null){
        // si existe id editamos
        this._productoService.putProducto(this.id, productoFormObj)
        .subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Producto editado con exito',
              showConfirmButton: false,
              timer: 1500
            })
          },
          error: (e) => console.error(e),
          complete(){
            console.log('postProducto.putProducto.sub().complete()');
          }
        });
      }else{
        //creamos
        this._productoService.postProducto(productoFormObj)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
            Swal.fire({
              icon: 'success',
              title: 'Producto creado con exito',
              showConfirmButton: false,
              timer: 1500
            })
          },
          error: (e) => console.error(e),
          complete(){
            console.log('postProducto.postProducto.sub().complete()');
          }
        });
      }
    } catch (err) {
      console.log( 'ProductosCrearComponent onSubmit(), err:' , err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo ha ido Mal!',
        footer: '<a href="/">Quieres volver a la lista?</a>'
      })
    }
    this.router.navigate(['/'])
  }

  formReset(): void{
    this.productoForm.reset();
  }

  esEditar(){
    if(this.id !== null){
    this.titulo = 'Editar Producto';
    this._productoService.getProducto(this.id)
    .subscribe({
      next: (data) => {
        this.productoForm.patchValue({
          marca: data.marca,
          modelo: data.modelo,
          operador: data.operador,
          categoria: data.categoria,
          descripcion: data.descripcion,
          descripcionHTML: data.descripcionHTML,
          estado: data.estado,
          cantidad: data.cantidad,
          precioCompra: data.precioCompra
        })
      },
      error: (e) => console.error(e),
      complete(){
        console.log('getProductos.sub().complete()');
      }
    });
    }
  }

}
