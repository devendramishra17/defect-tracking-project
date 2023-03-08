import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseurl="http://localhost:8080"
  projectData:any=[];
  constructor(private http:HttpClient) { }
  getProject()
  {
    return this.http.get(`${this.baseurl}/project/projects`)
  }

  getTicketByProjectId(e:any)
  {
       
    let url="http://localhost:8080/ticketbyprojectid/"+""+e.data.projectid;
       this.projectData=e.data;
      
       return this.http.get(url);
  }

 projectNameExist(e:any)
 {
  let url="http://localhost:8080/project/getprojectname/"+""+e;
  return this.http.get(url);

 }

 updateProject(e:any)
 {
  let url="http://localhost:8080/project/updateproject/"+""+e.projectid;
  return this.http.put(url,e);
    
 }
  
}
