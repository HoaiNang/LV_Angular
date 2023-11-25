import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/card/card.component';
import { DialogAnimationsDialog1, TableComponent } from './component/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormdesignComponent } from './component/formdesign/formdesign.component';
import { PopupComponent } from './component/popup/popup.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RootComponent } from './component/root.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {MatGridListModule} from '@angular/material/grid-list';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { PopupHangtsComponent } from './component/popup-hangts/popup-hangts.component';
import { MapComponent } from './component/map/map.component';
import { MarkerService } from './marker.service';
import { PopUpService } from './popup.service';
import { ShapeService } from './shape.service';
import { DataSharingService } from './data-sharing.service';
import { FormBuilder } from '@angular/forms';
import { FileManagerComponent } from './file-manager/file-manager.component';
import {environment} from '../environments/environment';
import { FileManagersComponent } from './file-managers/file-managers.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { DialogAnimationsDialog, HousesListComponent } from './houses-list/houses-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CommentsComponent } from './comments/comments.component';
import { PopupHouseComponent } from './popup-house/popup-house.component';
import { PaymentsComponent } from './payments/payments.component';
import { AdminComponent } from './admin/admin.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { UsersManagerComponent } from './users-manager/users-manager.component';
import { ContactsManagerComponent } from './contacts-manager/contacts-manager.component';
import { CommentsManagerComponent } from './comments-manager/comments-manager.component';
import { PaymentsManagerComponent } from './payments-manager/payments-manager.component';
import { ReportsManagerComponent } from './reports-manager/reports-manager.component';
import { ListHouseComponent } from './list-house/list-house.component';
import { PopupDatphongComponent } from './popup-datphong/popup-datphong.component';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    MenubarComponent,
    HomeComponent,
    CardComponent,
    TableComponent,
    FormdesignComponent,
    PopupComponent,
    DialogAnimationsDialog,
    LoginComponent,
    RegisterComponent,
    PopupHangtsComponent,
    DialogAnimationsDialog1,
    MapComponent,
    FileManagerComponent,
    FileManagersComponent,
    IntroductionComponent,
    HousesListComponent,
    ContactsComponent,
    CommentsComponent,
    PopupHouseComponent,
    PaymentsComponent,
    AdminComponent,
    MenuAdminComponent,
    UsersManagerComponent,
    ContactsManagerComponent,
    CommentsManagerComponent,
    PaymentsManagerComponent,
    ReportsManagerComponent,
    ListHouseComponent,
    PopupDatphongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1500 // Thiết lập thời gian tồn tại là 1,5 giây
    }),
    CommonModule,

  ],
  providers: [httpInterceptorProviders, MarkerService, PopUpService, ShapeService, DataSharingService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
