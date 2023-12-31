package com.gdi.service;

import java.util.Date;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gdi.entity.EmpBasicInfo;
import com.gdi.entity.Login;
import com.gdi.repo.LoginRepo;

import io.micrometer.common.util.StringUtils;

@Service
public class LoginService {
	private static final Logger log = LogManager.getLogger(LoginService.class);

	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private LoginRepo loginRepo;
	
	public Login processLogin(Login login) {
		Login lg = new Login();
		log.info("Request comes to process login");
		
		boolean isValid = validatePassword(login.getPassword());
		
		EmpBasicInfo dbEmp = employeeService.loadEmpInfo(login);
		if(StringUtils.isBlank(dbEmp.getErrMsg())) {
			lg.setUsername(login.getUsername());
			lg.setPassword(login.getPassword());
			lg.setLoginTime(new Date());
			loginRepo.save(lg);
		}else {
			log.info("Getting errot msg: [{}]", dbEmp.getErrMsg());

			lg.setErrMsg(dbEmp.getErrMsg());
		}
		
		return lg;
	}
	
	
	   public static boolean validatePassword(String password) {
			log.info("Request comes to validate password: [{}]", password);

	        String digitRegex = ".*\\d.*";
	        String uppercaseRegex = ".*[A-Z].*";
	        String lowercaseRegex = ".*[a-z].*";
	        String specialCharRegex = ".*[@#$%^&+=].*";

	        boolean containsDigit = password.matches(digitRegex);
	        boolean containsUppercase = password.matches(uppercaseRegex);
	        boolean containsLowercase = password.matches(lowercaseRegex);
	        boolean containsSpecialChar = password.matches(specialCharRegex);

	        return containsDigit && containsUppercase && containsLowercase && containsSpecialChar;
	    }

}
