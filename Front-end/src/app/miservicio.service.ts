import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class MiservicioService {
  private Url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = JSON.parse('' + res);

    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // SERVICIO  CATALOGO UNIVERSAL
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getCatalogoTotal(): Observable<any> {
    return this.http.get(this.Url + 'Universal', httpOptions);
  }

  getPacienteTotal(): Observable<any> {
    return this.http.get(this.Url + 'Paciente', httpOptions);
  }

  getDoctorTotal(): Observable<any> {
    return this.http.get(this.Url + 'Doctor', httpOptions);
  }

  getCitaTotal(): Observable<any> {
    return this.http.get(this.Url + 'Cita', httpOptions);
  }

  getContactoTotal(): Observable<any> {
    return this.http.get(this.Url + 'Contacto', httpOptions);
  }

  getCalifTotal(): Observable<any> {
    return this.http.get(this.Url + 'Calificacion', httpOptions);
  }

  getCatalogoDocTotal(): Observable<any> {
    return this.http.get(this.Url + 'Universal/Doc/1', httpOptions);
  }

  getCatalogoSexoTotal(): Observable<any> {
    return this.http.get(this.Url + 'Universal/Doc/2', httpOptions);
  }

  getCatalogoUsuarioTotal(): Observable<any> {
    return this.http.get(this.Url + 'Universal/Doc/3', httpOptions);
  }

  getCatalogoEspecialidadTotal(): Observable<any> {
    return this.http.get(this.Url + 'Universal/Doc/4', httpOptions);
  }

  getCatalogoContactoTotal(): Observable<any> {
    return this.http.get(this.Url + 'Universal/Doc/5', httpOptions);
  }

  //-------------------------------------------------------------

  getlListCatologoEsp(tipcat: any): Observable<any> {
    return this.http.get(this.Url + 'Universal' + tipcat, httpOptions);
  }

  getlListPersonaDoc(cadoc: any): Observable<any> {
    return this.http.get(this.Url + 'Paciente/Doc' + cadoc, httpOptions);
  }

  getlListPacienteID(caid: any): Observable<any> {
    return this.http.get(this.Url + 'Paciente/Id' + caid, httpOptions);
  }

  getlListDoctorID(caiddoc: any): Observable<any> {
    return this.http.get(this.Url + 'Doctor/Id' + caiddoc, httpOptions);
  }

  getlListCitaID(caidcita: any): Observable<any> {
    return this.http.get(this.Url + 'Cita/Id' + caidcita, httpOptions)
  }

  getlListCalifID(caidcalif: any): Observable<any> {
    return this.http.get(this.Url + 'Calificacion/Id' + caidcalif, httpOptions)
  }

  getlListContactoID(caidcontacto: any): Observable<any> {
    return this.http.get(this.Url + 'Contacto/Id' + caidcontacto, httpOptions)
  }

//----------------------------------------------------------------------------------------------

  getlListDoctorEsp(caesp: any): Observable<any> {
    return this.http.get(this.Url + 'Doctor/Esp' + caesp, httpOptions);
  }

  getlListCitaEst(caest: any): Observable<any> {
    return this.http.get(this.Url + 'Cita/Est' + caest, httpOptions);
  }

  getlListContactoTip(catip: any): Observable<any> {
    return this.http.get(this.Url + 'Contacto/Cont' + catip, httpOptions);
  }

  getlListCalifNum(canum: any): Observable<any> {
    return this.http.get(this.Url + 'Calificacion/Calif' + canum, httpOptions);
  }
  //-------------------------------------------------------------

  getlCatEspSelec(IdCat: any): Observable<any> {
    return this.http.get(this.Url + 'Universal' + IdCat, httpOptions);
  }

  getlPacEspSelec(id_Paciente: any): Observable<any> {
    return this.http.get(this.Url + 'Paciente/Id/' + id_Paciente, httpOptions);
  }

  getlDocEspSelec(id_Doctor: any): Observable<any> {
    return this.http.get(this.Url + 'Doctor/Id/' + id_Doctor, httpOptions);
  }

  getCalifEspSelec(id_calificacion: any): Observable<any> {
    return this.http.get(this.Url + 'Calificacion/Id/' + id_calificacion, httpOptions);
  }

  //-------------------------------------------------------------
  // Método para insertar un nuevo Catalogo

  getlCatEdit(Id: any): Observable<any> {
    return this.http.get(this.Url + 'Universal/Id/I/' + Id, httpOptions);
  }

  getlPacEdit(Id: any): Observable<any> {
    return this.http.get(this.Url + 'Paciente/Id/' + Id, httpOptions);
  }

  getlDocEdit(Id: any): Observable<any> {
    return this.http.get(this.Url + 'Doctor/Id/' + Id, httpOptions);
  }

  getlCitaEdit(Id: any): Observable<any> {
    return this.http.get(this.Url + 'Cita/Id/' + Id, httpOptions);
  }

  getlContactoEdit(Id: any): Observable<any> {
    return this.http.get(this.Url + 'Contacto/Id/' + Id, httpOptions);
  }

  getlCalifEdit(Id: any): Observable<any> {
    return this.http.get(this.Url + 'Calificacion/Id/' + Id, httpOptions)
  }

  async CrearCatalogoU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + 'Universal/Id', Dato, httpOptions).toPromise();
    });
  }

  async CrearPacienteU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + 'Paciente', Dato, httpOptions).toPromise();
    });
  }

  async CrearDoctorU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + 'Doctor', Dato, httpOptions).toPromise();
    });
  }

  async CrearCitaU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + 'Cita', Dato, httpOptions).toPromise();
    });
  }

  async CrearContactoU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + 'Contacto', Dato, httpOptions).toPromise();
    });
  }

  async CrearCalifU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + 'Calificacion', Dato, httpOptions).toPromise();
    })
  }

  postInformeCalificacion(parametros: any): Observable<any> {
    return this.http.post(this.Url + "Cita/Informe", parametros, httpOptions)
  }

  postInformeEsPe(parametros: any): Observable<any> {
    return this.http.post(this.Url + "Cita/InformeEs", parametros, httpOptions)
  }

  // Método para modificar un Catalogo

  async ActualizarCatalogoU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + 'Universal', Dato, httpOptions).toPromise();
    });
  }

  async ActualizarPacienteU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + 'Paciente', Dato, httpOptions).toPromise();
    });
  }

  async ActualizarDoctorU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + 'Doctor', Dato, httpOptions).toPromise();
    });
  }

  async ActualizarCitaU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + 'Cita', Dato, httpOptions).toPromise();
    });
  }

  async ActualizarContactoU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + 'Contacto', Dato, httpOptions).toPromise();
    });
  }

  async ActualizarCalifU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + 'Calificacion', Dato, httpOptions).toPromise();
    })
  }
}
