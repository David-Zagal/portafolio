import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosIdx } from '../interfaces/productos-idx.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductosIdx[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get(`https://html-angular-b044d-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json`)
            .subscribe((resp: ProductosIdx[]) => {
              console.log(resp);
              this.cargando = false;
              this.productos = resp;
            });
  }
}