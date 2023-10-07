import { Injectable } from "@angular/core";
import { EmployeeService } from "./EmployeeService";
import { Employee } from "../model/Employee";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class EmployeeResolver implements Resolve<Employee[]> {
  
  constructor(private employeeService: EmployeeService) { }

  resolve(): Observable<Employee[]> {
    return this.employeeService.getEmployeeList();
  }
}