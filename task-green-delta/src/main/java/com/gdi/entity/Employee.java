package com.gdi.entity;

import java.beans.Transient;

public class Employee {
	
	private Long id;
	
//	private String employeeName;
//	
//	private Double employeeSalary;
//	
//	private int employeeAge;
//	
//	private String profileImage;
	
	private String employee_name;
	
	private Double employee_salary;
	
	private int employee_age;
	
	private String profile_image;
	
	
	
	//Getter Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmployee_name() {
		return employee_name;
	}

	public Double getEmployee_salary() {
		return employee_salary;
	}

	public int getEmployee_age() {
		return employee_age;
	}

	public String getProfile_image() {
		return profile_image;
	}

	public void setEmployee_name(String employee_name) {
		this.employee_name = employee_name;
	}

	public void setEmployee_salary(Double employee_salary) {
		this.employee_salary = employee_salary;
	}

	public void setEmployee_age(int employee_age) {
		this.employee_age = employee_age;
	}

	public void setProfile_image(String profile_image) {
		this.profile_image = profile_image;
	}

}
