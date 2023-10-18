import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { MasterService } from 'src/app/_services/master.service';
import { HouseService } from 'src/app/_services/house.service';
import { House } from 'src/app/Model/House';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  houselist !: House[];
  dataSource: any;

  constructor(private userService: UserService,
    private service: MasterService,
    private House: HouseService,) {
      this.loadhouse();}
      loadhouse() {
        this.service.GetHouse()
          .subscribe((data: any) => {
            this.houselist = data.reverse();
            this.dataSource = new MatTableDataSource<House>(this.houselist);
            console.log(data)
          });
      }
      Filterchange(data: Event) {
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
      }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }
  
}
