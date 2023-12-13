import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LuuAnhService {
  private baseUrl = 'http://localhost:8080/api/file';

  constructor(private http: HttpClient) {}
  getLuuAnhList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }
  uploadFile(file: File, name: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    return this.http.post<any>(this.baseUrl, formData);
  }

  downloadFile(maTaiLieu: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${maTaiLieu}/download`, { responseType: 'blob', observe: 'response' });
}
}
