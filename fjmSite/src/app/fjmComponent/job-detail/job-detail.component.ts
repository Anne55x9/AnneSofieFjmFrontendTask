
import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../model/job';
import { Http } from '@angular/http';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent  {

  //// variable djob of type Job as an array. 
 private djob: Job[];

 //// Input parameter job from UI. 
 //// The input property enables the selection of a job in th UI.  
  @Input() public job: Job;
   
  //// Http get request to show details on job 81. 
  constructor(private http:Http) { 
    http.get('http://localhost:5000/v0/jobs/5e01d101-4ca0-4fed-99de-ae920db2e632').subscribe(result => {
       this.djob = result.json() as Job[];
     });
  }
  
}

