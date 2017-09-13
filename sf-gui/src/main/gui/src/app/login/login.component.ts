import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() newPasswordRequired = new EventEmitter<any>();

  private formGroup: FormGroup;

  private flags = {
    isProcessingInProgress: false
  };

  private error;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.flags.isProcessingInProgress = true;
    this.auth.authenticate(this.formGroup.value)
      .finally(() => { this.flags.isProcessingInProgress = false; })
      .subscribe(
        res => {
          this.router.navigate(['appDashboard']);
        },
        err => {
          localStorage.clear();
          this.error = err;
          setTimeout(() => {
            if (this.error) {
              this.error = undefined;
            }
          }, 4000);
        }
      );
  }
}
