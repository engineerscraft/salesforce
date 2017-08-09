import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserService } from './services/user.service';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthenticatorService } from './services/authenticator.service';
import { HttpService } from './services/http.service';
import { AuthguardService } from './services/authguard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenAccessComponent } from './forbidden-access/forbidden-access.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { EmployeeDetailsResolve } from './resolvers/employee-details.resolve';
import { SafePipe } from './pipes/safe.pipe';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { OpportunityDetailsComponent } from './opportunity-details/opportunity-details.component';
import { LeadDetailsResultComponent } from './lead-details-result/lead-details-result.component';
import { LeadDetailsEditComponent } from './lead-details-edit/lead-details-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    SideBarComponent,
    SpinnerComponent,
    NotFoundComponent,
    ForbiddenAccessComponent,
    DatePickerComponent,
    SafePipe,
    LeadDetailsComponent,
    AccountDetailsComponent,
    ContactDetailsComponent,
    OpportunityDetailsComponent,
    LeadDetailsResultComponent,
    LeadDetailsEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule
  ],
  providers: [
    AuthenticatorService,
    HttpService,
    UserService,
    AuthguardService,
    { provide: "windowObject", useValue: window}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
