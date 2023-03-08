import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import {user} from '../User'
@Injectable({
  providedIn: 'root'
})
export class AdminService {
 baseurl="http://localhost:8080"
  constructor(private http:HttpClient) { }
  newuser :user | undefined;
  
 
  getuser()
  {
    let params = new HttpParams();
    
    let  username=localStorage.getItem("username");
    console.log("get user inside userservice.ts",username);
    //username:
    let url="http://localhost:8080/users"+"/"+username;
   return this.http.get(url);
  }
 
insertEmployee(user:user):Observable<Object> {
    console.log("value from insertemployee in userservice");

    let url="http://localhost:8080/createuser";
      console.log(user); 
      return this.http.post(url,user);
  }

usernameExist(e:any)
{
  let url="http://localhost:8080/getbyusername"+"/"+e;
    return (this.http.get(url))
}

getUserIdByUsername()
{
  let e=localStorage.getItem("username");
 let url="http://localhost:8080/getIdbyusername"+"/"+e;
    return (this.http.get(url));
   
}

addProject(project:any)
{
 
  
  let url="http://localhost:8080/project/create";
  return this.http.post(url,project);

}

getProject()
{
  let url="http://localhost:8080/project/projects";
  return this.http.get(url);
}

getDeveloper(){
  let url="http://localhost:8080/getdeveloper";
  return this.http.get(url);
}

getStatus(){
  let url="http://localhost:8080/getstatus";
  return this.http.get(url);
}

updateUser(data:any,userid:any)
{
  
  let url="http://localhost:8080/updateuser/"+userid;
  return this.http.put(url,data);

}



}
