import { Injectable } from '@angular/core';
import { colorentity } from '../Entity/colorentity';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
const API_URL = 'http://localhost:8080/';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  GetCustomer(): Observable<any> {
    return this.http.get(API_URL + 'customer');
    //return this.http.get<any>("http://localhost:8080/customer",{ responseType: 'text' });
  }

  Savecustomer(data:any){
    console.log(data)
    return this.http.post("http://localhost:8080/customer",data);
  }
  UpdateCustomer(code: any, data: any) {
    console.log(data);
    return this.http.put(`http://localhost:8080/customer/${code}`, data);
  }
  DeleteCustomer(code: any) {
    console.log(code);
    return this.http.delete(`http://localhost:8080/customer/${code}`);
  }
  GetCustomerbycode(code:any){
    return this.http.get("http://localhost:8080/customer/"+code);
  }


  GetColorList(): colorentity[] {
    return [
      { code: 'c0', name: 'black' },
      { code: 'c1', name: 'Red' },
      { code: 'c2', name: 'Green' },
      { code: 'c3', name: 'Yellow' },
      { code: 'c4', name: 'White' }
    ]
  }

  GetHangTS(): Observable<any> {
    return this.http.get(API_URL + 'hangts');
  }
  GetHangtsbyid(code:any){
    return this.http.get("http://localhost:8080/hangts/"+code);
  }
  UpdateHangTS(code: any, data: any) {
    console.log(data);
    return this.http.put(`http://localhost:8080/hangts/${code}`, data);
  }
  SaveHangts(data:any){
    console.log(data)
    return this.http.post("http://localhost:8080/hangts", data);
  }

  DeleteHangTS(code: any) {
    console.log(code);
    return this.http.delete(`http://localhost:8080/hangts/${code}`);
  }
  GetWeather(): Observable<any> {
    return this.http.get(API_URL + 'weather');
  }

  GetHouse(): Observable<any> {
    return this.http.get(API_URL + 'house');
  }
  GetHousebyid(code:any){
    return this.http.get("http://localhost:8080/house/"+code);
  }
  UpdateHouse(code: any, data: any) {
    console.log(data);
    return this.http.put(`http://localhost:8080/house/${code}`, data);
  }
  SaveHouse(data:any){
    console.log(data)
    return this.http.post("http://localhost:8080/house", data);
  }

  DeleteHouse(code: any) {
    console.log(code);
    return this.http.delete(`http://localhost:8080/house/${code}`);
  }
}
