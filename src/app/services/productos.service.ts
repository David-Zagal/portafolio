import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosIdx } from '../interfaces/productos-idx.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductosIdx[] = [];
  productoFiltrado: ProductosIdx[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise<void>( (resolve, reject) => {
      this.http.get(`https://html-angular-b044d-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json`)
            .subscribe((resp: ProductosIdx[]) => {
              this.productos = resp;
              this.cargando = false;
              resolve();
            });
    });
  }

  cargarItems(id: string) {
    return this.http.get(`https://html-angular-b044d-default-rtdb.europe-west1.firebasedatabase.app/productos/${id}.json`);
  }

  buscarProducto(txt: string) {
    if (this.productos.length === 0) {
      // cargar los productos
      this.cargarProductos().then( () => {
        // ejecutar despues de cargar los productos
        this.filtrarProductos(txt);
      });
    } else {
      this.filtrarProductos(txt);
    }
  }

  private filtrarProductos(txt: string) {
    this.productoFiltrado = [];
    txt = txt.toLowerCase();
    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if (prod.categoria.indexOf(txt) >= 0 || tituloLower.indexOf(txt) >= 0) {
        this.productoFiltrado.push(prod);
      }
    });
  }
}