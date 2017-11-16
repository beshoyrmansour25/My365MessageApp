import { AuthanticationGuard } from './../shared/guards/authantication.guard';
import { ViewComponent } from './view/view.component';
import { ControlComponent } from './control/control.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'control', pathMatch: 'full' },
  { path: 'control', component: ControlComponent , canActivate: [AuthanticationGuard] },
  { path: ':passcode', component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
