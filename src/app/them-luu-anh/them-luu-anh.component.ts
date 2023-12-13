import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LuuAnhService } from '../luu-anh.service';


@Component({
  selector: 'app-them-luu-anh',
  templateUrl: './them-luu-anh.component.html',
  styleUrls: ['./them-luu-anh.component.css'],
})
export class ThemLuuAnhComponent {
  selectedFile: File | null = null;
  constructor(
    public dialogRef: MatDialogRef<ThemLuuAnhComponent>,
    private luuAnhService: LuuAnhService,
    private formBuilder: FormBuilder

  ) {}

  get formControls() {
    return this.myform.controls;
  }
  closePopup() {
    this.dialogRef.close();
  }

  myform = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes

    if (file.size > maxFileSize) {
      alert('kích thước file phải < 2mb')
      this.selectedFile = null;
      return;
    }
    //cấu hình loại file
    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif' ||
      file.type === 'image/bmp' ||
      file.type === 'image/tiff' ||
      file.type === 'image/webp'
    ) {
      this.selectedFile = file;
    } else {
      alert('Loại file không hợp lệ. Vui lòng chọn một file ảnh.');
      this.selectedFile = null;
    }

  }

  saveAnh() {
    if (this.myform.valid && this.selectedFile) {
      const nameControl = this.myform.get('name');
      if (nameControl && typeof nameControl.value === 'string') {
        const name = nameControl.value;
        this.luuAnhService.uploadFile(this.selectedFile, name).subscribe(event => {
          this.dialogRef.close('ok');
        });
      } else {
        console.error('Invalid name value or name control not found.');
      }
    } else {
      this.dialogRef.close();
    }
  }

}
