import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    router: Router
  ) {}

  title = 'MANEJO DE CONTACTOS'; //Titulo dela página
  tituloDoctUniLista = '';
  tituloPaciUniLista = '';
  tituloContactoUniLista = '';
  titloContactoUniEditar = '';
  tituloContactoUniListaTip = '';
  tituloCataContactoUniLista = '';
  tituloContactoUniListaID = '';

  ContactoUniT: any = [];
  DoctUniT: any = [];
  ContactoUniTID: any = [];
  PaciUniT: any = [];
  ContactoUniEdi: any = [];
  ContactoUniTip: any = [];
  CataContactoUniT: any = [];
  mostrarFormulario = false;

  tablacontactostotales: any = [];
  tabladoctorestotales: any = [];
  tablapacientestotales: any = [];
  tablacontactostotalesTip: any = [];
  tablacatalogoContactoTotales: any = [];
  ListarContacTotales = new FormGroup({});
  tablacontactostotalesID: any = [];

  CrearContactoU = new FormGroup({
    texttipocontacto: new FormControl(),
    textcontacto: new FormControl(),
    textidpaciente: new FormControl(),
    textiddoctor: new FormControl(),
  });

  ActContactoU = new FormGroup({
    CBContactoEdi: new FormControl(),
    texttipocontactoEdi: new FormControl(),
    textcontactoEdi: new FormControl(),
    textidpacienteEdi: new FormControl(),
    textiddoctorEdi: new FormControl(),
  });

  CBContactoTip = new FormGroup({
    PerTipfiltro: new FormControl(),
    textTip: new FormControl(),
  });

  CBContactoID = new FormGroup({
    PerIDfiltro: new FormControl(),
    textID: new FormControl(),
  });

  BuscarEvalor = 1; //Control para carga del valor a buscar
  controlLista = 1; //Control para limpiar la lista
  controlLista1 = 1;
  flag: boolean = false;

  ContactoSeleccionado: any;

  obtenerContactoSeleccionado(id_contacto: any) {
    this.servi.getlPacEspSelec(id_contacto).subscribe((data) => {
      this.ContactoSeleccionado = data;
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

  public consultaCatalogoContactosTotales() {
    if (this.controlLista == 1) {
      this.servi.getCatalogoContactoTotal().subscribe(
        (data: { contacto: [] }) => {
          this.CataContactoUniT = data; //JSON.parse(data);
          this.tituloCataContactoUniLista = 'LISTA DE TODOS LOS TIPOS DE USUARIO';
          this.tablacatalogoContactoTotales[0] = 'Id';
          this.tablacatalogoContactoTotales[1] = 'Nombre ';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CataContactoUniT = null;
      this.tituloCataContactoUniLista = '';
      this.tablacatalogoContactoTotales[0] = '';
      this.tablacatalogoContactoTotales[1] = '';
    }
  }

  public consultaContactosID(caidcontacto: any) {
    if (this.controlLista1 == 1) {
      this.servi.getlListContactoID('/'+caidcontacto).subscribe(
        (data: { contacto: [] }) => {
          this.ContactoUniTID = data; //JSON.parse(data);
          this.tituloContactoUniListaID = 'LISTA DEL CONTACTO';
          this.tablacontactostotalesID[0] = 'Id';
          this.tablacontactostotalesID[1] = 'Tipo de Contacto';
          this.tablacontactostotalesID[2] = 'Contacto';
          this.tablacontactostotalesID[3] = 'Paciente';
          this.tablacontactostotalesID[4] = 'Doctor';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.ContactoUniTID = null;
      this.tituloContactoUniListaID = '';
      this.tablacontactostotalesID[0] = '';
      this.tablacontactostotalesID[1] = '';
      this.tablacontactostotalesID[2] = '';
      this.tablacontactostotalesID[3] = '';
      this.tablacontactostotalesID[4] = '';
      this.controlLista1 = 1;
    }
  }


  public consultaContactosTotales(list: boolean) {
    if (this.controlLista == 1) {
      this.servi.getContactoTotal().subscribe(
        (data: { contacto: [] }) => {
          if (list == true) this.flag = list;
          this.ContactoUniT = data; //JSON.parse(data);
          this.tituloContactoUniLista = 'LISTA DE TODOS LOS CONTACTOS';
          this.tablacontactostotales[0] = 'Id';
          this.tablacontactostotales[1] = 'Tipo de Contacto';
          this.tablacontactostotales[2] = 'Contacto';
          this.tablacontactostotales[3] = 'Paciente';
          this.tablacontactostotales[4] = 'Doctor';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.ContactoUniT = null;
      this.tituloContactoUniLista = '';
      this.tablacontactostotales[0] = '';
      this.tablacontactostotales[1] = '';
      this.tablacontactostotales[2] = '';
      this.tablacontactostotales[3] = '';
      this.tablacontactostotales[4] = '';
      this.controlLista = 1;
    }
  }

  public consultaContactosTip(catip: any) {
    if (this.controlLista1 == 1) {
      this.servi.getlListContactoTip('/' + catip).subscribe(
        (data: { cita: [] }) => {
          this.ContactoUniTip = data;
          this.tituloContactoUniListaTip = 'LISTA DE TODOS LOS CONTACTOS';
          this.tablacontactostotalesTip[0] = 'Id';
          this.tablacontactostotalesTip[1] = 'Tipo de Contacto';
          this.tablacontactostotalesTip[2] = 'Contacto';
          this.tablacontactostotalesTip[3] = 'Paciente';
          this.tablacontactostotalesTip[4] = 'Doctor';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.ContactoUniTip = null;
      this.tituloContactoUniListaTip = '';
      this.tablacontactostotalesTip[0] = '';
      this.tablacontactostotalesTip[1] = '';
      this.tablacontactostotalesTip[2] = '';
      this.tablacontactostotalesTip[3] = '';
      this.tablacontactostotalesTip[4] = '';
      this.controlLista1 = 1;
    }
  }

  public LimpiarTablaTip() {
    this.ContactoUniTip = null; // Establece los datos en null para limpiar la tabla de "Pacientes Tipo Documento"
    this.tituloContactoUniListaTip = ''; // Limpia el título de la tabla si es necesario
    this.tablacontactostotalesTip = []; // Limpia las columnas de la tabla si es necesario
    this.controlLista1 = 0;
  }

  public LimpiarLista(list: boolean) {
    if (list == false) this.flag = list;
    this.controlLista = 0;
  }

  ngOnInit(): void {
    this.ListarContacTotales = this.formBuilder.group({});

    this.ActContactoU = this.formBuilder.group({
      CBContactoEdi: [],
      texttipocontactoEdi: [],
      textcontactoEdi: [],
      textidpacienteEdi: [],
      textiddoctorEdi: [],
    });

    this.CBContactoTip = this.formBuilder.group({
      PerTipfiltro: [],
      textTip: [],
    });

    this.CBContactoID = this.formBuilder.group({
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

  public SelContactoEditar() {
    this.BuscarEvalor = this.ActContactoU.getRawValue()['CBContactoEdi'];

    this.servi.getlContactoEdit(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.ContactoUniEdi = data;
        console.log(this.ContactoUniEdi);

        //console.log(" aca 45 " + this.CataUniCataEdi.length + " y la data  " + data.length);
        this.titloContactoUniEditar = 'CONTACTO A EDITAR';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  InsertContacto() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.CrearContactoU.getRawValue()['texttipocontacto'];
    var datosvalo2 = this.CrearContactoU.getRawValue()['textcontacto'];
    var datosvalo3 = this.CrearContactoU.getRawValue()['textidpaciente'];
    var datosvalo4 = this.CrearContactoU.getRawValue()['textiddoctor'];

    //JSON armado
    var cadena = {
      tipo_contacto: datosvalo1,
      contacto: datosvalo2,
      id_paciente_contacto: datosvalo3,
      id_doctor_contacto: datosvalo4,
    };

    //se consume el servicio
    this.servi
      .CrearContactoU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //this.LimpiarFormulario();
    this.CrearContactoU.reset();
  }

  public ActualizarContacto() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.ActContactoU.getRawValue()['CBContactoEdi'];
    var datosvalo2 = this.ActContactoU.getRawValue()['texttipocontactoEdi'];
    var datosvalo3 = this.ActContactoU.getRawValue()['textcontactoEdi'];
    var datosvalo4 = this.ActContactoU.getRawValue()['textidpacienteEdi'];
    var datosvalo5 = this.ActContactoU.getRawValue()['textiddoctorEdi'];

    //JSON armado
    var cadena = {
      id_contacto: datosvalo1,
      tipo_contacto: datosvalo2,
      contacto: datosvalo3,
      id_paciente_contacto: datosvalo4,
      id_doctor_contacto: datosvalo5,
    };

    //se consume el servicio
    this.servi
      .ActualizarContactoU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.CrearContactoU.reset();
  }
}
