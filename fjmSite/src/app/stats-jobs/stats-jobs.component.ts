import { Component, OnInit } from '@angular/core';
import { Stats } from '../model/stats';
import { Http } from '@angular/http';

@Component({
  selector: 'app-stats-jobs',
  templateUrl: './stats-jobs.component.html',
  styleUrls: ['./stats-jobs.component.css']
})
export class StatsJobsComponent {
 
  //private field of type Stats as an array.
  private stats: Stats[];

  constructor(http:Http){

    //OperationId: stats.get - URI jobs to get all DB jobs.

     http.get('http://localhost:5000/v0/stats').subscribe(result => {
       this.stats = result.json() as Stats[]; 
    } );
  }

}
