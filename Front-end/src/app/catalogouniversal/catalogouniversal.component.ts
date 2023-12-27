import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-catalogouniversal',
  templateUrl: './catalogouniversal.component.html',
  styleUrls: ['./catalogouniversal.component.css'],
})
export class CatalogouniversalComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    Router: Router
  ) {}

  //LAS VARIABLES
  title = 'MANEJO DE CATALOGO UNIVERSAL'; //Titulo dela página
  tituloCataUniLista = ''; //Titulo Lista de todos los catalogos
  titloCataUniBuscado = ''; //Titulo de Color Buscado
  titloCataUniEditar = ''; //Titulo de Color a Editar

  CataUniT: any = []; //Lista de todos los catalogos
  CataUniCatalogo: any = []; //Lista catalogo Catalogo
  CataUniColor: any = []; //Lista catalogo Color
  CataUniTipVehi: any = []; //Lista catalogo TiposVehiculos
  CataUniMarca: any = []; //Lista catalogo Marca
  CataUniTipDoc: any = []; //Lista catalogo Tipos de Documntos
  CataUniEps: any = []; //Lista catalogo Eps
  CataUniPrefSexual: any = []; //Lista catalogo Preferencias Sexuales

  CataUniCatalogoSel: any = []; //Lista catalogo Catalogo selecionado
  CataUniColorSel: any = []; //Lista el color selecionado
  CataUniTipVehiSel: any = []; //Lista catalogo TiposVehiculos selecionado
  CataUniMarcaSel: any = []; //Lista catalogo Marca selecionado
  CataUniTipDocSel: any = []; //Lista catalogo Tipos de Documntos selecionado
  CataUniEpsSel: any = []; //Lista catalogo Eps selecionado
  CataUniPrefSexualSel: any = []; //Lista catalogo Preferencias Sexuales selecionado
  CataUniCataEdi: any = [];

  tablacatalogosstotales: any = []; //Encabezados tabla catalogos totales

  //*****************************************************************************
  //Form group  //Grupo para la lista de Colores
  ListarCatTotales = new FormGroup({});

  //Grupo para formulariomostrar catalogo de Catalogos
  CBCatalogoCatalogo = new FormGroup({
    CatCatalogofiltro: new FormControl(),
    textCatalogo: new FormControl(),
  });

  //Grupo para formulariomostrar catalogo colores
  CBCatalogoColor = new FormGroup({
    CatColorfiltro: new FormControl(),
    textColor: new FormControl(),
  });

  //Grupo para formulariomostrar catalogo Tipos de Vehículos
  CBCatalogoTipVehi = new FormGroup({
    CatTipVehifiltro: new FormControl(),
    textTivVehi: new FormControl(),
  });

  //Grupo para formulariomostrar catalogo Marca
  CBCatalogoMarca = new FormGroup({
    CatMarcafiltro: new FormControl(),
    textMarca: new FormControl(),
  });

  //Grupo para formulariomostrar catalogo Tipos de Documentos
  CBCatalogoTipDoc = new FormGroup({
    CatTipDocfiltro: new FormControl(),
    textTivDoc: new FormControl(),
  });

  //Grupo para formulariomostrar catalogo EPS
  CBCatalogoEps = new FormGroup({
    CatEpsfiltro: new FormControl(),
    textEps: new FormControl(),
  });

  //Grupo para formulariomostrar catalogo PrefSexual
  CBCatalogoPrefSexual = new FormGroup({
    CatPrefSexualfiltro: new FormControl(),
    textPrefSexual: new FormControl(),
  });

  CrearCatalogoU = new FormGroup({
    textNueDenominacion: new FormControl(),
    CBTipoCatalogo: new FormControl(),
  });

  ActCatalogoU = new FormGroup({
    CBCatalogoEdi: new FormControl(),
    CBTipoCatalogoEdi: new FormControl(),
    textNueDenominacionEdi: new FormControl(),
    textNueTipoCatEdi: new FormControl(),
  });

  BuscarEvalor = 1; //Control para carga del valor a buscar
  controlLista = 1; //Control para limpiar la lista
  flag:boolean = false

  //------------------------------------------------------

  //=============================================================
  //LOS CRUD
  //=============================================================
  //Lista de todos los catalogos

  public consultaCatalogosTotales(list:boolean) {
    if (this.controlLista == 1) {
      this.servi.getCatalogoTotal().subscribe(
        (data: { catalogouiversal: [] }) => {
          if(list==true)this.flag=list
          this.CataUniT = data; //JSON.parse(data);
          //       console.log(this.CataUniT);

          this.tituloCataUniLista = 'LISTA DE TODOS LOS CATALOGOS';
          this.tablacatalogosstotales[0] = 'Id';
          this.tablacatalogosstotales[1] = 'Nombre';
          this.tablacatalogosstotales[2] = 'Catalogo';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CataUniT = null;
      this.tituloCataUniLista = '';
      this.tablacatalogosstotales[0] = '';
      this.tablacatalogosstotales[1] = '';
      this.tablacatalogosstotales[2] = '';
      this.controlLista = 1;
    }
  }

  //--------------------------------------------------------------------------------------------->
  //para Limpiar la lista

  public LimpiarLista(list:boolean) {
    if(list==false)this.flag=list
    this.controlLista = 0;
  }

  // -----------------------------------------------------------------------------------------
  // Listar un solo tipo de Catalogo
  public ListarCatalogoE(catip: any) {
    this.servi.getlListCatologoEsp('/' + catip).subscribe(
      (data: {}) => {
        if (catip == 1) {
          this.CataUniCatalogo = data;
        } else if (catip == 2) {
          this.CataUniColor = data;
        } else if (catip == 3) {
          this.CataUniTipVehi = data;
        } else if (catip == 4) {
          this.CataUniMarca = data;
          console.log(this.CataUniMarca);
        } else if (catip == 5) {
          this.CataUniTipDoc = data;
        } else if (catip == 6) {
          this.CataUniEps = data;
        } //if(catip == 7)
        else {
          this.CataUniPrefSexual = data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //--------------------------------------------------------------
  //Consulta un color por medio de su id.

  public SelecCatalogoE(catip: any, catselec: any) {
    if (this.BuscarEvalor != 0) {
      if (catip == 1) {
        this.BuscarEvalor =
          this.CBCatalogoCatalogo.getRawValue()['CatCatalogofiltro'];
      } else if (catip == 2) {
        this.BuscarEvalor =
          this.CBCatalogoColor.getRawValue()['CatColorfiltro'];
      } else if (catip == 3) {
        this.BuscarEvalor =
          this.CBCatalogoTipVehi.getRawValue()['CatTipVehifiltro'];
      } else if (catip == 4) {
        this.BuscarEvalor =
          this.CBCatalogoMarca.getRawValue()['CatMarcafiltro'];
      } else if (catip == 5) {
        this.BuscarEvalor =
          this.CBCatalogoTipDoc.getRawValue()['CatTipDocfiltro'];
      } else if (catip == 6) {
        this.BuscarEvalor = this.CBCatalogoEps.getRawValue()['CatEpsfiltro'];
      } //if(catip ==7)
      else {
        this.BuscarEvalor =
          this.CBCatalogoPrefSexual.getRawValue()['CatPrefSexualfiltro'];
      }
    }
    catselec = this.BuscarEvalor;

    this.servi.getlListCatologoEsp('/' + catip + '/' + catselec).subscribe(
      (data: {}) => {
        if (catip == 1) {
          this.CataUniCatalogoSel = data;
        } else if (catip == 2) {
          this.CataUniColorSel = data;
        } else if (catip == 3) {
          this.CataUniTipVehiSel = data;
        } else if (catip == 4) {
          this.CataUniMarcaSel = data;
        } else if (catip == 5) {
          this.CataUniTipDocSel = data;
        } else if (catip == 6) {
          this.CataUniEpsSel = data;
        } //if(catip == 7)
        else {
          this.CataUniPrefSexualSel = data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //=============================================================
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  //=============================================================

  ngOnInit(): void {
    this.ListarCatTotales = this.formBuilder.group({});

    this.CBCatalogoCatalogo = this.formBuilder.group({
      CatCatalogofiltro: [],
      textCatalogo: [],
    });

    this.CBCatalogoColor = this.formBuilder.group({
      CatColorfiltro: [],
      textColor: [],
    });

    this.CBCatalogoTipVehi = this.formBuilder.group({
      CatTipVehifiltro: [],
      textTivVehi: [],
    });

    this.CBCatalogoMarca = this.formBuilder.group({
      CatMarcafiltro: [],
      textMarca: [],
    });

    this.CBCatalogoTipDoc = this.formBuilder.group({
      CatTipDocfiltro: [],
      textTivDoc: [],
    });

    this.CBCatalogoEps = this.formBuilder.group({
      CatEpsfiltro: [],
      textEps: [],
    });

    this.CBCatalogoPrefSexual = this.formBuilder.group({
      CatPrefSexualfiltro: [],
      textPrefSexual: [],
    });

    this.ActCatalogoU = this.formBuilder.group({
      CBCatalogoEdi: [],
      CBTipoCatalogoEdi: [],
      textNueDenominacionEdi: [],
      textNueTipoCatEdi: [],
    });
  }

  public SelCataEditar() {
    this.BuscarEvalor = this.ActCatalogoU.getRawValue()['CBCatalogoEdi'];

    this.servi.getlCatEdit(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.CataUniCataEdi = data;
        console.log(this.CataUniCataEdi);

        //console.log(" aca 45 " + this.CataUniCataEdi.length + " y la data  " + data.length);
        this.titloCataUniEditar = 'CATALOGO A EDITAR';
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //-------------------------------------------------------------------------
  //Para insertar una nuevo catalogo

  insertUniversal() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.CrearCatalogoU.getRawValue()['textNueDenominacion'];
    var datosvalo2 = this.CrearCatalogoU.getRawValue()['CBTipoCatalogo'];

    //JSON armado
    var cadena = { nom_catalogo: datosvalo1, tipo_catalogo: datosvalo2 };

    //se consume el servicio
    this.servi
      .CrearCatalogoU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //this.LimpiarFormulario();
    this.CrearCatalogoU.reset();
  }

  // -----------------------------------------------------------------------------------------
  public ActualizarCatalogo() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.ActCatalogoU.getRawValue()['CBCatalogoEdi'];
    var datosvalo2 = this.ActCatalogoU.getRawValue()['textNueDenominacionEdi'];
    var datosvalo3 = this.ActCatalogoU.getRawValue()['CBTipoCatalogoEdi'];

    //JSON armado
    var cadena = {
      id_catalogo_universal: datosvalo1,
      nom_catalogo: datosvalo2,
      tipo_catalogo: datosvalo3,
    };

    //se consume el servicio
    this.servi
      .ActualizarCatalogoU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.CrearCatalogoU.reset();
  }
}
