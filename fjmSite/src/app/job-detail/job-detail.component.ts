import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../model/job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  @Input() public job: Job;
   
  constructor() { }

  ngOnInit() {
  }



}
