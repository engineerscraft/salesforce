import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbDropdown  } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { CountryService } from './country.service';
import { StateService } from './state.service';
import { DistrictService } from './district.service';
import { ContactService } from './contact.service';
import { ProductService } from './product.service';
import { SalesrepService } from './salesrep.service';
import { DivisionService } from './division.service';
import { LeadService } from './lead.service';
import { NewPasswordComponent } from './new-password/new-password.component';
import { HeroimageComponent } from './heroimage/heroimage.component';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LeadCreationComponent } from './lead-creation/lead-creation.component';
import { ContactCreationComponent } from './contact-creation/contact-creation.component';
import { SalesrepCreationComponent } from './salesrep-creation/salesrep-creation.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HelpGadgetComponent } from './help-gadget/help-gadget.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { SalesrepCardComponent } from './salesrep-card/salesrep-card.component';
import { SalesrepFormComponent } from './salesrep-form/salesrep-form.component';
import { SalesrepsComponent } from './salesreps/salesreps.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { SalesrepDetailsComponent } from './salesrep-details/salesrep-details.component';
import { LeadFormComponent } from './lead-form/lead-form.component';
import { LeadsComponent } from './leads/leads.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { ProductSelectorComponent } from './product-selector/product-selector.component';
import { ContactSelectorComponent } from './contact-selector/contact-selector.component';
import { ProdInstEditorComponent } from './prod-inst-editor/prod-inst-editor.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: AppDashboardComponent },
  { path: 'leadCreation', component: LeadCreationComponent },
  { path: 'contactCreation', component: ContactCreationComponent },
  { path: 'salesrepCreation', component: SalesrepCreationComponent }, 
  { path: 'contacts', component: ContactsComponent },
  { path: 'contactDetails/:pubKey', component: ContactDetailsComponent },
  { path: 'salesreps', component: SalesrepsComponent },
  { path: 'salesrepDetails/:pubKey', component: SalesrepDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewPasswordComponent,
    HeroimageComponent,
    AppDashboardComponent,
    NavbarComponent,
    LeadCreationComponent,
    ContactCreationComponent,
    SalesrepCreationComponent,
    ContactsComponent,
    HelpGadgetComponent,
    ContactFormComponent,
    ContactCardComponent,
    SalesrepCardComponent,
    SalesrepFormComponent,
    SalesrepsComponent,
    ContactDetailsComponent,
    SalesrepDetailsComponent,
    LeadFormComponent,
    LeadsComponent,
    LeadDetailsComponent,
    ProductSelectorComponent,
    ContactSelectorComponent,
    ProdInstEditorComponent
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
    NgbModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService, 
    NgbDropdown, 
    HttpService, 
    CountryService, 
    StateService, 
    DistrictService,
    ContactService,
    ProductService,
    SalesrepService,
    DivisionService,
    LeadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
