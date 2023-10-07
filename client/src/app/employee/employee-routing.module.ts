import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeResolver } from '../service/EmployeeResolver';

const routes: Routes = [
  { path: 'list', 
  component: EmployeeListComponent ,
  resolve: {
    employees: EmployeeResolver,
  },
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
