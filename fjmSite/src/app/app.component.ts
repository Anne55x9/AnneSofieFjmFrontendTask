
import { Component } from '@angular/core';
import { Job } from './job';
import { Http } from '@angular/http';
import { About } from './about';
import { Stats } from './stats';

//Select job:



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Declared variables for the calender view.
  
  public minDate: Date = new Date ("01/01/2018");
  public maxDate: Date = new Date ("01/07/2025");
  public value: Date = new Date (Date.now());

  //Components for date selection 

  public submittedSince: string;
  public submittedBefore: string

  public jobs: Job[];

  public info: About[];

  public stats: Stats[];

  //Contructor that implements http variable of type Http. 

  constructor(http:Http){

    //OperationId: jobs.get - URI jobs to get all DB jobs.

    http.get('http://localhost:5000/v0/jobs').subscribe(result => {
      this.jobs = result.json() as Job[];
    });
    //OperationId about.get

    http.get('http://localhost:5000/about').subscribe(result => {
      this.info = result.json() as About[]; 
    } );

    http.get('http://localhost:5000/v0/stats').subscribe(result => {
      this.stats = result.json() as Stats[]; 
    } );
  }

}
