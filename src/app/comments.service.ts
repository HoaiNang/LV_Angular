import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';
const API_URLs = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {}
  GetComment(): Observable<any> {
    return this.http.get(API_URLs + 'comments', { responseType: 'text' });
  }
}
