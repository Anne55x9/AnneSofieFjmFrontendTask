import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../model/job';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-submitted',
  templateUrl: './jobs-submitted.component.html',
  styleUrls: ['./jobs-submitted.component.css']
})
export class JobsSubmittedComponent {

  //Private fields for the Job interface (models).
  private jobs: Job[];

  
  

   //Selected job variable
   private selectedJob : Job;
   
   constructor(http:Http, private router : Router){

    //OperationId: jobs.get - URI jobs to get all DB jobs.

     http.get('http://localhost:5000/v0/jobs').subscribe(result => {
       this.jobs = result.json() as Job[];
     });
     
  }

    public gotoFrontpage(){
    this.router.navigate(['/frontpage']);
    }
    //Method onSelect that binds the click event to show job details.
    onSelect(job:Job): void{
      this.selectedJob = job;
    }


}
