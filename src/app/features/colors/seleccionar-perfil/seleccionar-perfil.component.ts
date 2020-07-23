import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './seleccionar-perfil.component.html',
  styleUrls: ['./seleccionar-perfil.component.scss'],
})
export class SeleccionarPerfilComponent implements OnInit {
  selectedValue: string;
  profiles = [
    { id: 'admin', value: 'Administrador' },
    { id: 'user', value: 'Usuario' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
