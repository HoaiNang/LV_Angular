import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/card/card.component';
import { TableComponent } from './component/table/table.component';
import { FormdesignComponent } from './component/formdesign/formdesign.component';
import { RootComponent } from './component/root.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MapComponent } from './component/map/map.component';
import { FileManagersComponent } from './file-managers/file-managers.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { HousesListComponent } from './houses-list/houses-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CommentsComponent } from './comments/comments.component';
import { PaymentsComponent } from './payments/payments.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { AdminComponent } from './admin/admin.component';
import { UsersManagerComponent } from './users-manager/users-manager.component';
import { ContactsManagerComponent } from './contacts-manager/contacts-manager.component';
import { CommentsManagerComponent } from './comments-manager/comments-manager.component';
import { PaymentsManagerComponent } from './payments-manager/payments-manager.component';
import { ReportsManagerComponent } from './reports-manager/reports-manager.component';
import { ListHouseComponent } from './list-house/list-house.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {path:'',component:HomeComponent},
      {path:'home',component:HomeComponent},
      {path:'map',component:MapComponent},
      {path:'file-manager',component:FileManagersComponent},
      {path:'intro',component: IntroductionComponent},
      {path:'house',component: ListHouseComponent},
      {path:'contacts',component: ContactsComponent},
      {path:'comments',component: CommentsComponent},
      {path:'payments',component: PaymentsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register',component: RegisterComponent},
    ],
  },
];
const routes1: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path:'house',component: HousesListComponent},
      {path:'users-manager',component: UsersManagerComponent},
      {path:'contacts-manager',component: ContactsManagerComponent},
      {path:'comments-manager',component: CommentsManagerComponent},
      {path:'payments-manager',component: PaymentsManagerComponent},
      {path:'reports-manager',component: ReportsManagerComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes1)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
