import { Component, OnInit } from '@angular/core';
import { Job } from '../model/job';
import { Http } from '@angular/http';

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
   
   constructor(http:Http){

    //OperationId: jobs.get - URI jobs to get all DB jobs.

     http.get('http://localhost:5000/v0/jobs').subscribe(result => {
       this.jobs = result.json() as Job[];
     });

     
  }
    //Method onSelect that binds the click event to show job details.
    onSelect(job:Job): void{
      this.selectedJob = job;
    }
}
