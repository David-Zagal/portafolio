import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  constructor(private http: HttpClient) {
    this.http.get('assets/data/data-pages.json')
            .subscribe((resp: InfoPagina) => {
              this.cargada = true;
              this.info = resp;
            });
  }
}