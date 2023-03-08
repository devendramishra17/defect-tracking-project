import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
@Component({
  selector: 'app-qadev',
  templateUrl: './qadev.component.html',
  styleUrls: ['./qadev.component.css']
})
export class QadevComponent implements OnInit {

  Selectrole:any=["Developer","QA"];
  setrole:String="";
  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  
  

  setUser(e:any){
    if(e.target.innerText=='QA')
    {
     localStorage.removeItem('developer');
      localStorage.setItem('qa',"QA");
     
      this.route.navigate(['/userprojects'])  
    }
    if(e.target.innerText=='Developer')
    {
      localStorage.removeItem('qa');
     localStorage.setItem('developer',"Developer");
     this.route.navigate(['/userprojects']) 
    }
  }
}
