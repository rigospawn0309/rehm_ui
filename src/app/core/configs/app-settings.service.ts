import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
operadores = ['MOVISTAR','ORANGE','JAZZTEL','MASMOVIL','VODAFONE','DIGIMOBIL','SIN_OPERADOR'];
estados = ['USADO','NUEVO','DESGUACE'];
}
