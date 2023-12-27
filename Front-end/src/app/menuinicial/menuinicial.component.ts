import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-menuinicial',
  templateUrl: './menuinicial.component.html',
  styleUrls: ['./menuinicial.component.css']
})
export class MenuinicialComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    Router: Router
  ) {}

  ngOnInit(): void {}
  
}
