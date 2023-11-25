import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {
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
  isLoggedIn = this.storageService.isLoggedIn();
}
