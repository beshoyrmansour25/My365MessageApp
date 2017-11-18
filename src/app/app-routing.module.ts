import { AuthanticationGuard } from './shared/guards/authantication.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Lazy Loading Routes
const routes: Routes = [
  {path : '', redirectTo: 'auth' , pathMatch : 'full'},
  {path : 'auth' , loadChildren: 'app/authantication/authantication.module#AuthanticationModule' },
  {path : 'messages' , loadChildren: 'app/messages/messages.module#MessagesModule' }, // canLoad: [AuthanticationGuard]
  {path : '*' , loadChildren: 'app/authantication/authantication.module#AuthanticationModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
