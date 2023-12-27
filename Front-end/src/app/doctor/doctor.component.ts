import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    Router: Router
  ) { }

  title = 'MANEJO DE DOCTORES'; //Titulo dela página
  tituloDoctUniLista = ''; //Titulo Lista de todos los catalogos
  tituloDoctUniListaDoc = '';
  titloDoctUniBuscado = ''; //Titulo de Color Buscado
  titloDoctUniEditar = ''; //Titulo de Color a Editar
  tituloCataDocUniLista = '';
  tituloCataSexoUniLista = '';
  tituloCataUsuarioUniLista = '';
  tituloCataEspecialidadUniLista = '';
  tituloDoctUniListaID = '';

  DoctUniT: any = []; //Lista de todos los catalogos
  DoctUniTID: any = [];
  DoctiUniTEsp: any = [];
  DoctUniCataEdi: any = [];
  DoctUniDoctor: any = [];
  DoctorUniEdi: any = [];
  CataDocUniT: any = [];
  CataSexoUniT: any = [];
  CataUsuarioUniT: any = [];
  CataEspecialidadUniT : any = [];
  mostrarFormulario = false;

  tabladoctorestotales: any = []; //Encabezados tabla catalogos totales
  tabladoctorestotalesDoc: any = [];
  tablacatalogoDocTotales: any = [];
  tablacatalogoSexoTotales: any = [];
  tablacatalogoUsuarioTotales: any = [];
  tablacatalogoEspecialidadTotales: any = [];
  tabladoctorestotalesID: any = [];

  ListarDoctTotales = new FormGroup({});

  CBDoctorEsp = new FormGroup({
    DocEspfiltro: new FormControl(),
    textEsp: new FormControl(),
  });

  CrearDoctorU = new FormGroup({
    textNueNom1Doct: new FormControl(),
    textNueNom2Doct: new FormControl(),
    textApell1Doct: new FormControl(),
    textApell2Doct: new FormControl(),
    textFechaDoct: new FormControl(),
    textHorarioDoct: new FormControl(),
    textTipDocDoct: new FormControl(),
    textNumDocDoct: new FormControl(),
    textTipSexDoc: new FormControl(),
    textTipUsuDoc: new FormControl(),
    textTipEspDoc: new FormControl(),
    textCorrLogDoc: new FormControl(),
    textContraLogDoc: new FormControl(),
  });

  ActDoctorU = new FormGroup({
    CBDoctorEdi: new FormControl(),
    textNueNom1DoctEdi: new FormControl(),
    textNueNom2DoctEdi: new FormControl(),
    textApell1DoctEdi: new FormControl(),
    textApell2DoctEdi: new FormControl(),
    textFechaDoctEdi: new FormControl(),
    textHorarioDoctEdi: new FormControl(),
    textTipDocDoctEdi: new FormControl(),
    textNumDocDoctEdi: new FormControl(),
    textTipSexDocEdi: new FormControl(),
    textTipUsuDocEdi: new FormControl(),
    textTipEspDocEdi: new FormControl(),
    textCorrLogDocEdi: new FormControl(),
    textContraLogDocEdi: new FormControl(),
  });

  CBDoctorID = new FormGroup({
    PerIDfiltro: new FormControl(),
    textID: new FormControl(),
  });

  BuscarEvalor = 1; //Control para carga del valor a buscar
  controlLista = 1;
  controlLista1 = 1;
  flag: boolean = false

  DoctorSeleccionado: any;

  obtenerDoctorSeleccionado(id_Doctor: any) {
    this.servi.getlDocEspSelec(id_Doctor).subscribe((data) => {
      this.DoctorSeleccionado = data;
    });
  }

  public consultaCatalogoDocTotales() {
    if (this.controlLista == 1) {
      this.servi.getCatalogoDocTotal().subscribe(
        (data: { doctor: [] }) => {
          this.CataDocUniT = data; //JSON.parse(data);
          this.tituloCataDocUniLista = 'LISTA DE TODOS LOS TIPOS DE DOCUMENTO';
          this.tablacatalogoDocTotales[0] = 'Id';
          this.tablacatalogoDocTotales[1] = 'Nombre ';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CataDocUniT = null;
      this.tituloCataDocUniLista = '';
      this.tablacatalogoDocTotales[0] = '';
      this.tablacatalogoDocTotales[1] = '';
    }
  }
  
  public consultaCatalogoSexoTotales() {
    if (this.controlLista == 1) {
      this.servi.getCatalogoSexoTotal().subscribe(
        (data: { doctor: [] }) => {
          this.CataSexoUniT = data; //JSON.parse(data);
          this.tituloCataSexoUniLista = 'LISTA DE TODOS LOS TIPOS DE PREFERENCIA SEXUAL';
          this.tablacatalogoSexoTotales[0] = 'Id';
          this.tablacatalogoSexoTotales[1] = 'Nombre ';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CataSexoUniT = null;
      this.tituloCataSexoUniLista = '';
      this.tablacatalogoSexoTotales[0] = '';
      this.tablacatalogoSexoTotales[1] = '';
    }
  }

  public consultaCatalogoUsuarioTotales() {
    if (this.controlLista == 1) {
      this.servi.getCatalogoUsuarioTotal().subscribe(
        (data: { doctor: [] }) => {
          this.CataUsuarioUniT = data; //JSON.parse(data);
          this.tituloCataUsuarioUniLista = 'LISTA DE TODOS LOS TIPOS DE USUARIO';
          this.tablacatalogoUsuarioTotales[0] = 'Id';
          this.tablacatalogoUsuarioTotales[1] = 'Nombre ';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CataUsuarioUniT = null;
      this.tituloCataUsuarioUniLista = '';
      this.tablacatalogoUsuarioTotales[0] = '';
      this.tablacatalogoUsuarioTotales[1] = '';
    }
  }

  public consultaCatalogoEspecialidadTotales() {
    if (this.controlLista == 1) {
      this.servi.getCatalogoEspecialidadTotal().subscribe(
        (data: { doctor: [] }) => {
          this.CataEspecialidadUniT = data; //JSON.parse(data);
          this.tituloCataEspecialidadUniLista = 'LISTA DE TODOS LOS TIPOS DE USUARIO';
          this.tablacatalogoEspecialidadTotales[0] = 'Id';
          this.tablacatalogoEspecialidadTotales[1] = 'Nombre ';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CataEspecialidadUniT = null;
      this.tituloCataEspecialidadUniLista = '';
      this.tablacatalogoEspecialidadTotales[0] = '';
      this.tablacatalogoEspecialidadTotales[1] = '';
    }
  }

  public consultaDoctoresID(caiddoc: any) {
    if (this.controlLista1 == 1) {
      this.servi.getlListDoctorID('/'+caiddoc).subscribe(
        (data: { doctor: [] }) => {
          this.DoctUniTID = data; //JSON.parse(data);
          this.tituloDoctUniListaID = 'LISTA DEL DOCTOR';
          this.tabladoctorestotalesID[0] = 'Id';
          this.tabladoctorestotalesID[1] = 'Nombre Doctor';
          this.tabladoctorestotalesID[5] = 'Fecha Nacimiento';
          this.tabladoctorestotalesID[6] = 'Horarios';
          this.tabladoctorestotalesID[7] = 'Tipo Documento';
          this.tabladoctorestotalesID[8] = 'Numero Documento';
          this.tabladoctorestotalesID[9] = 'Sexo';
          this.tabladoctorestotalesID[10] = 'Tipo Usuario';
          this.tabladoctorestotalesID[11] = 'Tipo Especialidad';
          this.tabladoctorestotalesID[12] = 'Correo Login';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.DoctUniTID = null;
      this.tituloDoctUniListaID = '';
      this.tabladoctorestotalesID[0] = '';
      this.tabladoctorestotalesID[1] = '';
      this.tabladoctorestotalesID[2] = '';
      this.tabladoctorestotalesID[3] = '';
      this.tabladoctorestotalesID[4] = '';
      this.tabladoctorestotalesID[5] = '';
      this.tabladoctorestotalesID[6] = '';
      this.tabladoctorestotalesID[7] = '';
      this.tabladoctorestotalesID[8] = '';
      this.tabladoctorestotalesID[9] = '';
      this.tabladoctorestotalesID[10] = '';
      this.tabladoctorestotalesID[11] = '';
      this.tabladoctorestotalesID[12] = '';
      this.controlLista1 = 1;
    }
  }

  public consultaDoctoresTotales(list: boolean) {
    if (this.controlLista == 1) {
      this.servi.getDoctorTotal().subscribe(
        (data: { doctor: [] }) => {
          if (list == true) this.flag = list
          this.DoctUniT = data; //JSON.parse(data);
          this.tituloDoctUniLista = 'LISTA DE TODOS LOS DOCTOR';
          this.tabladoctorestotales[0] = 'Id';
          this.tabladoctorestotales[1] = 'Nombre Doctor';
          this.tabladoctorestotales[5] = 'Fecha Nacimiento';
          this.tabladoctorestotales[6] = 'Horarios';
          this.tabladoctorestotales[7] = 'Tipo Documento';
          this.tabladoctorestotales[8] = 'Numero Documento';
          this.tabladoctorestotales[9] = 'Sexo';
          this.tabladoctorestotales[10] = 'Tipo Usuario';
          this.tabladoctorestotales[11] = 'Tipo Especialidad';
          this.tabladoctorestotales[12] = 'Correo Login';
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
      this.tabladoctorestotales[2] = '';
      this.tabladoctorestotales[3] = '';
      this.tabladoctorestotales[4] = '';
      this.tabladoctorestotales[5] = '';
      this.tabladoctorestotales[6] = '';
      this.tabladoctorestotales[7] = '';
      this.tabladoctorestotales[8] = '';
      this.tabladoctorestotales[9] = '';
      this.tabladoctorestotales[10] = '';
      this.tabladoctorestotales[11] = '';
      this.tabladoctorestotales[12] = '';
      this.controlLista = 1;
    }
  }

  public consultaDoctorEsp(caesp: any) {
    if (this.controlLista1 == 1) {
      this.servi.getlListDoctorEsp('/' + caesp).subscribe(
        (data: { doctor: [] }) => {
          this.DoctiUniTEsp = data; //JSON.parse(data);
          this.tituloDoctUniListaDoc = 'LISTA DE TODOS LOS PACIENTES';
          this.tabladoctorestotalesDoc[0] = 'Id';
          this.tabladoctorestotalesDoc[1] = 'Nombre Doctor';
          this.tabladoctorestotalesDoc[5] = 'Fecha Nacimiento';
          this.tabladoctorestotalesDoc[6] = 'Horarios';
          this.tabladoctorestotalesDoc[7] = 'Tipo Documento';
          this.tabladoctorestotalesDoc[8] = 'Numero Documento';
          this.tabladoctorestotalesDoc[9] = 'Sexo';
          this.tabladoctorestotalesDoc[10] = 'Tipo Usuario';
          this.tabladoctorestotalesDoc[11] = 'Tipo Especialidad';
          this.tabladoctorestotalesDoc[12] = 'Correo Login';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.DoctiUniTEsp = null;
      this.tituloDoctUniListaDoc = '';
      this.tabladoctorestotalesDoc[0] = '';
      this.tabladoctorestotalesDoc[1] = '';
      this.tabladoctorestotalesDoc[2] = '';
      this.tabladoctorestotalesDoc[3] = '';
      this.tabladoctorestotalesDoc[4] = '';
      this.tabladoctorestotalesDoc[5] = '';
      this.tabladoctorestotalesDoc[6] = '';
      this.tabladoctorestotalesDoc[7] = '';
      this.tabladoctorestotalesDoc[8] = '';
      this.tabladoctorestotalesDoc[9] = '';
      this.tabladoctorestotalesDoc[10] = '';
      this.tabladoctorestotalesDoc[11] = '';
      this.tabladoctorestotalesDoc[12] = '';
      this.controlLista1 = 1;
    }
  }

  public LimpiarTablaDoc() {
    this.DoctiUniTEsp = null; // Establece los datos en null para limpiar la tabla de "Pacientes Tipo Documento"
    this.tituloDoctUniListaDoc = ''; // Limpia el título de la tabla si es necesario
    this.tabladoctorestotalesDoc = []; // Limpia las columnas de la tabla si es necesario
    this.controlLista1 = 0;
  }

  public LimpiarLista(list: boolean) {
    if (list == false) this.flag = list
    this.controlLista = 0;
  }

  ngOnInit(): void {
    this.ListarDoctTotales = this.formBuilder.group({});

    this.ActDoctorU = this.formBuilder.group({
      CBDoctorEdi: [],
      textNueNom1DoctEdi: [],
      textNueNom2DoctEdi: [],
      textApell1DoctEdi: [],
      textApell2DoctEdi: [],
      textFechaDoctEdi: [],
      textHorarioDoctEdi: [],
      textTipDocDoctEdi: [],
      textNumDocDoctEdi: [],
      textTipSexDocEdi: [],
      textTipUsuDocEdi: [],
      textTipEspDocEdi: [],
      textCorrLogDocEdi: [],
      textContraLogDocEdi: [],
    });

    this.CBDoctorEsp = this.formBuilder.group({
      DocEspfiltro: [],
      textEsp: [],
    });

    this.CBDoctorID = this.formBuilder.group({
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

  public SelDoctorEditar() {
    this.BuscarEvalor = this.ActDoctorU.getRawValue()['CBDoctorEdi'];

    this.servi.getlDocEdit(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.DoctorUniEdi = data;
        console.log(this.DoctorUniEdi);

        //console.log(" aca 45 " + this.CataUniCataEdi.length + " y la data  " + data.length);
        this.tituloDoctUniLista = 'DOCTOR A EDITAR';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  insertDoctor() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.CrearDoctorU.getRawValue()['textNueNom1Doct'];
    var datosvalo2 = this.CrearDoctorU.getRawValue()['textNueNom2Doct'];
    var datosvalo3 = this.CrearDoctorU.getRawValue()['textApell1Doct'];
    var datosvalo4 = this.CrearDoctorU.getRawValue()['textApell2Doct'];
    var datosvalo5 = this.CrearDoctorU.getRawValue()['textFechaDoct'];
    var datosvalo6 = this.CrearDoctorU.getRawValue()['textHorarioDoct'];
    var datosvalo7 = this.CrearDoctorU.getRawValue()['textTipDocDoct'];
    var datosvalo8 = this.CrearDoctorU.getRawValue()['textNumDocDoct'];
    var datosvalo9 = this.CrearDoctorU.getRawValue()['textTipSexDoc'];
    var datosvalo10 = this.CrearDoctorU.getRawValue()['textTipUsuDoc'];
    var datosvalo11 = this.CrearDoctorU.getRawValue()['textTipEspDoc'];
    var datosvalo12 = this.CrearDoctorU.getRawValue()['textCorrLogDoc'];
    var datosvalo13 = this.CrearDoctorU.getRawValue()['textContraLogDoc'];

    //JSON armado
    var cadena = {
      nom1_doc: datosvalo1,
      nom2_doc: datosvalo2,
      apell1_doc: datosvalo3,
      apell2_doc: datosvalo4,
      nacimiento_doc: datosvalo5,
      horario_doc: datosvalo6,
      tipo_docu_doc: datosvalo7,
      num_doc_doc: datosvalo8,
      sexo_doc: datosvalo9,
      tipo_usuario_doc: datosvalo10,
      tipo_espe_doc: datosvalo11,
      login_correo_doc: datosvalo12,
      login_contrasena_doc: datosvalo13,
    };

    //se consume el servicio
    this.servi
      .CrearDoctorU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //this.LimpiarFormulario();
    this.CrearDoctorU.reset();
  }
  public ActualizarDoctor() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.ActDoctorU.getRawValue()['CBDoctorEdi'];
    var datosvalo2 = this.ActDoctorU.getRawValue()['textNueNom1DoctEdi'];
    var datosvalo3 = this.ActDoctorU.getRawValue()['textNueNom2DoctEdi'];
    var datosvalo4 = this.ActDoctorU.getRawValue()['textApell1DoctEdi'];
    var datosvalo5 = this.ActDoctorU.getRawValue()['textApell2DoctEdi'];
    var datosvalo6 = this.ActDoctorU.getRawValue()['textFechaDoctEdi'];
    var datosvalo7 = this.ActDoctorU.getRawValue()['textHorarioDoctEdi'];
    var datosvalo8 = this.ActDoctorU.getRawValue()['textTipDocDoctEdi'];
    var datosvalo9 = this.ActDoctorU.getRawValue()['textNumDocDoctEdi'];
    var datosvalo10 = this.ActDoctorU.getRawValue()['textTipSexDocEdi'];
    var datosvalo11 = this.ActDoctorU.getRawValue()['textTipUsuDocEdi'];
    var datosvalo12 = this.ActDoctorU.getRawValue()['textTipEspDocEdi'];
    var datosvalo13 = this.ActDoctorU.getRawValue()['textCorrLogDocEdi'];
    var datosvalo14 = this.ActDoctorU.getRawValue()['textContraLogDocEdi'];

    //JSON armado
    var cadena = {
      id_doctor: datosvalo1,
      nom1_doc: datosvalo2,
      nom2_doc: datosvalo3,
      apell1_doc: datosvalo4,
      apell2_doc: datosvalo5,
      nacimiento_doc: datosvalo6,
      horario_doc: datosvalo7,
      tipo_docu_doc: datosvalo8,
      num_doc_doc: datosvalo9,
      sexo_doc: datosvalo10,
      tipo_usuario_doc: datosvalo11,
      tipo_espe_doc: datosvalo12,
      login_correo_doc: datosvalo13,
      login_contrasena_doc: datosvalo14,
    };

    console.log(cadena)

    //se consume el servicio
    this.servi
      .ActualizarDoctorU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.CrearDoctorU.reset();
  }
}
