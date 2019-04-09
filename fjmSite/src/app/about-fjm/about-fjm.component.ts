import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { About } from '../model/about';

@Component({
  selector: 'app-about-fjm',
  templateUrl: './about-fjm.component.html',
  styleUrls: ['./about-fjm.component.css']
})
export class AboutFjmComponent  {
  
  //private field info of About in an array.
  private info: About[];
  
  constructor(http:Http){
    //OperationId about.get

     http.get('http://localhost:5000/about').subscribe(result => {
       this.info = result.json() as About[]; 
    } );

   
  }

}
