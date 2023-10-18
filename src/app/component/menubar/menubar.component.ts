import { Component } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}
  name = this.storageService.getUser().username
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }

  logout(): void {
    this.storageService.signOut();
    window.location.reload();
  }
  dataSource: any;
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
}
