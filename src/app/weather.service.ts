import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '983d68a004c8548c08d57c00fece10fd'; // Thay YOUR_API_KEY bằng API key của bạn từ OpenWeatherMap

  constructor(private http: HttpClient) { }
  getWeatherForMap(lat: number, lon: number): Observable<any> {
    const apiUrl = '/data/2.5/weather';
    // const lat = 9.1792; // Vĩ độ tâm bản đồ
    // const lon = 105.1458; // Kinh độ tâm bản đồ
    const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
  // getWeatherForMap(locationName: string): Observable<any> {
  //   const apiUrl = '/data/2.5/weather'; // URL API thời tiết
  //   const url = `${apiUrl}?q=${encodeURIComponent(locationName)}&appid=${this.apiKey}`;
  //   return this.http.get(url);
  // const name = "Cà Mau"
  //   const url = `${apiUrl}?q=${name}&appid=${this.apiKey}`;
  // }
}

