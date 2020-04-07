import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LiveComponent } from './components/live/live.component';
import { ErrorComponent } from './components/error/error.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'live/:slug', component: LiveComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
