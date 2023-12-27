import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent {

  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    router: Router
  ) { }

  title = 'MANEJO DE CALIFICACIONES';
  tituloCalifUniLista = '';
  tituloCitaUniLista = '';
  tituloCalifUniListaID = '';
  titloCalifUniEditar = '';
  tituloCalifUniListaNum = '';

  CalifUniT: any = [];
  CitaUniT: any = [];
  CalifUniTID: any = [];
  CalifUniEdi: any = [];
  CalifUniNum: any = [];
  mostrarFormulario = false;

  tablacaliftotales: any = [];
  tablacitastotales: any = [];
  tablacaliftotalesNum: any = [];
  tablacaliftotalesID: any = [];
  ListarCalifTotales = new FormGroup({});

  CrearCalifU = new FormGroup({
    textnumcalif: new FormControl(),
    textcomencalif: new FormControl(),
    textidcita: new FormControl(),
  });

  ActCalifU = new FormGroup({
    CBCalifEdi: new FormControl(),
    textnumcalifEdi: new FormControl(),
    textcomencalifEdi: new FormControl(),
    textidcitaEdi: new FormControl(),
  });

  CBCalifNum = new FormGroup({
    PerNumfiltro: new FormControl(),
    textNum: new FormControl(),
  });

  CBCalifID = new FormGroup({
    PerIDfiltro: new FormControl(),
    textID: new FormControl(),
  });

  BuscarEvalor = 1; //Control para carga del valor a buscar
  controlLista = 1; //Control para limpiar la lista
  controlLista1 = 1;
  flag: boolean = false;

  CalifSeleccionado: any;

  obtenerCalifSeleccionado(id_calificacion: any) {
    this.servi.getCalifEspSelec(id_calificacion).subscribe((data) => {
      this.CalifSeleccionado = data;
    });
  }

  public consultaCitasTotales() {
    if (this.controlLista == 1) {
      this.servi.getCitaTotal().subscribe(
        (data: { cita: [] }) => {
          this.CitaUniT = data; //JSON.parse(data);
          this.tituloCitaUniLista = 'LISTA DE TODOS LAS CITAS';
          this.tablacitastotales[0] = 'Id';
          this.tablacitastotales[1] = 'Fecha de la Cita';
          this.tablacitastotales[2] = 'Paciente';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CitaUniT = null;
      this.tituloCitaUniLista = '';
      this.tablacitastotales[0] = '';
      this.tablacitastotales[1] = '';
      this.tablacitastotales[2] = '';
      this.controlLista = 1;
    }

  }

  public consultaCalifID(caiddoc: any) {
    if (this.controlLista1 == 1) {
      this.servi.getlListCalifID('/'+caiddoc).subscribe(
        (data: { calificacion: [] }) => {
          this.CalifUniTID = data; //JSON.parse(data);
          this.tituloCalifUniListaID = 'LISTA DE LA CALIFICACION';
          this.tablacaliftotalesID[0] = 'Id';
          this.tablacaliftotalesID[1] = 'Calificacion';
          this.tablacaliftotalesID[2] = 'Comentario';
          this.tablacaliftotalesID[3] = 'Paciente';
          this.tablacaliftotalesID[4] = 'Doctor';
          this.tablacaliftotalesID[5] = 'Fecha de la Cita';

        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CalifUniTID = null;
      this.tituloCalifUniListaID = '';
      this.tablacaliftotalesID[0] = '';
      this.tablacaliftotalesID[1] = '';
      this.tablacaliftotalesID[2] = '';
      this.tablacaliftotalesID[3] = '';
      this.tablacaliftotalesID[4] = '';
      this.tablacaliftotalesID[5] = '';
      this.controlLista1 = 1;
    }
  }

  public consultaCalifTotales(list: boolean) {
    if (this.controlLista == 1) {
      this.servi.getCalifTotal().subscribe(
        (data: { calificacion: [] }) => {
          if (list == true) this.flag = list
          this.CalifUniT = data; //JSON.parse(data);
          this.tituloCalifUniLista = 'LISTA DE TODAS LOAS CALIFICACIONES';
          this.tablacaliftotales[0] = 'Id';
          this.tablacaliftotales[1] = 'Calificacion';
          this.tablacaliftotales[2] = 'Comentario';
          this.tablacaliftotales[3] = 'Paciente';
          this.tablacaliftotales[4] = 'Doctor';
          this.tablacaliftotales[5] = 'Fecha de la Cita';
          console.log(this.CalifUniT)
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CalifUniT = null;
      this.tituloCalifUniLista = '';
      this.tablacaliftotales[0] = '';
      this.tablacaliftotales[1] = '';
      this.tablacaliftotales[2] = '';
      this.tablacaliftotales[3] = '';
      this.tablacaliftotales[4] = '';
      this.tablacaliftotales[5] = '';
      this.controlLista = 1;
    }
  }

  public consultaCalifNum(canum: any) {
    if (this.controlLista1 == 1) {
      this.servi.getlListCalifNum('/' + canum).subscribe(
        (data: { calificacion: [] }) => {
          this.CalifUniNum = data;
          this.tituloCalifUniListaNum = 'LISTA DE TODOS LOS CONTACTOS';
          this.tablacaliftotalesNum[0] = 'Id';
          this.tablacaliftotalesNum[1] = 'Tipo de Contacto';
          this.tablacaliftotalesNum[2] = 'Contacto';
          this.tablacaliftotalesNum[3] = 'Paciente';
          this.tablacaliftotalesNum[4] = 'Doctor';
          this.tablacaliftotalesNum[5] = 'Fecha de la Cita';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CalifUniNum = null;
      this.tituloCalifUniListaNum = '';
      this.tablacaliftotalesNum[0] = '';
      this.tablacaliftotalesNum[1] = '';
      this.tablacaliftotalesNum[2] = '';
      this.tablacaliftotalesNum[3] = '';
      this.tablacaliftotalesNum[4] = '';
      this.tablacaliftotalesNum[5] = '';
      this.controlLista1 = 1;
    }
  }

  public LimpiarLista(list: boolean) {
    if (list == false) this.flag = list
    this.controlLista = 0;
  }

  public LimpiarTablaNum() {
    this.CalifUniNum = null; // Establece los datos en null para limpiar la tabla de "Pacientes Tipo Documento"
    this.tituloCalifUniListaNum = ''; // Limpia el tÃ­tulo de la tabla si es necesario
    this.tablacaliftotalesNum = []; // Limpia las columnas de la tabla si es necesario
    this.controlLista1 = 0;
  }

  ngOnInit(): void {

    this.ListarCalifTotales = this.formBuilder.group({});

    this.ActCalifU = this.formBuilder.group({
      CBCalifEdi: [],
      textnumcalifEdi: [],
      textcomencalifEdi: [],
      textidcitaEdi: [],
    });

    this.CBCalifNum = this.formBuilder.group({
      PerNumfiltro: [],
      textNum: [],
    })

    this.CBCalifID = this.formBuilder.group({
      PerIDfiltro: [],
      textID: [],
    });


  }

  mostrarForm() {
    this.mostrarFormulario = true;
  }

  ocultarForm() {
    this.mostrarFormulario = false;
  }

  public SelCalifEditar() {
    this.BuscarEvalor = this.ActCalifU.getRawValue()['CBCalifEdi'];

    this.servi.getlCalifEdit(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.CalifUniEdi = data;
        console.log(this.CalifUniEdi);

        //console.log(" aca 45 " + this.CataUniCataEdi.length + " y la data  " + data.length);
        this.titloCalifUniEditar = 'CONTACTO A EDITAR';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  InsertCalif() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.CrearCalifU.getRawValue()['textnumcalif'];
    var datosvalo2 = this.CrearCalifU.getRawValue()['textcomencalif'];
    var datosvalo3 = this.CrearCalifU.getRawValue()['textidcita'];

    //JSON armado
    var cadena = {
      num_calificacion: datosvalo1,
      comen_calificacion: datosvalo2,
      id_cita_calificacion: datosvalo3,
    };

    //se consume el servicio
    this.servi
      .CrearCalifU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //this.LimpiarFormulario();
    this.CrearCalifU.reset();
  }

  public ActualizarCalifU() {

    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.ActCalifU.getRawValue()['CBCalifEdi'];
    var datosvalo2 = this.ActCalifU.getRawValue()['textnumcalifEdi'];
    var datosvalo3 = this.ActCalifU.getRawValue()['textcomencalifEdi'];
    var datosvalo4 = this.ActCalifU.getRawValue()['textidcitaEdi'];

    //JSON armado
    var cadena = {
      id_calificacion: datosvalo1,
      num_calificacion: datosvalo2,
      comen_calificacion: datosvalo3,
      id_cita_calificacion: datosvalo4,
    };

    //se consume el servicio
    this.servi
      .ActualizarCalifU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.CrearCalifU.reset();

  }

}
