import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DataSharingService } from '../../data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from 'src/app/popup.service';
import { WeatherService } from '../../weather.service'
import { HouseService } from 'src/app/_services/house.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit {
  map: any;
  datas: any;
  weatherLayer: any;
  marker: any;

  constructor(
    private dataSharingService: DataSharingService,
    private http: HttpClient,
    private popupService: PopUpService,
    private houseService: HouseService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.map = L.map('map').setView([16.03, 107.45], 5);
    const openStreetMapLayer= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 15,
    }).addTo(this.map);

    const openWeatherMapLayer = L.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=983d68a004c8548c08d57c00fece10fd', {
      attribution: 'Weather data &copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
      maxZoom: 18,
    }).addTo(this.map);
    const openTodoMapLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Todo data &copy; <a href="https://opentodomap.org/">OpenTodoMap</a>',
      maxZoom: 18,
    });
    // const Mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    // { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    // maxZoom: 18, id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: 5,
    // accessToken: 'pk.eyJ1IjoicGhhbm5hbmciLCJhIjoiY2xpdmk3bnVmMDgzcDN0bWxubXdtMXp0ZyJ9.wy4VxT1SICa2k75qsmCazA' });
    const baseLayers = {
      'OpenStreetMap': openStreetMapLayer,
      'OpenWeatherMap': openWeatherMapLayer,
      'OpenTodoMap': openTodoMapLayer,
      // 'Mapbox': Mapbox,
    };
    L.control.layers(baseLayers).addTo(this.map);
    const customLabel = L.divIcon({ className: 'custom-label', html: 'Biển Đông' });
    const customLabelMarker = L.marker([13.23, 113.04], { icon: customLabel }).addTo(this.map);

    const customLabel1 = L.divIcon({ className: 'custom-label', html: 'Quần đảo Hoàng Sa' });
    const customLabelMarker1 = L.marker([16.82, 111.9], { icon: customLabel1 }).addTo(this.map);

    const customLabel2 = L.divIcon({ className: 'custom-label', html: 'Quần đảo Trường Sa' });
    const customLabelMarker2 = L.marker([10.17, 114.36], { icon: customLabel2 }).addTo(this.map);

    this.getLocations();
    this.displayWeatherLayer();
    let currentMarker: any = null; // Lưu trữ marker hiện tại
    this.map.on('click', (e: any) => {
      const coordinates = e.latlng;
      const latitude = coordinates?.lat;
      const longitude = coordinates?.lng;
      console.log('Clicked:', e.latlng);
      this.dataSharingService.setCoordinates(coordinates);
      // Xóa marker hiện tại nếu tồn tại
    if (currentMarker) {
      currentMarker.remove();
    }
    // Tạo marker mới
    currentMarker = L.marker([latitude, longitude]).addTo(this.map);
    currentMarker.on('click', () => {
    currentMarker.openPopup();
    });
  });
  }

  // Lấy địa điểm từ server
  getLocations() {
    this.houseService.GetHouse().subscribe((data: any) => {
      this.datas = JSON.parse(data);
      this.displayLocationsOnMap();
    });
  }

  // Hiển thị lên bản đồ
  displayLocationsOnMap() {
    this.datas.forEach((data: any) => {
      const coords = this.extractCoordinates(data.coords);
      // console.log(coords)
      if (coords) {
        const marker = L.marker([coords.lat, coords.lng]).addTo(this.map);
        const popupContent = `
        <div>
            <h1>Thông tin nhà trọ</h1>
            <p>Tên nhà trọ: ${data.title}</p>
            <p>Địa chỉ: ${data.addr}</p>
            <button type="button" class="detail-button">Xem chi tiết</button>
          </div>
          `;
        const popup = L.popup().setContent(popupContent);
        marker.bindPopup(popup);

        // Lắng nghe sự kiện popupopen
      marker.on('popupopen', () => {
        const detailButton = document.querySelector('.detail-button');
        if (detailButton) {
          detailButton.addEventListener('click', () => {
            const detailPopupContent = `Thông tin chi tiết:<br>
            <p>Tên nhà trọ: ${data.title}</p>
            <p>Địa chỉ: ${data.addr}</p>
            <p>Mô tả: ${data.desc}</p>
            <p>Số lượng phòng trống: ${data.nbroom}</p>
            <p>Giá thuê: ${data.rent_price}</p>
            <p>SĐT liên hệ: ${data.phone}</p>
            <img src="../../../assets/nhatro.jpg" width="250" height="150" />
            `;
            const detailPopup = L.popup().setContent(detailPopupContent);
            marker.bindPopup(detailPopup).openPopup();
          });
        }
      });
    }
    });

  }

  // Trích xuất tọa độ từ chuỗi coords
  extractCoordinates(coordsString: string) {
    const pattern = /LatLng\(([\d.-]+),\s*([\d.-]+)\)/;
    const match = coordsString.match(pattern);
    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      return { lat, lng };
    }
    return null;
  }
  displayWeatherLayer() {
    // Lấy thông tin thời tiết cho toàn bản đồ
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;
    this.weatherService.getWeatherForMap(lat, lon).subscribe((weatherData: any) => {
      console.log(weatherData)
      const geojson: any = {
        type: "FeatureCollection",
        features: [
          {
            type: 'Feature',
            properties: {
              temperature: (weatherData.main.temp-273.15).toFixed(2),
              name: weatherData.name,
              humidity: weatherData.main.humidity,
              sea_level: weatherData.main.sea_level,
              pressure: weatherData.main.pressure,
              visibility: (weatherData.visibility)/1000,
              degree: weatherData.wind.deg,
              strdeg: convertWindDirection(weatherData.wind.deg),
              speed: weatherData.wind.speed,
              gust: weatherData.wind.gust

            },
            geometry: {
              type: 'Point',
              coordinates: [weatherData.coord.lon, weatherData.coord.lat],
            },
          },
        ],
      };
      console.log(geojson);
      // Tạo một layer hiển thị thông tin thời tiết
      // Xóa layer và marker cũ (nếu có)
      if (this.weatherLayer) {
        this.weatherLayer.removeFrom(this.map);
      }
      if (this.marker) {
        this.marker.removeFrom(this.map);
      }
      // const iconWind = L.icon({
      //   iconUrl: '../../../assets/wind-icon.jpg',
      //   iconSize: [50, 50],
      //   iconAnchor: [60, 30],
      // });
      // Tạo một layer mới hiển thị thông tin thời tiết
      this.weatherLayer = L.geoJSON(geojson, {
        pointToLayer: (feature, latlng) => {
          // const markerOptions = {
          //   icon: iconWind,
          //   rotationAngle: feature.properties.degree, // Góc quay của biểu tượng, tương ứng với hướng gió
          // };console.log(markerOptions)
          // Tạo marker và bind popup
          this.marker = L.marker(latlng).bindPopup(`
          Vị trí hiện tại: ${feature.properties.name}<br>
          Nhiệt độ: ${feature.properties.temperature}°C<br>
          Độ ẩm: ${feature.properties.humidity}%<br>
          Áp suất mực nước biển: ${feature.properties.sea_level} hPa<br>
          Áp suất không khí: ${feature.properties.pressure} hPa<br>
          Tầm nhìn xa: ${feature.properties.visibility}Km<br>
          Hướng gió: ${feature.properties.degree}° (Hướng ${feature.properties.strdeg})<br>
          Tốc độ gió: ${feature.properties.speed}m/s<br>
          Tốc độ gió giật: ${feature.properties.gust}m/s<br>
          `);
          return this.marker;
        },
      });

      // Thêm layer mới vào bản đồ
      this.weatherLayer.addTo(this.map);
    });
  });
}}
function convertWindDirection(degrees: number): string {
  const directions = ['Bắc', 'Bắc Đông Bắc', 'Đông Bắc', 'Đông Đông Bắc', 'Đông', 'Đông Đông Nam', 'Đông Nam', 'Nam Đông Nam', 'Nam', 'Nam Tây Nam', 'Tây Nam', 'Tây Tây Nam', 'Tây', 'Tây Tây Bắc', 'Tây Bắc', 'Bắc Tây Bắc', 'Bắc'];
  const index = Math.round(degrees / 22.5);
  return directions[index % 16];
}

// const windDirection = convertWindDirection(270);
// console.log(windDirection);

// const date = new Date('2023-06-15'); // Ngày cần chuyển đổi
// const unixTimestamp = Math.floor(date.getTime() / 1000);
// console.log(unixTimestamp);//1686787200

//fe8bf706-0b4f-11ee-8d52-0242ac130002-fe8bf76a-0b4f-11ee-8d52-0242ac130002

// function getTemperatureColor(temperature: number): string {
//   // Định nghĩa các khoảng nhiệt độ và màu sắc tương ứng
//   const colorRanges = [
//     { minTemp: -20, maxTemp: -10, color: '#0000FF' }, // Màu xanh dương
//     { minTemp: -10, maxTemp: 0, color: '#00FFFF' }, // Màu xanh nước biển
//     { minTemp: 0, maxTemp: 10, color: '#00FF00' }, // Màu xanh lá cây
//     { minTemp: 10, maxTemp: 20, color: '#FFFF00' }, // Màu vàng
//     { minTemp: 20, maxTemp: 30, color: '#FFA500' }, // Màu cam
//     { minTemp: 30, maxTemp: 40, color: '#FF0000' } // Màu đỏ
//   ];

//   // Duyệt qua từng khoảng nhiệt độ và trả về màu sắc tương ứng
//   for (const range of colorRanges) {
//     if (temperature >= range.minTemp && temperature < range.maxTemp) {
//       return range.color;
//     }
//   }

//   return '#808080'; // Màu xám mặc định nếu không nằm trong các khoảng nhiệt độ trên

// }
// function formatDate(dateString: string): string {
//   const dateObj = new Date(dateString);
//   const year = dateObj.getFullYear();
//   const month = String(dateObj.getMonth() + 1).padStart(2, '0');
//   const day = String(dateObj.getDate()).padStart(2, '0');
//   const hours = String(dateObj.getHours()).padStart(2, '0');
//   const minutes = String(dateObj.getMinutes()).padStart(2, '0');
//   const seconds = String(dateObj.getSeconds()).padStart(2, '0');
//   return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
// }
// const createDate = '2023-06-12T02:12:58.455+00:00';
// const formattedDate = formatDate(createDate);
// console.log(formattedDate); // Kết quả: 2023/06/12 02:12:58
