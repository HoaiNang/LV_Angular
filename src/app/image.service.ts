import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Images} from 'src/app/Model/Image'

const IMAGE_API = "http://localhost:8080/images/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http:HttpClient) { }

  upload(file:File){
    const formData: FormData = new FormData();
    formData.append('file',file);
    return this.http.post<any>(IMAGE_API+'upload-file',formData); 
  }

  getList(){
    return this.http.get(IMAGE_API,httpOptions);
  }
}
