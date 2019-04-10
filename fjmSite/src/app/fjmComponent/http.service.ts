import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

//// rxjs that uses observables
import 'rxjs/add/operator/map';

import { Job } from '../model/job';


//// The service should facilitate better code practice. The http request 
//// request should NOT be declared directly in the different constructors of the components. 
//// However the list of jobs is empty when using the service. 
//// Therefore the service is not implemented in this prototype. 

@Injectable()
export class HttpService{

    //// declared standard URL
    private baseURL: string = "http://localhost:5000/v0";

    //// Service constructor with a local parameter HttpClient with better functionality. 
    constructor(private http: HttpClient){}
    
    //// method to request all jobs from DB
    getAllJobs(){
        return this.http.get(this.baseURL + '/jobs/')
        .map(response => <Job[]> response['results']);       
    }

    //// method to request details on a single job using the job ID. 
    getDetailsJob(){
        return this.http.get(this.baseURL + '/jobs/{jobID}')
        .map(response => <Job[]> response['results']);
    }
}