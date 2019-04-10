import { HttpService } from './../http.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Job } from '../../model/job';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-submitted',
  templateUrl: './jobs-submitted.component.html',
  styleUrls: ['./jobs-submitted.component.css'],
  providers:[HttpService]
})
export class JobsSubmittedComponent {

   //// variable jobs of type Job as an array.
    private jobs: Job[];

  ////Selected job variable type Job.
   private selectedJob : Job;

   //// static URL field. 
   private baseURL: string = "http://localhost:5000/v0/jobs/";
   
   //// Code from attempt to implemt service. Failed.  
    // constructor(private service: HttpService){}
      
    //   ngOnInit(){
    //     this.service.getAllJobs().subscribe(results=>this.jobs = results);
    //   }
    
   //// Constructor with 2 local parameters and a http get call. 
    constructor(private http:Http, private router : Router){

     //// OperationId: jobs.get - get method to request all jobs in DB.
      http.get(this.baseURL).subscribe(result => {
        this.jobs = result.json() as Job[];
      });
      //// Testing the definition of this http variable.
      console.log(http.get(""));

   }

   //// Method to get user back to frontpage from job submission page. 
     public gotoFrontpage(){
     this.router.navigate(['/frontpage']);
     }


    //// Method onSelect that binds the selected job object from view.
    //// The idea is that the method then takes the ID of the selectedJob 
    //// and then request the method that includes jobdetails (/jobs/{jobID}).
    //// But the method does not work ( steps : 1-4) below. 
     onSelect(job:Job, http:Http): void{
       this.selectedJob= job;

       //// 1. Check than th ID available selectedjoc object. 
       console.log(this.selectedJob.ID);

       //// 2. The console verifies that the URI is correct.
       console.log(this.baseURL + this.selectedJob.ID);
       
       //// 3. But the http variable is undefined and therefore the get method fails. 
        console.log(http);
      
       //// 4. Hence the method fails to extracts the detailed data from a job. 
          http.get(this.baseURL + this.selectedJob.ID).subscribe(result => {
          this.jobs = result.json() as Job[];
        });
     
     }
  
}
