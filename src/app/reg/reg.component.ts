import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../check-form.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css', './reg.component350.css']
})
export class RegComponent implements OnInit {

  name: String;
  secname: String;
  email: String;
  password: String;
  confpassword: String;

  constructor(
    private checkForm: CheckFormService,
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  userRegisterClick() {
    const  user = {
      name: this.name,
      secname: this.secname,
      email: this.email,
      password: this.password,
      confpassword: this.confpassword
    };

    if (!this.checkForm.checkName(user.name)) {
      this.flashMessages.show("Pleace enter Name!", {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    } else if (!this.checkForm.checkSecName(user.secname)) {
      this.flashMessages.show("Pleace enter Last Name!", {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    } else if (!this.checkForm.checkEmail(user.email)) {
      this.flashMessages.show("Pleace enter Email!", {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    } else if (!this.checkForm.checkPassword(user.password)) {
      this.flashMessages.show("Pleace enter Password!", {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    } else if (!this.checkForm.checkConfPassword(user.confpassword)) {
      this.flashMessages.show("Pleace enter Confirm Password!", {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
        this.router.navigate(['/reg']);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 2000
        });
        alert("User " + this.name + ' ' + this.secname + " was added");
        this.router.navigate(['/auth']);
      }
    });

    localStorage.setItem('user', JSON.stringify(user));

  }
}
