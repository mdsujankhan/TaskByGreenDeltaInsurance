package com.gdi.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gdi.entity.EmpBasicInfo;
import com.gdi.entity.Login;
import com.gdi.service.EmployeeService;
import com.gdi.service.LoginService;

@RestController
@CrossOrigin(origins = { "http://localhost:4200" })
@RequestMapping(value = "/gdi")
public class AppController {

	@Autowired
	private EmployeeService employeeService;
	@Autowired
	LoginService loginService;

	@GetMapping(value = "/test")
	public String handleCallBack() {

		return "Hello World...!";
	}

	@GetMapping(value = "/get/employees")
	public ResponseEntity<String> callEmployeeAPI() throws IOException {

		return employeeService.getEmployees();
	}

	@PostMapping(value = "/emp/registration")
	public EmpBasicInfo employeeRegistration(@RequestBody EmpBasicInfo basicInfo) {

		return employeeService.manageRegistration(basicInfo);
	}

	@PostMapping(value = "/login")
	public Login employeeLogin(@RequestBody Login login) {

		return loginService.processLogin(login);
	}
}
