import { Component } from '@angular/core';
import { Job } from './job';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public jobs: Job[];

  constructor(http:Http){
    http.get('http://localhost:5000/v0/jobs').subscribe(result => {
      this.jobs = result.json() as Job[];
    });
  }
}
