import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {PersonaService} from './services/persona.service';
import { forEach,sum,sumBy} from 'lodash';
import Persona from './modelos/Persona';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  angForm: FormGroup;
  //persons: Persona[];
  persons: Array<any> = [];
  promedio: Number;
  showProm: Boolean;
  showDesv: Boolean;

  constructor(
    private fb: FormBuilder,
    private ns: PersonaService
  ) {
    this.createForm();
  };

  createForm(){
    this.angForm=this.fb.group({
      nombre_persona :['', Validators.required],
      apellido_persona :['', Validators.required],
      edad_persona :['', Validators.required],
      nacimiento_persona :['', Validators.required],
    });
    this.ns.getNegocios().subscribe(snapshots => {
      this.persons = snapshots.map(item => {
        return {
          id: item.payload.doc.id,
          data: item.payload.doc.data(),
        };
      });
    });
  }

  addPersona(nombre_persona,apellido_persona,edad_persona,nacimiento_persona){
    this.ns.addNegocio(nombre_persona,apellido_persona,edad_persona,nacimiento_persona);
  }

  delete(id: string) {
    this.ns.deletePerson(id);
  }

  obtenerPromedio(){
    this.showProm = true;
    this.showDesv = false;
    this.ns.getNegocios().subscribe(snapshots => {
      let total = 0;
      let datos = 0;
      forEach(snapshots,value => {
        let data = value.payload.doc.data();
        let edad = parseInt(data.edad_persona);
        total = total + edad;
        datos++;
      });
      total = total/datos;
      this.promedio = +total;
    });
  }

  obtenerDesviacion(){
    this.showProm = false;
    this.showDesv = true;
    let suma = 0;
    let contador = 0;
    let sumatoria = 0;
    this.ns.getNegocios().subscribe(snapshots => {

      //SUMA TOTAL DE EDADES
      let val_suma = sumBy(snapshots, function (element) {
        contador++;
        let data = element.payload.doc.data();
        return suma + parseInt(data.edad_persona);
      });
      
      //PROMEDIO DE EDADES
      let val_promedio = val_suma/contador;

      //OBTENIENDO SUMATORIA DE EDADES AL CUADRADO
      let val_sum_pow = sumBy(snapshots, function (element) {
        let data = element.payload.doc.data();
        return sumatoria + Math.pow((parseInt(data.edad_persona) - val_promedio), 2);;
      });
      let desviacion = Math.sqrt(val_sum_pow / (contador-1));
      this.promedio = +desviacion;
    });
    
  }

  ngOnInit() {
  }

}
