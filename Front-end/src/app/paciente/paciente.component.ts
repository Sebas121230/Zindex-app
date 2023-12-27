import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
})
export class PacienteComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    Router: Router
  ) { }

  //LAS VARIABLES
  title = 'MANEJO DE PACIENTES'; //Titulo dela página
  tituloPaciUniLista = ''; //Titulo Lista de todos los catalogos
  tituloPaciUniListaDoc = '';
  tituloPaciUniListaID = '';
  tituloCataDocUniLista = '';
  tituloCataSexoUniLista = '';
  tituloCataUsuarioUniLista = '';
  titloPaciUniBuscado = ''; //Titulo de Color Buscado
  titloPaciUniEditar = ''; //Titulo de Color a Editar

  PaciUniT: any = []; //Lista de todos los catalogos
  PaciUniTID: any = [];
  PaciUniTDoc: any = [];
  PaciUniCataEdi: any = [];
  PacUniPaciente: any = [];
  PacienteUniEdi: any = [];
  CataDocUniT: any = [];
  CataSexoUniT: any = [];
  CataUsuarioUniT: any = [];
  mostrarFormulario = false;

  tablapacientestotales: any = []; //Encabezados tabla catalogos totales
  tablapacientestotalesDoc: any = []; //Encabezados tabla catalogos totales
  tablapacientestotalesID: any = [];
  tablacatalogoDocTotales: any = [];
  tablacatalogoSexoTotales: any = [];
  tablacatalogoUsuarioTotales: any = [];
  ListarPaciTotales = new FormGroup({});

  CrearPacienteU = new FormGroup({
    textNueNom1: new FormControl(),
    textNueNom2: new FormControl(),
    textApell1: new FormControl(),
    textApell2: new FormControl(),
    textFecha: new FormControl(),
    textAlergia: new FormControl(),
    textEstatura: new FormControl(),
    textPeso: new FormControl(),
    textTipDoc: new FormControl(),
    textNumDoc: new FormControl(),
    textTipSex: new FormControl(),
    textTipUsu: new FormControl(),
    textCorrLog: new FormControl(),
    textContraLog: new FormControl(),
  });

  ActPacienteU = new FormGroup({
    CBPacienteEdi: new FormControl(),
    textNueNom1Edi: new FormControl(),
    textNueNom2Edi: new FormControl(),
    textApell1Edi: new FormControl(),
    textApell2Edi: new FormControl(),
    textFechaEdi: new FormControl(),
    textAlergiaEdi: new FormControl(),
    textEstaturaEdi: new FormControl(),
    textPesoEdi: new FormControl(),
    textTipDocEdi: new FormControl(),
    textNumDocEdi: new FormControl(),
    textTipSexEdi: new FormControl(),
    textTipUsuEdi: new FormControl(),
    textCorrLogEdi: new FormControl(),
    textContraLogEdi: new FormControl(),
  });

  CBPersonaDoc = new FormGroup({
    PerDocfiltro: new FormControl(),
    textDoc: new FormControl(),
  });

  CBPacienteID = new FormGroup({
    PerIDfiltro: new FormControl(),
    textID: new FormControl(),
  });

  BuscarEvalor = 1; //Control para carga del valor a buscar
  controlLista = 1; //Control para limpiar la lista
  controlLista1 = 1;
  flag: boolean = false

  pacienteSeleccionado: any; // Almacena el paciente seleccionado

  obtenerPacienteSeleccionado(id_Paciente: any) {
    this.servi.getlPacEspSelec(id_Paciente).subscribe((data) => {
      this.pacienteSeleccionado = data;
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

  public consultaPacientesID(caid: any) {
    if (this.controlLista1 == 1) {
      this.servi.getlListPacienteID('/' + caid).subscribe(
        (data: { paciente: [] }) => {
          this.PaciUniTID = data; //JSON.parse(data);
          this.tituloPaciUniListaID = 'LISTA DEL PACIENTE';
          this.tablapacientestotalesID[0] = 'Id';
          this.tablapacientestotalesID[1] = 'Nombre Paciente';
          this.tablapacientestotalesID[5] = 'Fecha Nacimiento';
          this.tablapacientestotalesID[6] = 'Alergias';
          this.tablapacientestotalesID[7] = 'Estatura';
          this.tablapacientestotalesID[8] = 'Peso';
          this.tablapacientestotalesID[9] = 'Tipo Documento';
          this.tablapacientestotalesID[10] = 'Numero Documento';
          this.tablapacientestotalesID[11] = 'Sexo';
          this.tablapacientestotalesID[12] = 'Tipo Usuario';
          this.tablapacientestotalesID[13] = 'Correo Login';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.PaciUniTID = null;
      this.tituloPaciUniListaID = '';
      this.tablapacientestotalesID[0] = '';
      this.tablapacientestotalesID[1] = '';
      this.tablapacientestotalesID[5] = '';
      this.tablapacientestotalesID[6] = '';
      this.tablapacientestotalesID[7] = '';
      this.tablapacientestotalesID[8] = '';
      this.tablapacientestotalesID[9] = '';
      this.tablapacientestotalesID[10] = '';
      this.tablapacientestotalesID[11] = '';
      this.tablapacientestotalesID[12] = '';
      this.tablapacientestotalesID[13] = '';
      this.controlLista1 = 1;
    }
  }


  public consultaPacientesTotales(list: boolean) {
    if (this.controlLista == 1) {
      this.servi.getPacienteTotal().subscribe(
        (data: { paciente: [] }) => {
          if (list == true) this.flag = list
          this.PaciUniT = data; //JSON.parse(data);
          this.tituloPaciUniLista = 'LISTA DE TODOS LOS PACIENTES';
          this.tablapacientestotales[0] = 'Id';
          this.tablapacientestotales[1] = 'Nombre Paciente';
          this.tablapacientestotales[5] = 'Fecha Nacimiento';
          this.tablapacientestotales[6] = 'Alergias';
          this.tablapacientestotales[7] = 'Estatura';
          this.tablapacientestotales[8] = 'Peso';
          this.tablapacientestotales[9] = 'Tipo Documento';
          this.tablapacientestotales[10] = 'Numero Documento';
          this.tablapacientestotales[11] = 'Sexo';
          this.tablapacientestotales[12] = 'Tipo Usuario';
          this.tablapacientestotales[13] = 'Correo Login';
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
      this.tablapacientestotales[2] = '';
      this.tablapacientestotales[3] = '';
      this.tablapacientestotales[4] = '';
      this.tablapacientestotales[5] = '';
      this.tablapacientestotales[6] = '';
      this.tablapacientestotales[7] = '';
      this.tablapacientestotales[8] = '';
      this.tablapacientestotales[9] = '';
      this.tablapacientestotales[10] = '';
      this.tablapacientestotales[11] = '';
      this.tablapacientestotales[12] = '';
      this.tablapacientestotales[13] = '';
      this.controlLista = 1;
    }
  }

  public consultaPacientesDoc(cadoc: any) {
    if (this.controlLista1 == 1) {
      this.servi.getlListPersonaDoc('/' + cadoc).subscribe(
        (data: { paciente: [] }) => {
          this.PaciUniTDoc = data; //JSON.parse(data);
          this.tituloPaciUniLista = 'LISTA DE TODOS LOS PACIENTES';
          this.tablapacientestotalesDoc[0] = 'Id';
          this.tablapacientestotalesDoc[1] = 'Nombre Paciente';
          this.tablapacientestotalesDoc[5] = 'Fecha Nacimiento';
          this.tablapacientestotalesDoc[6] = 'Alergias';
          this.tablapacientestotalesDoc[7] = 'Estatura';
          this.tablapacientestotalesDoc[8] = 'Peso';
          this.tablapacientestotalesDoc[9] = 'Tipo Documento';
          this.tablapacientestotalesDoc[10] = 'Numero Documento';
          this.tablapacientestotalesDoc[11] = 'Sexo';
          this.tablapacientestotalesDoc[12] = 'Tipo Usuario';
          this.tablapacientestotalesDoc[13] = 'Correo Login';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.PaciUniTDoc = null;
      this.tituloPaciUniLista = '';
      this.tablapacientestotalesDoc[0] = '';
      this.tablapacientestotalesDoc[1] = '';
      this.tablapacientestotalesDoc[2] = '';
      this.tablapacientestotalesDoc[3] = '';
      this.tablapacientestotalesDoc[4] = '';
      this.tablapacientestotalesDoc[5] = '';
      this.tablapacientestotalesDoc[6] = '';
      this.tablapacientestotalesDoc[7] = '';
      this.tablapacientestotalesDoc[8] = '';
      this.tablapacientestotalesDoc[9] = '';
      this.tablapacientestotalesDoc[10] = '';
      this.tablapacientestotalesDoc[11] = '';
      this.tablapacientestotalesDoc[12] = '';
      this.tablapacientestotalesDoc[13] = '';
      this.controlLista1 = 1;
    }
  }

  //--------------------------------------------------------------------------------------------->
  //para Limpiar la lista
  public LimpiarTablaDoc() {
    this.PaciUniTDoc = null; // Establece los datos en null para limpiar la tabla de "Pacientes Tipo Documento"
    this.tituloPaciUniListaDoc = ''; // Limpia el título de la tabla si es necesario
    this.tablapacientestotalesDoc = []; // Limpia las columnas de la tabla si es necesario
    this.controlLista1 = 0;
  }


  public LimpiarLista(list: boolean) {
    if (list == false) this.flag = list
    this.controlLista = 0;
  }

  //=============================================================
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  //=============================================================

  ngOnInit(): void {
    this.ListarPaciTotales = this.formBuilder.group({});

    this.ActPacienteU = this.formBuilder.group({
      CBPacienteEdi: [],
      textNueNom1Edi: [],
      textNueNom2Edi: [],
      textApell1Edi: [],
      textApell2Edi: [],
      textFechaEdi: [],
      textAlergiaEdi: [],
      textEstaturaEdi: [],
      textPesoEdi: [],
      textTipDocEdi: [],
      textNumDocEdi: [],
      textTipSexEdi: [],
      textTipUsuEdi: [],
      textCorrLogEdi: [],
      textContraLogEdi: [],
    });
    this.CBPersonaDoc = this.formBuilder.group({
      PerDocfiltro: [],
      textDoc: [],
    });
    this.CBPacienteID = this.formBuilder.group({
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

  public SelPacienteEditar() {
    this.BuscarEvalor = this.ActPacienteU.getRawValue()['CBPacienteEdi'];

    this.servi.getlPacEdit(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.PacienteUniEdi = data;
        console.log(this.PacienteUniEdi);

        //console.log(" aca 45 " + this.CataUniCataEdi.length + " y la data  " + data.length);
        this.titloPaciUniEditar = 'PERSONA A EDITAR';
      },
      (error) => {
        console.log(error);
      }
    );
  }


  public SelPaciente() {
    this.BuscarEvalor = this.ActPacienteU.getRawValue()['CBPacienteEdi'];

    this.servi.getlPacEdit(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.PacienteUniEdi = data;
        console.log(this.PacienteUniEdi);

        //console.log(" aca 45 " + this.CataUniCataEdi.length + " y la data  " + data.length);
        this.titloPaciUniEditar = 'PERSONA A EDITAR';
      },
      (error) => {
        console.log(error);
      }
    );
  }


  //-------------------------------------------------------------------------
  //Para insertar una nuevo catalogo

  insertPaciente() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.CrearPacienteU.getRawValue()['textNueNom1'];
    var datosvalo2 = this.CrearPacienteU.getRawValue()['textNueNom2'];
    var datosvalo3 = this.CrearPacienteU.getRawValue()['textApell1'];
    var datosvalo4 = this.CrearPacienteU.getRawValue()['textApell2'];
    var datosvalo5 = this.CrearPacienteU.getRawValue()['textFecha'];
    var datosvalo6 = this.CrearPacienteU.getRawValue()['textAlergia'];
    var datosvalo7 = this.CrearPacienteU.getRawValue()['textEstatura'];
    var datosvalo8 = this.CrearPacienteU.getRawValue()['textPeso'];
    var datosvalo9 = this.CrearPacienteU.getRawValue()['textTipDoc'];
    var datosvalo10 = this.CrearPacienteU.getRawValue()['textNumDoc'];
    var datosvalo11 = this.CrearPacienteU.getRawValue()['textTipSex'];
    var datosvalo12 = this.CrearPacienteU.getRawValue()['textTipUsu'];
    var datosvalo13 = this.CrearPacienteU.getRawValue()['textCorrLog'];
    var datosvalo14 = this.CrearPacienteU.getRawValue()['textContraLog'];

    //JSON armado
    var cadena = {
      nom1_pac: datosvalo1,
      nom2_pac: datosvalo2,
      apell1_pac: datosvalo3,
      apell2_pac: datosvalo4,
      nacimiento_pac: datosvalo5,
      alergias_pac: datosvalo6,
      estatura_pac: datosvalo7,
      peso_pac: datosvalo8,
      tipo_doc_pac: datosvalo9,
      num_doc_pac: datosvalo10,
      sexo_pac: datosvalo11,
      tipo_usuario: datosvalo12,
      login_correo_pac: datosvalo13,
      login_contrasena_pac: datosvalo14,
    };

    //se consume el servicio
    this.servi
      .CrearPacienteU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //this.LimpiarFormulario();
    this.CrearPacienteU.reset();
  }


  // -----------------------------------------------------------------------------------------
  public ActualizarPaciente() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.ActPacienteU.getRawValue()['CBPacienteEdi'];
    var datosvalo2 = this.ActPacienteU.getRawValue()['textNueNom1Edi'];
    var datosvalo3 = this.ActPacienteU.getRawValue()['textNueNom2Edi'];
    var datosvalo4 = this.ActPacienteU.getRawValue()['textApell1Edi'];
    var datosvalo5 = this.ActPacienteU.getRawValue()['textApell2Edi'];
    var datosvalo6 = this.ActPacienteU.getRawValue()['textFechaEdi'];
    var datosvalo7 = this.ActPacienteU.getRawValue()['textAlergiaEdi'];
    var datosvalo8 = this.ActPacienteU.getRawValue()['textEstaturaEdi'];
    var datosvalo9 = this.ActPacienteU.getRawValue()['textPesoEdi'];
    var datosvalo10 = this.ActPacienteU.getRawValue()['textTipDocEdi'];
    var datosvalo11 = this.ActPacienteU.getRawValue()['textNumDocEdi'];
    var datosvalo12 = this.ActPacienteU.getRawValue()['textTipSexEdi'];
    var datosvalo13 = this.ActPacienteU.getRawValue()['textTipUsuEdi'];
    var datosvalo14 = this.ActPacienteU.getRawValue()['textCorrLogEdi'];
    var datosvalo15 = this.ActPacienteU.getRawValue()['textContraLogEdi'];


    //JSON armado
    var cadena = {
      id_paciente: datosvalo1,
      nom1_pac: datosvalo2,
      nom2_pac: datosvalo3,
      apell1_pac: datosvalo4,
      apell2_pac: datosvalo5,
      nacimiento_pac: datosvalo6,
      alergias_pac: datosvalo7,
      estatura_pac: datosvalo8,
      peso_pac: datosvalo9,
      tipo_doc_pac: datosvalo10,
      num_doc_pac: datosvalo11,
      sexo_pac: datosvalo12,
      tipo_usuario: datosvalo13,
      login_correo_pac: datosvalo14,
      login_contrasena_pac: datosvalo15,
    };

    //se consume el servicio
    this.servi
      .ActualizarPacienteU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.CrearPacienteU.reset();

  }
}
