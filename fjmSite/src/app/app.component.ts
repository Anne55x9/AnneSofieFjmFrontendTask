import { Component } from '@angular/core';
import { Job } from './job';
import { Http } from '@angular/http';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public minDate: Date = new Date ("01/01/2018");
  public maxDate: Date = new Date ("01/07/2025");
  public value: Date = new Date (Date.now());
 

  public jobs: Job[];

  constructor(http:Http){
    http.get('http://localhost:5000/v0/jobs').subscribe(result => {
      this.jobs = result.json() as Job[];
    });
  }
}
