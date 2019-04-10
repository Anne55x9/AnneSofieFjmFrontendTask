import { JobsSubmittedComponent } from '../fjmComponent/jobs-submitted/jobs-submitted.component';
import { JobDetailComponent } from '../fjmComponent/job-detail/job-detail.component';
import { FrontpageComponent } from '../fjmComponent/frontpage/frontpage.component';



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';


//Puting to administrate navigation between website pages.

const appRoutes: Routes = [
  { path: 'frontpage', component: FrontpageComponent },
  { path: '',   redirectTo: '/frontpage', pathMatch: 'full' },
  { path: 'jobsubmitted', component: JobsSubmittedComponent },
  { path: 'jobdetail', component: JobDetailComponent}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
})
export class AppRouterModule { }