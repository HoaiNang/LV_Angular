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
import { DialogAnimationsDialog, HangTSComponent } from './component/hang-ts/hang-ts.component';
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
import { HousesListComponent } from './houses-list/houses-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CommentsComponent } from './comments/comments.component';
import { PopupHouseComponent } from './popup-house/popup-house.component';

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
    HangTSComponent,
    PopupHangtsComponent,
    DialogAnimationsDialog1,
    MapComponent,
    FileManagerComponent,
    FileManagersComponent,
    IntroductionComponent,
    HousesListComponent,
    ContactsComponent,
    CommentsComponent,
    PopupHouseComponent
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