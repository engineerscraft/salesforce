import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbDropdown  } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { AuthService } from './auth.service';
import { NewPasswordComponent } from './new-password/new-password.component';
import { HeroimageComponent } from './heroimage/heroimage.component';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LeadCreationComponent } from './lead-creation/lead-creation.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'appDashboard', component: AppDashboardComponent },
  { path: 'leadCreation', component: LeadCreationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewPasswordComponent,
    HeroimageComponent,
    AppDashboardComponent,
    NavbarComponent,
    LeadCreationComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [AuthService, NgbDropdown],
  bootstrap: [AppComponent]
})
export class AppModule { }
