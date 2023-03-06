import { Categoria } from 'src/app/core/models/categoria.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  baseUrl= 'http://localhost:4000/api/categorias';


    constructor(
      private http: HttpClient
    ) { }

    getCategorias(): Observable<Categoria[]> {
      return this.http.get<Categoria[]>(this.baseUrl);
    }

    getcategoria(id: string): Observable<Categoria> {
      return this.http.get<Categoria>(`${this.baseUrl}/${id}`);
    }

    postCategoria(categoria: Categoria): Observable<Categoria> {
      return this.http.post(this.baseUrl, categoria)
    }

    putcategoria(id: string, categoria: Categoria): Observable<Categoria> {
      return this.http.put(`${this.baseUrl}/${id}`, categoria);
    }

    deletecategoria(id: string): Observable<Categoria> {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }

    deleteAllcategorias(): Observable<Categoria> {
      return this.http.delete(this.baseUrl);
    }
}
