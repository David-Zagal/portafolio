import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Productos } from '../../interfaces/productos.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  id: string;
  productos: Productos;

  constructor(private route: ActivatedRoute, public itemsService: ProductosService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemsService.cargarItems(params['id'])
                      .subscribe((resp: Productos) => {
                        this.productos = resp;
                        this.id = params['id'];
                      });
    });
  }
}