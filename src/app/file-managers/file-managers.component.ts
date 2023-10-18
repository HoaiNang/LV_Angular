import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-managers',
  templateUrl: './file-managers.component.html',
  styleUrls: ['./file-managers.component.css']
})
export class FileManagersComponent {
  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.http.post('http://localhost:8080/file-manager', formData).subscribe(
      (response) => {
        console.log('File uploaded successfully.');
      },
      (error) => {
        console.error('Error occurred while uploading the file:', error);
      }
    );
  }
  downloadFile() {
    this.http.get('http://localhost:8080/file-manager', { responseType: 'blob' }).subscribe(
      (response) => {
        this.saveFile(response);
      },
      (error) => {
        console.error('Error occurred while downloading the file:', error);
      }
    );
  }
  private saveFile(blob: Blob) {
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'file-name.extension';
    downloadLink.click();
  }
}
