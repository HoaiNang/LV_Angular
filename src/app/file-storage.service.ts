import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  private fileStorage: { [fileName: string]: File } = {};

  constructor() {
    this.fileStorage = this.retrieveFileStorage();
  }

  storeFile(fileName: string, file: File) {
    this.fileStorage[fileName] = file;
    this.saveFileStorage();
  }
  renameFile(oldFileName: string, newFileName: string) {
    const file = this.fileStorage[oldFileName];
    if (file) {
      delete this.fileStorage[oldFileName];
      this.fileStorage[newFileName] = file;
    }
    this.saveFileStorage();
  }
  deleteFile(fileName: string) {
    delete this.fileStorage[fileName];
    this.saveFileStorage();
  }

  getFile(fileName: string): File | undefined {
    return this.fileStorage[fileName];
  }

  downloadFile(fileName: string) {
    const fileData = this.getFile(fileName);

    if (fileData) {
      const blob = new Blob([fileData]);
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(url);
    }
  }

  saveFileStorage() {
    localStorage.setItem('fileStorage', JSON.stringify(this.fileStorage));
  }

  retrieveFileStorage(): { [fileName: string]: File } {
    const storedFileStorage = localStorage.getItem('fileStorage');
    if (storedFileStorage) {
      return JSON.parse(storedFileStorage);
    }
    return {};
  }
}
