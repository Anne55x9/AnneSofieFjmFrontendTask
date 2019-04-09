import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  title = 'Welcome - I am a supercomputer and I am here to help';

  constructor() { }

  ngOnInit() {
  }

}
