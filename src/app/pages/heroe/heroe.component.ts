import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
// SweetAlert2
import Swal from 'sweetalert2';




@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel();

  constructor( private heroeService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo') {
      this.heroeService.getHeroe( id ).subscribe( (response: HeroeModel) => {
        this.heroe = response;
        this.heroe.id = id;
        // console.log(response);
      });
    }
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
       peticion = this.heroeService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroeService.crearHeroe(this.heroe);
    }

    peticion.subscribe( response => {

      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
    });

  }
}
