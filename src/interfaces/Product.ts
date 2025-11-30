export interface Category {
  idCategoria: number;
  nombre: string;
}

export interface Product {
  idProduct: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria?: Category;   
  categoriaId?: number;   

}
