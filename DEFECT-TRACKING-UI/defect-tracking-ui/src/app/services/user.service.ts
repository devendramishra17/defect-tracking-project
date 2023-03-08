import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ticket } from '../Ticket';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http:HttpClient) { }
  insertTicket(ticket:ticket){
    let url="http://localhost:8080/ticket";
    return this.http.post(url,ticket);
  }

  getTicketByUsername(){
    let e=localStorage.getItem("username");
    let url="http://localhost:8080/ticketbyusername"+"/"+e;
    return this.http.get(url);
  }

  getAllTicket(){
    let url="http://localhost:8080/ticket";
    return this.http.get(url);
  }

  getTicketByProjectId(id:any)
  {
    let url="http://localhost:8080/ticketbyprojectid/"+""+id;
    return this.http.get(url);
  }

  getProjectByProjectId(id:any) {
    let url="http://localhost:8080/project/project/"+""+id;
    return this.http.get(url);
   
  }

  getTicketByProjectIdAndUsername(id:any)
  {
    var username=localStorage.getItem("username");
    let url="http://localhost:8080/ticketbyprojectidnandusername/"+""+id+"/"+username;
    return this.http.get(url);
  }

  updateTicket(data:any,ticketid_pk:any)
  {
    let url="http://localhost:8080/updateticket/"+ticketid_pk;
    return this.http.put(url,data);

  }

  
  getTicketNameByProjectId(id:any,ticketName:any)
  {
   
    let url="http://localhost:8080/ticketnamebyprojectid/"+""+id+"/"+ticketName;
    return this.http.get(url);
  }

}
