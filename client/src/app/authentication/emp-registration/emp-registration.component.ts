import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/CommonService';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-registration',
  templateUrl: './emp-registration.component.html',
  styleUrls: ['./emp-registration.component.css']
})
export class EmpRegistrationComponent implements OnInit {
  public active = 1;
  public basicInfoFormValue: any;
  public clicked = false;
  public dateValid: any;

  public skillList = [
    {
      skillName: '',
      experience: 0,
      skillLevel: null
    }
  ];

  genderList = [
    { name: "Male", value: "Male" },
    { name: "Female", value: "Female" },
    { name: "Others", value: "Others" },
  ]

  skillLevels = [
    { name: "Beginner", value: "Beginner" },
    { name: "Intermediate", value: "Intermediate" },
    { name: "Advanced", value: "Advanced" },
  ]

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {

  }

  empBasicInfo = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [null],
    // dateOfBirth: [null, { validators: dateValidator }],
    dateOfBirth: [null, { validators: [Validators.required, dateValidator] }],
    phoneNumber: ['',
      [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(11),
        Validators.maxLength(11),
      ]
    ],
    gender: [null, Validators.required],
  });


  onSubmitRegForm() {
    this.clicked = true;

    const payload = this.empBasicInfo.value;
    payload.empSkillList = this.skillList;

    debugger

    this.commonService.sendRequest(payload, '/gdi/emp/registration').subscribe(
      (response) => {
        console.log('Response from server:', response);
        var payload = response;
        debugger
        if (!payload.errMsg) {
          Swal.fire({
            icon: 'success',
            title: 'Registion successfull..!',
            text: 'User Name: ' + `${response.username}` + ' Password: ' + `${response.password}`,
          });
          this.onRefreshForm();
        } else {
          Swal.fire(`${payload.errMsg}`);
          return;
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onRefreshForm() {
    const defaultFormValue = {
      firstName: '',
      lastName: [null],
      dateOfBirth: [null],
      phoneNumber: '',
      gender: [null],
    }
    this.active = 1;
    this.clicked = false;
    const skillObj = {
      skillName: '',
      experience: 0,
      skillLevel: null
    }

    this.skillList = [skillObj];
    this.empBasicInfo.patchValue(defaultFormValue);
  }

  onClickSignIn() {
    this.router.navigate(['']);

  }

  onClickNext() {
    this.clicked = true;
    this.basicInfoFormValue = this.empBasicInfo.value;
    debugger
    if (this.active == 1 && this.empBasicInfo.valid) {
      this.active += 1
    } else if (this.active == 2) {
      if (this.skillList[0].skillName != '' && this.skillList[0].experience != 0 && this.skillList[0].skillLevel != null) {
        this.active += 1
      } else {
        Swal.fire({
          icon: 'error',
          title: 'You havn\'t add any skill...!',
          text: 'Please, Add your Skills.',
        });
      }
    }

  }

  onClickPrevious() {
    this.active -= 1
  }

  onTabChange(event: any): void {
    debugger
    this.basicInfoFormValue = this.empBasicInfo.value;
    // if (this.active !== event.nextId) {
    //   if (this.empBasicInfo.valid) {
    //     this.active = event.nextId;
    //   } else {
    //     this.clicked = true;
    //     event.preventDefault
    //   }
    // }


    if (event.nextId == 1) {
      this.active = event.nextId;
    }
    else if (event.nextId == 2) {
      if (this.empBasicInfo.valid) {
        this.active = event.nextId;
      } else {
        this.clicked = true;
        event.preventDefault();
      }
    } 
    else if (event.nextId == 3) {
      if (this.skillList[0].skillName != '' && this.skillList[0].experience != 0 && this.skillList[0].skillLevel != null) {
        this.active = event.nextId;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'You havn\'t add any skill...!',
          text: 'Please, Add your Skills.',
        });
        event.preventDefault();
      }
    }

  }


  addRow2Table(): boolean {
    var isUndefine = this.skillList.find(e => e.skillName == '' || e.experience == 0 || e.skillLevel == '');
    debugger
    if (isUndefine != undefined) {
      alert("All values are required...!");
      return true;
    }
    const obj = {
      skillName: '',
      experience: 0,
      skillLevel: null
    }
    debugger
    this.skillList.push(obj)
    return true;
  }


  deleteRow(x: any, item: any) {
    debugger
    if (x > 0) {

      Swal.fire({
        title: 'Are You Determind to Delete This?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {

        if (result.value == true) {
          this.skillList.splice(x, 1);

          if (item.nfaId > 0) {
            var payload = {
              active: 0,
              nfaId: item.nfaId,
            }
            this.http.post(environment.SERVER_BASE_URL + '/delete/nfa/details/item', payload)
              .subscribe((res) => {
                console.log(res);
              });
          }
        }
      });
    } else {
      Swal.fire({
        title: "You Cann't Delete This !!",
        toast: true,
        timer: 3000
      });
    }
  }

}
export const dateValidator: ValidatorFn = (control: any): ValidationErrors | null => {
  const start = control.value;
  const end = new Date().toJSON().slice(0, 10);
  console.log("validators called");
  console.log("start date", start);
  console.log("end date", end);
  const res = start != null && start >= end
    ? { dateValid: true } : null;
  console.log("validators res:", res);
  return res;
}