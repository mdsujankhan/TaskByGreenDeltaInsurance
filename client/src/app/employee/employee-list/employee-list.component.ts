import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/service/EmployeeService';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {

  public employeeList: Employee[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    debugger
    const response = this.route.snapshot.data['employees'];
    this.employeeList = response.data;
  }

  onGoRegistration(){
    this.router.navigate(['/auth/registration']);

  }

}
