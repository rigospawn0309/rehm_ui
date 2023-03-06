import { Categoria } from 'src/app/core/models/categoria.model';
export class Producto{
  _id?: number;
  marca?: string;
  modelo?: string;
  operador?: string;
  categoria?: Categoria;
  descripcion?: string;
  descripcionHTML?: string;
  estado?: string;
  cantidad?: number;
  precioCompra?: number;
}
