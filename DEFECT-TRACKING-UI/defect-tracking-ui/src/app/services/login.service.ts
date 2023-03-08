import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url="http://localhost:8080"
  constructor(private http:HttpClient) {   }
   
   credential:any={
     username:null,
     password:null
   }
   generateToken(credential:any)
   {
    this.credential=credential;
     return this.http.post(`${this.url}/login`,credential);

   }

  gettoken()
  {
    return localStorage.getItem("token");
  }
  loginuser(token:any)
  {
   
    localStorage.setItem("token",token);
   return true;
  }

  isLoggedIn()
  {
    var token=localStorage.getItem("token");
    if(token==undefined||token==''||token==null)
    return false;
    else return true;
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem('qa');
    localStorage.removeItem('admin');
    localStorage.removeItem('developer');
    localStorage.removeItem('username');
    localStorage.removeItem("qadev");
    localStorage.removeItem("QADEV");
    localStorage.removeItem("projectId");
    return true;
  }
  getCredential()
  {
    return this.credential;
  }
}
