import { OppService } from './opp.service';
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
import { AccountService } from './account.service';
import { CommentService } from './comment.service';
import { LeadService } from './lead.service';
import { StatusService } from './status.service';
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
import { AccountSelectorComponent } from './account-selector/account-selector.component';
import { SalesrepSelectorComponent } from './salesrep-selector/salesrep-selector.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountCardComponent } from './account-card/account-card.component';
import { LeadCardComponent } from './lead-card/lead-card.component';
import { OppCardComponent } from './opp-card/opp-card.component';
import { OppCreationComponent } from './opp-creation/opp-creation.component';
import { OppDetailsComponent } from './opp-details/opp-details.component';
import { OppFormComponent } from './opp-form/opp-form.component';
import { OppsComponent } from './opps/opps.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: AppDashboardComponent },
  { path: 'contactCreation', component: ContactCreationComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contactDetails/:pubKey', component: ContactDetailsComponent },
  { path: 'leadCreation', component: LeadCreationComponent },
  { path: 'leads', component: LeadsComponent },
  { path: 'leadDetails/:pubKey', component: LeadDetailsComponent },
  { path: 'oppCreation', component: OppCreationComponent },
  { path: 'opps', component: OppsComponent },
  { path: 'oppDetails/:pubKey', component: OppDetailsComponent },
  { path: 'salesrepCreation', component: SalesrepCreationComponent }, 
  { path: 'salesreps', component: SalesrepsComponent },
  { path: 'salesrepDetails/:pubKey', component: SalesrepDetailsComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'accountDetails/:pubKey', component: AccountDetailsComponent }
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
    ProdInstEditorComponent,
    AccountSelectorComponent,
    SalesrepSelectorComponent,
    TimelineComponent,
    AccountsComponent,
    AccountDetailsComponent,
    AccountFormComponent,
    AccountCardComponent,
    LeadCardComponent,
    OppCardComponent,
    OppCreationComponent,
    OppDetailsComponent,
    OppFormComponent,
    OppsComponent
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
    LeadService,
    AccountService,
    StatusService,
    CommentService,
    OppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
