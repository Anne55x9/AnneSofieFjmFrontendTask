import { Component, OnInit } from '@angular/core';
import { Stats } from '../../model/stats';
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

  single: any[] = [
    {
      name: "failed",
      value: 0
    },
    {
      name: "running",
      value: 1
    },
    {
      name: "submitted",
      value: 1
    },
    {
      name: "successful",
      value: 2
    },
    {
      name: "terminated",
      value: 0
    },
    {
      name: "unknown",
      value: 0
    }
  ];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = "Job state";
  showYAxisLabel = true;
  yAxisLabel = "Job count";
  

  colorScheme = {
    domain: ["#AAAAAA", "#A10A28", "#C7B42C", "#5AA454", "#AAAAAA", "#AAAAAA"]
  };

  onSelect(event) {
    console.log(event);
  }

  axisFormat(val) {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }
}
