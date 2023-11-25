import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../image.service';
import { Images } from 'src/app/Model/Image';
@Component({
  selector: 'app-file-managers',
  templateUrl: './file-managers.component.html',
  styleUrls: ['./file-managers.component.css']
})
export class FileManagersComponent implements OnInit {
  selectedFile: File | null = null;
  images: Images[] = [];

  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  
}
