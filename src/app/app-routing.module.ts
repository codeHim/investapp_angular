import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundsComponent } from './funds/funds.component';

const routes: Routes = [
  {
    path: 'test',
    component: FundsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
