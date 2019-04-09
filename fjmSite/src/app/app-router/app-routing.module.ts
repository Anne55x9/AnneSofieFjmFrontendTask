import { JobsSubmittedComponent } from './../jobs-submitted/jobs-submitted.component';
import { JobDetailComponent } from './../job-detail/job-detail.component';
import { FrontpageComponent } from './../frontpage/frontpage.component';
import { AboutFjmComponent } from './../about-fjm/about-fjm.component';



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';




const appRoutes: Routes = [
  { path: 'frontpage', component: FrontpageComponent },
  { path: 'jobdetails', component: JobDetailComponent},
  { path: '',   redirectTo: '/frontpage', pathMatch: 'full' },
  { path: '**', component: JobsSubmittedComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
})
export class AppRouterModule { }