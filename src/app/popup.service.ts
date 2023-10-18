import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  constructor() { }
  makeCoorPopup(data: any): string {
    return `` +
      `<div>Kinh độ: ${ data.coordinates[0] }</div>` +
      `<div>Vĩ độ: ${ data.coordinates[1]}</div>`

  }
  makeCapitalPopup(data: any): string {
    return `` +
      `<div>Capital: ${ data.name }</div>` +
      `<div>State: ${ data.state }</div>` +
      `<div>Population: ${ data.population }</div>`
  }

}
