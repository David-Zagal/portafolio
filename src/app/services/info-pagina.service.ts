import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { map } from 'rxjs/operators';
import { Equipo, EquipoModels } from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-pages.json')
            .subscribe((resp: InfoPagina) => {
              this.cargada = true;
              this.info = resp;
            });
  }

  private cargarEquipo() {
    this.http.get('https://html-angular-b044d-default-rtdb.europe-west1.firebasedatabase.app/.json')
            .pipe(map(data => data['equipo']))
            .subscribe((resp: any[]) => {
              this.cargada = true;
              this.equipo = resp;
              // console.log(resp);
            })
  }
}