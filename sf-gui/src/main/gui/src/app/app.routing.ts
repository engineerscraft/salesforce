import {Router, RouterModule} from '@angular/router';
import {LoginFormComponent} from './login-form/login-form.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ForbiddenAccessComponent} from './forbidden-access/forbidden-access.component';
import {AuthguardService} from './services/authguard.service';
import {LeadDetailsComponent} from './lead-details/lead-details.component';
import {LeadDetailsResultComponent} from './lead-details-result/lead-details-result.component';
import {LeadDetailsEditComponent} from './lead-details-edit/lead-details-edit.component';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {AccountDetailsResultComponent} from './account-details-result/account-details-result.component';
import {AccountDetailsEditComponent} from './account-details-edit/account-details-edit.component';
import {ContactDetailsComponent} from './contact-details/contact-details.component';
import {OpportunityDetailsComponent} from './opportunity-details/opportunity-details.component';

export const routing = RouterModule.forRoot([
    { path: '', component: LoginFormComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthguardService] },
    { path: 'leadDetails', component: LeadDetailsComponent, canActivate: [AuthguardService] },
    { path: 'leadDetailsResult', component: LeadDetailsResultComponent, canActivate: [AuthguardService] },
    { path: 'leadDetailsEdit/:leadName', component: LeadDetailsEditComponent, canActivate: [AuthguardService] },
    { path: 'accountDetails', component: AccountDetailsComponent, canActivate: [AuthguardService] },
    { path: 'accountDetailsResult', component: AccountDetailsResultComponent, canActivate: [AuthguardService] },
    { path: 'accountDetailsEdit/:accountName', component: AccountDetailsEditComponent, canActivate: [AuthguardService] },
    { path: 'contactDetails', component: ContactDetailsComponent, canActivate: [AuthguardService] },
    { path: 'opportunityDetails', component: OpportunityDetailsComponent, canActivate: [AuthguardService] },
    { path: 'forbidden', component: ForbiddenAccessComponent, canActivate: [AuthguardService] },
    { path: '404', component: NotFoundComponent, canActivate: [AuthguardService] },
    { path: '**', redirectTo: '/404', canActivate: [AuthguardService] },
    ]);