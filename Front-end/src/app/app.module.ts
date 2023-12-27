import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Librería para poder consumir el servicio
//import { HttpModule, } from '@angular/http';
import { HttpClientModule, } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';



import { AppComponent } from '../app/appcomponent/app.component';  
import { CatalogouniversalComponent } from './catalogouniversal/catalogouniversal.component';


import { MiservicioService } from './miservicio.service';
import { PacienteComponent } from './paciente/paciente.component';
import { DoctorComponent } from './doctor/doctor.component';
import { MenuinicialComponent } from './menuinicial/menuinicial.component';
import { CitaComponent } from './cita/cita.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CalificacionComponent } from './calificacion/calificacion.component';


const appRoutes: Routes = 
[
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'Inicio',
  },
  {
    path: 'Inicio',
    component:MenuinicialComponent

  },
  {
    path: 'Universal',
    component:CatalogouniversalComponent
  },
  {
    path: 'Paciente',
    component: PacienteComponent,   
  },
  {
    path: 'Doctor',
    component: DoctorComponent,   
  },
  {
    path: 'Cita',
    component: CitaComponent,   
  },
  {
    path: 'Contacto',
    component: ContactoComponent,   
  },
  {
    path: 'Calificacion',
    component: CalificacionComponent,   
  }

];
  
//--------------------------------------------------------------

@NgModule
({
  declarations: 
  [
    AppComponent,
    CatalogouniversalComponent,
    PacienteComponent,
    DoctorComponent,
    MenuinicialComponent,
    CitaComponent,
    ContactoComponent,
    CalificacionComponent,

  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  //  HttpModule,
    RouterModule.forRoot(appRoutes), // se agregan estos 
    HttpClientModule  // <- Agregar la clase    
  ],
  providers: [MiservicioService],
  bootstrap: [AppComponent]
})


export class AppModule { }
