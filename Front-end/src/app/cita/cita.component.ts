import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css'],
})
export class CitaComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    Router: Router
  ) {}

  //LAS VARIABLES

  InfoCalificacion: any = [];
  InfoEsPe: any = [];

  title = 'MANEJO DE CITAS'; //Titulo dela página
  tituloInfoCalificacion = '';
  tituloInfoEspe = '';
  tituloDoctUniLista = '';
  tituloCitaUniListaID = '';
  tituloPaciUniLista = '';
  tituloCitaUniLista = ''; //Titulo Lista de todos los catalogos
  tituloCitaUniListaEst = '';
  titloCitaUniBuscado = ''; //Titulo de Color Buscado
  titloCitaUniEditar = ''; //Titulo de Color a Editar

  InfoCalUniT: any = [];
  DoctUniT: any = [];
  CitaUniTID: any = [];
  PaciUniT: any = [];
  CitaUniT: any = []; //Lista de todos los catalogos
  CitaUniCataEdi: any = [];
  CitaUniEst: any = [];
  CitaUniEdi: any = [];
  mostrarFormulario = false;

  tablaInformeCal: any = []; //Encabezados informe de calificacion
  tablaInfoEspe: any = [];
  tablacitastotales: any = []; //Encabezados tabla catalogos totales
  tabladoctorestotales: any = []; //Encabezados tabla catalogos totales
  tablapacientestotales: any = [];
  tablacitastotalesID: any = [];
  tablacitastotalesEst: any = [];
  informeCitaData: any = [];

  ListarCitasTotales = new FormGroup({});
  ListarDoctTotales = new FormGroup({});

  InformeCalificacionG = new FormGroup({
    textCalifacion: new FormControl(),
    textFechaIn: new FormControl(),
    textFechaFin: new FormControl(),
  });

  InformeCalificacionE = new FormGroup({
    textEspecialidad: new FormControl(),
    textEstado: new FormControl(),
    textFechaIn: new FormControl(),
    textFechaFin: new FormControl(),
  });

  CrearCitaU = new FormGroup({
    textfecha: new FormControl(),
    texttipoestado: new FormControl(),
    textiddoctor: new FormControl(),
    textidpaciente: new FormControl(),
    textcomen: new FormControl(),
  });

  ActCitaU = new FormGroup({
    CBCitaEdi: new FormControl(),
    textfechaEdi: new FormControl(),
    texttipoestadoEdi: new FormControl(),
    textiddoctorEdi: new FormControl(),
    textidpacienteEdi: new FormControl(),
    textcomenEdi: new FormControl(),
  });

  CBCitaEst = new FormGroup({
    PerEstfiltro: new FormControl(),
    textEst: new FormControl(),
  });

  CBCitaID = new FormGroup({
    PerIDfiltro: new FormControl(),
    textID: new FormControl(),
  });

  BuscarEvalor = 1; //Control para carga del valor a buscar
  controlLista = 1; //Control para limpiar la lista
  controlLista1 = 1;
  flag: boolean = false;

  CitaSeleccionado: any;
  DoctorSeleccionado: any; // Almacena el paciente seleccionado

  // Método para obtener el paciente seleccionado
  obtenerCitaSeleccionado(id_cita: any) {
    this.servi.getlPacEspSelec(id_cita).subscribe((data) => {
      this.CitaSeleccionado = data;
    });
  }

  obtenerDoctorSeleccionado(id_Doctor: any) {
    this.servi.getlDocEspSelec(id_Doctor).subscribe((data) => {
      this.DoctorSeleccionado = data;
    });
  }

  public consultaDoctoresTotales() {
    if (this.controlLista == 1) {
      this.servi.getDoctorTotal().subscribe(
        (data: { doctor: [] }) => {
          this.DoctUniT = data; //JSON.parse(data);
          this.tituloDoctUniLista = 'LISTA DE TODOS LOS DOCTORES';
          this.tabladoctorestotales[0] = 'Id';
          this.tabladoctorestotales[1] = 'Nombre Doctor';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.DoctUniT = null;
      this.tituloDoctUniLista = '';
      this.tabladoctorestotales[0] = '';
      this.tabladoctorestotales[1] = '';
      this.controlLista = 1;
    }
  }

  public consultaPacientesTotales() {
    if (this.controlLista == 1) {
      this.servi.getPacienteTotal().subscribe(
        (data: { paciente: [] }) => {
          this.PaciUniT = data; //JSON.parse(data);
          this.tituloPaciUniLista = 'LISTA DE TODOS LOS PACIENTES';
          this.tablapacientestotales[0] = 'Id';
          this.tablapacientestotales[1] = 'Nombre Paciente';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.PaciUniT = null;
      this.tituloPaciUniLista = '';
      this.tablapacientestotales[0] = '';
      this.tablapacientestotales[1] = '';
      this.controlLista = 1;
    }
  }

  public consultaCitasID(caidcita: any) {
    if (this.controlLista1 == 1) {
      this.servi.getlListCitaID('/'+caidcita).subscribe(
        (data: { paciente: [] }) => {
          this.CitaUniTID = data; //JSON.parse(data);
          this.tituloCitaUniListaID = 'LISTA DE LA CITA';
          this.tablacitastotalesID[0] = 'Id';
          this.tablacitastotalesID[1] = 'Fecha de la Cita';
          this.tablacitastotalesID[2] = 'Estado de la Cita';
          this.tablacitastotalesID[3] = 'Doctor';
          this.tablacitastotalesID[4] = 'Paciente';
          this.tablacitastotalesID[5] = 'Comentario de la Cita';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CitaUniTID = null;
      this.tituloCitaUniListaID = '';
      this.tablacitastotalesID[0] = '';
      this.tablacitastotalesID[1] = '';
      this.tablacitastotalesID[2] = '';
      this.tablacitastotalesID[3] = '';
      this.tablacitastotalesID[4] = '';
      this.tablacitastotalesID[5] = '';
      this.controlLista1 = 1;
    }
  }

  public consultaCitasTotales(list: boolean) {
    if (this.controlLista == 1) {
      this.servi.getCitaTotal().subscribe(
        (data: { cita: [] }) => {
          if (list == true) this.flag = list;
          this.CitaUniT = data; //JSON.parse(data);
          this.tituloCitaUniLista = 'LISTA DE TODOS LAS CITAS';
          this.tablacitastotales[0] = 'Id';
          this.tablacitastotales[1] = 'Fecha de la Cita';
          this.tablacitastotales[2] = 'Estado de la Cita';
          this.tablacitastotales[3] = 'Doctor';
          this.tablacitastotales[4] = 'Paciente';
          this.tablacitastotales[5] = 'Comentario de la Cita';
          console.log(this.CitaUniT);
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
      this.tablacitastotales[3] = '';
      this.tablacitastotales[4] = '';
      this.tablacitastotales[5] = '';
      this.controlLista = 1;
    }
  }

  public consultaCitasEst(caest: any) {
    if (this.controlLista1 == 1) {
      this.servi.getlListCitaEst('/' + caest).subscribe(
        (data: { cita: [] }) => {
          this.CitaUniEst = data;
          this.tituloCitaUniListaEst = 'LISTA DE TODAS LAS CITAS';
          this.tablacitastotalesEst[0] = 'Id';
          this.tablacitastotalesEst[1] = 'Fecha de la Cita';
          this.tablacitastotalesEst[2] = 'Estado de la Cita';
          this.tablacitastotalesEst[3] = 'Doctor';
          this.tablacitastotalesEst[4] = 'Paciente';
          this.tablacitastotalesEst[5] = 'Comentario de la Cita';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CitaUniEst = null;
      this.tituloCitaUniListaEst = '';
      this.tablacitastotalesEst[0] = '';
      this.tablacitastotalesEst[1] = '';
      this.tablacitastotalesEst[2] = '';
      this.tablacitastotalesEst[3] = '';
      this.tablacitastotalesEst[4] = '';
      this.tablacitastotalesEst[5] = '';
      this.controlLista1 = 1;
    }
  }

  //--------------------------------------------------------------------------------------------->
  //para Limpiar la lista
  public LimpiarTablaEst() {
    this.CitaUniEst = null; // Establece los datos en null para limpiar la tabla de "Pacientes Tipo Documento"
    this.tituloCitaUniListaEst = ''; // Limpia el título de la tabla si es necesario
    this.tablacitastotalesEst = []; // Limpia las columnas de la tabla si es necesario
    this.controlLista1 = 0;
  }

  public LimpiarLista(list: boolean) {
    if (list == false) this.flag = list;
    this.controlLista = 0;
  }

  //=============================================================
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  //=============================================================

  ngOnInit(): void {
    this.ListarCitasTotales = this.formBuilder.group({});

    this.ActCitaU = this.formBuilder.group({
      CBCitaEdi: [],
      textfechaEdi: [],
      texttipoestadoEdi: [],
      textiddoctorEdi: [],
      textidpacienteEdi: [],
      textcomenEdi: [],
    });

    this.CBCitaEst = this.formBuilder.group({
      PerEstfiltro: [],
      textEst: [],
    });

    this.CBCitaID = this.formBuilder.group({
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

  //Selecccionar Una Paciente

  public SelCitaEditar() {
    this.BuscarEvalor = this.ActCitaU.getRawValue()['CBCitaEdi'];

    this.servi.getlCitaEdit(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.CitaUniEdi = data;
        console.log(this.CitaUniEdi);

        //console.log(" aca 45 " + this.CataUniCataEdi.length + " y la data  " + data.length);
        this.titloCitaUniEditar = 'CITA A EDITAR';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //-------------------------------------------------------------------------
  //Para insertar una nuevo catalogo

  insertCita() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.CrearCitaU.getRawValue()['textfecha'];
    var datosvalo2 = this.CrearCitaU.getRawValue()['texttipoestado'];
    var datosvalo3 = this.CrearCitaU.getRawValue()['textiddoctor'];
    var datosvalo4 = this.CrearCitaU.getRawValue()['textidpaciente'];
    var datosvalo5 = this.CrearCitaU.getRawValue()['textcomen'];

    //JSON armado
    var cadena = {
      fecha_cita: datosvalo1,
      tipo_estado_cita: datosvalo2,
      id_doctor_cita: datosvalo3,
      id_paciente_cita: datosvalo4,
      comen_cita: datosvalo5,
    };

    //se consume el servicio
    this.servi
      .CrearCitaU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //this.LimpiarFormulario();
    this.CrearCitaU.reset();
  }

  informeCalificacion() {
    var datoCalificacion =
    this.InformeCalificacionG.getRawValue()['textCalifacion'];
    var datoFechaIn = this.InformeCalificacionG.getRawValue()['textFechaIn'];
    var datoFechaFin = this.InformeCalificacionG.getRawValue()['textFechaFin'];

    var cadena = {
      calificacion: datoCalificacion,
      fechaInicio: datoFechaIn,
      fechaFin: datoFechaFin,
    };
    this.servi.postInformeCalificacion(cadena).subscribe(
      (data: {}) => {
        this.InfoCalificacion = data;
        console.log(this.InfoCalificacion);  
        this.InfoCalificacion = data;
          this.tituloInfoEspe = 'LISTA DE INFORME POR CALIFICACION';
          this.tablaInformeCal[0] = 'NOMBRE DOCTOR';
          this.tablaInformeCal[1] = 'CALIFICACION';
          this.tablaInformeCal[2] = 'COMENTARIOS';
          this.tablaInformeCal[3] = 'ESTADO CITA';
          this.tablaInformeCal[4] = 'FECHA CITA';
          this.tablaInformeCal[5] = 'ESPECIALIDAD';
      },
      (error) => {
        console.log(error);
        this.InfoCalificacion = null;
      this.tituloInfoEspe = '';
      this.tablaInformeCal[0] = '';
      this.tablaInformeCal[1] = '';
      this.tablaInformeCal[2] = '';
      this.tablaInformeCal[3] = '';
      this.tablaInformeCal[4] = '';
      this.tablaInformeCal[5] = '';
      }
    );
  }

  informeEsPeCita(){
    var datoEstado = this.InformeCalificacionE.getRawValue()['textEstado'];
    var datoEspecialidad = this.InformeCalificacionE.getRawValue()['textEspecialidad'];
    var datoFechaIn = this.InformeCalificacionE.getRawValue()['textFechaIn'];
    var datoFechaFin = this.InformeCalificacionE.getRawValue()['textFechaFin'];

    var cadena = {
      "especialidad" : datoEspecialidad,
      "estado" : datoEstado,
      "fechaInicio" : datoFechaIn,
      "fechaFin" : datoFechaFin
    }
    this.servi.postInformeEsPe(cadena).subscribe((data: {})=>{
      this.InfoEsPe = data
      // this.InfoCalEsPeT = data
      this.tituloInfoEspe = "INFORME POR ESTADO Y ESPECIALIDAD DE LA CITA";
      this.tablaInfoEspe[0] = "Id calificacion"
      this.tablaInfoEspe[1] = "Numero de la calificacion"
      this.tablaInfoEspe[2] = "Comentarios"
      this.tablaInfoEspe[3] = "Especialidad"
      this.tablaInfoEspe[4] = "Estado de la cita"
      this.tablaInfoEspe[5] = "Nombre del doctor"
    }, error => {console.log(error)})
  }
  // -----------------------------------------------------------------------------------------

  public ActualizarCita() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.ActCitaU.getRawValue()['CBCitaEdi'];
    var datosvalo2 = this.ActCitaU.getRawValue()['textfechaEdi'];
    var datosvalo3 = this.ActCitaU.getRawValue()['texttipoestadoEdi'];
    var datosvalo4 = this.ActCitaU.getRawValue()['textiddoctorEdi'];
    var datosvalo5 = this.ActCitaU.getRawValue()['textidpacienteEdi'];
    var datosvalo6 = this.ActCitaU.getRawValue()['textcomenEdi'];

    //JSON armado
    var cadena = {
      id_cita: datosvalo1,
      fecha_cita: datosvalo2,
      tipo_estado_cita: datosvalo3,
      id_doctor_cita: datosvalo4,
      id_paciente_cita: datosvalo5,
      comen_cita: datosvalo6,
    };

    //se consume el servicio
    this.servi
      .ActualizarCitaU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.CrearCitaU.reset();
  }
}
