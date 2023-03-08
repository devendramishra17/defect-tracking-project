import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AdminService } from 'src/app/services/admin.service';
import * as CryptoJS from 'crypto-js';
import { user } from 'src/app/User';

import * as JsEncryptModule from 'jsencrypt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credential = {
    username: "",
    password: ""
  }
  publicKey: string = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3wNII83VEnFP34MbWRubsl5T8LfNdGSaSoj+vZ2CPBkT9GPIrg5bign4zrqXVzq1CHmBJY++JXnUuJzBmf+UKm8zGeLNu5G50UwOSB78jkwTb66hC6Bz1sK3+7UE4HCeuvY3eBY01cSaM/l+9DoY3ICcO5+6+7hYMoBiH1RQO9wIDAQAB";
  usernotpresent: boolean = false;
  pass: any
  uname: any
  encrpytPass: any
  constructor(private loginservice: LoginService, private userservice: AdminService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.uname != null && this.pass != null && (this.pass != '' && this.uname != '')) {

      localStorage.setItem("username", this.uname);
      let encrypt = new JsEncryptModule.JSEncrypt();
      encrypt.setPublicKey(this.publicKey);
      this.encrpytPass = encrypt.encrypt(this.pass.trim());
      this.credential.password = this.encrpytPass;
      this.credential.username = this.uname;
      this.loginservice.generateToken(this.credential).subscribe((response: any) => {
        if (response.roles.length > 1) {
          localStorage.setItem("qadev", "qadev");
          localStorage.setItem("QADEV", "QA Developer")
        }
        else {
          if (response.roles[0].roleName == 'admin' || response.roles[0].roleName == 'Admin') {
            localStorage.setItem("admin", 'admin');
          }

          if (response.roles[0].roleName == 'QA') {
            localStorage.setItem("qa", 'QA');
          }

          if (response.roles[0].roleName == 'Developer') {
            localStorage.setItem("developer", 'Developer');
          }
        }
        this.loginservice.loginuser(response.token);
        if (localStorage.getItem('admin') == 'admin') {
          window.location.href = "/dashboard/userlist"
        } else if (localStorage.getItem('developer') == "Developer") {
          window.location.href = "/userprojects";
        } else if (localStorage.getItem("qa") == "QA") {
          window.location.href = "/userprojects";
        } else {
          window.location.href = "qadev";
        }

      },
        error => {
          this.usernotpresent = true;
        });
    }
    else {
      console.log("fiels are empty");
    }
  }

}
