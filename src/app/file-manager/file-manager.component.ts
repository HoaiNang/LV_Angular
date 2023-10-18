import { Component } from '@angular/core';
import { FileStorageService } from '../file-storage.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent {
  fileList: string[] = []; // Danh sách các tên file
  oldFileName = '';
  newFileName = '';
  data: any;
  fileContent: string = '';
  fileContent1: string = '';

  onFileUpload1(event: any) {
    const file = event.target.files[0];
    this.fileStorageService.storeFile(file.name, file);
    const reader = new FileReader();
    reader.onload = () => {
      this.fileContent1 = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.fileList.push(file.name);
  }
  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.fileStorageService.storeFile(file.name, file);
    const reader = new FileReader();
    reader.onload = () => {
      this.fileContent = reader.result as string;
    };
    reader.readAsText(file);
    this.fileList.push(file.name);
  }

  constructor(private fileStorageService: FileStorageService) {
    this.fileList = Object.keys(fileStorageService.retrieveFileStorage());
  }


  deleteFile(fileName: string) {
    this.fileStorageService.deleteFile(fileName);
    const index = this.fileList.indexOf(fileName);
    if (index !== -1) {
      this.fileList.splice(index, 1);
    }
  }

  renameFile(oldFileName: string) {
    // Lấy dữ liệu file từ fileStorageService
    const fileData = this.fileStorageService.getFile(oldFileName);

    if (fileData) {
      const newFileName = this.newFileName;

      // Xóa file cũ và thêm file mới vào fileStorageService
      this.fileStorageService.deleteFile(oldFileName);
      this.fileStorageService.storeFile(newFileName, fileData);

      // Cập nhật lại danh sách file
      const index = this.fileList.indexOf(oldFileName);
      if (index !== -1) {
        this.fileList[index] = newFileName;
      }

      // Reset giá trị
      this.oldFileName = '';
      this.newFileName = '';

      // Lưu trữ fileStorageService
      this.saveFileStorage();
    }
  }

  downloadFile(fileName: string) {
    this.fileStorageService.downloadFile(fileName);
  }
  saveFileStorage() {
    this.fileStorageService.saveFileStorage();
  }
  openFile(event: any) {
    const file = event.target.file[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const fileData = e.target.result;
      // Xử lý dữ liệu file tại đây
      console.log(fileData);
    };

    reader.readAsDataURL(file);
  }

}
