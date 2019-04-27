import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  uri='http://localhost:4000/negocio';

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) { }

  addNegocio(nombre_persona,apellido_persona,edad_persona,nacimiento_persona){
    const obj={
      nombre_persona: nombre_persona,
      apellido_persona: apellido_persona,
      edad_persona: edad_persona,
      nacimiento_persona: nacimiento_persona
    };
    return this.firestore.collection('persona').add(obj);
  }

  deletePerson(person_id: String){
    this.firestore.doc('persona/' + person_id).delete();
  }

  getNegocios(){
    return this.firestore.collection('persona').snapshotChanges();
  }

  getPerson(id){
    return this.firestore.doc('persona/'+id).snapshotChanges();
  }

  updatePerson(obj,id){
    return this.firestore.collection('persona').doc(id).set(obj);
  }
  
}
