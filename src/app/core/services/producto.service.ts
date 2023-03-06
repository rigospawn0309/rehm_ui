import { Producto } from 'src/app/core/models/producto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
baseUrl= 'http://localhost:4000/api/productos';



  constructor(
    private http: HttpClient
  ) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }

  getProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/${id}`);
  }

  postProducto(producto: Producto): Observable<Producto> {
    return this.http.post(this.baseUrl, producto)
  }

  putProducto(id: string, producto: Producto): Observable<Producto> {
    return this.http.put(`${this.baseUrl}/${id}`, producto);
  }

  deleteProducto(id: string): Observable<Producto> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAllProductos(): Observable<Producto> {
    return this.http.delete(this.baseUrl);
  }
}
