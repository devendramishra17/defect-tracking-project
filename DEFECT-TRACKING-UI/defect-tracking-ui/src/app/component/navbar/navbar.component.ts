import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 public loggedIn=false;
  userloogedin:any
  constructor(private loginservice:LoginService) { 
    this.userloogedin= localStorage.getItem("username");
  }
  credential={
    username:"",
    password:""
     }
  
  ngOnInit(): void {
   
    this.loggedIn=this.loginservice.isLoggedIn();
   
  }
   
    role1=localStorage.getItem('admin')==null?" ":'Admin';
   role2=localStorage.getItem('qa')==null?" ":'QA';
   role3=localStorage.getItem('developer')==null?" ":"Developer";
   role4=localStorage.getItem("QADEV")==null?'':'QA Developer';
  

   role=this.role1+' '+this.role2+' '+this.role3+''+this.role4;
  
   logout()
  {
    this.loginservice.logout();
    location.reload();
    window.location.href="/login";
  }
   getcredential()
   {
     return  this.credential=this.loginservice.getCredential();
   }
}
