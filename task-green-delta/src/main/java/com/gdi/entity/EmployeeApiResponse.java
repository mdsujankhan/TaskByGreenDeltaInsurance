package com.gdi.entity;

import java.util.List;

public class EmployeeApiResponse {
	
    private String status;
    
    private List<Employee> data;
    
    private String message;
    
    
//Getter Setters
	public String getStatus() {
		return status;
	}

	public List<Employee> getData() {
		return data;
	}

	public String getMessage() {
		return message;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setData(List<Employee> data) {
		this.data = data;
	}

	public void setMessage(String message) {
		this.message = message;
	}
      
}
