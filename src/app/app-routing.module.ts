import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/card/card.component';
import { TableComponent } from './component/table/table.component';
import { FormdesignComponent } from './component/formdesign/formdesign.component';
import { RootComponent } from './component/root.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HangTSComponent } from './component/hang-ts/hang-ts.component';
import { MapComponent } from './component/map/map.component';
import { FileManagersComponent } from './file-managers/file-managers.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { HousesListComponent } from './houses-list/houses-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {path:'',component:HomeComponent},
      {path:'home',component:HomeComponent},
      {path:'map',component:MapComponent},
      {path:'intro',component: IntroductionComponent},
      {path:'house',component: HousesListComponent},
      {path:'contacts',component: ContactsComponent},
      {path:'comments',component: CommentsComponent},
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
