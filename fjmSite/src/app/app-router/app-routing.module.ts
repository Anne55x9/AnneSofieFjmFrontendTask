import { FrontpageComponent } from './../frontpage/frontpage.component';
import { AboutFjmComponent } from './../about-fjm/about-fjm.component';



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';




const appRoutes: Routes = [
  { path: 'frontpage', component: FrontpageComponent },
  { path: '',   redirectTo: '/frontpage', pathMatch: 'full' },
  { path: '**', component: AboutFjmComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
})
export class AppRouterModule { }