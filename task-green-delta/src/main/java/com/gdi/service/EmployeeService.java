package com.gdi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.gdi.entity.EmpBasicInfo;
import com.gdi.entity.EmpSkills;
import com.gdi.entity.Employee;
import com.gdi.entity.Login;
import com.gdi.repo.EmpBasicInfoRepo;
import com.gdi.repo.EmpSkillsRepo;

@Service
public class EmployeeService {

	@Value("${emp.list.api}")
	private String empApi;

	private static final Logger log = LogManager.getLogger(EmployeeService.class);
	@Autowired
	private EmpBasicInfoRepo basicInfoRepo;
	@Autowired
	private EmpSkillsRepo skillsRepo;

	@Autowired
	@Qualifier("default")
	private RestTemplate restTemplate;

	@Autowired
	public EmployeeService(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	public ResponseEntity<String> getEmployees() {
		log.info("calling the external api");

		return restTemplate.getForEntity(empApi, String.class);
	}

//    public List<Employee> getEmployees() throws IOException {
//        ResponseEntity<String> responseEntity = restTemplate.getForEntity(empApi, String.class);
//        String json = responseEntity.getBody();
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        
//        EmployeeApiResponse response = objectMapper.readValue(json, EmployeeApiResponse.class);
//
//        List<Employee> employees = response.getData();
//
//        return employees;
//    }

	public EmpBasicInfo manageRegistration(EmpBasicInfo basicInfo) {
		log.info("Requesting to register as a Employee.");
		List<EmpBasicInfo> dbEmp = basicInfoRepo.findByLastName(basicInfo.getLastName());

		EmpBasicInfo basicData = new EmpBasicInfo();
		basicData.setFirstName(basicInfo.getFirstName());
		basicData.setLastName(basicInfo.getLastName());
		basicData.setDateOfBirth(basicInfo.getDateOfBirth());
		basicData.setPhoneNumber(basicInfo.getPhoneNumber());
		basicData.setGender(basicInfo.getGender());

		if (dbEmp.size() > 0) {
			basicData.setUsername(basicInfo.getLastName() + String.format("%04d", new Random().nextInt(10000)));
		} else {
			basicData.setUsername(basicInfo.getLastName());
		}

		basicData.setPassword(basicInfo.getLastName() + String.format("%04d", new Random().nextInt(10000)));

		basicData = basicInfoRepo.save(basicData);

		log.info("Employee userName password, [{},{}]", basicData.getUsername(), basicData.getPassword());
		log.info("Employee basic info saved successfully..");

		if (basicData != null && basicInfo.getEmpSkillList().size() > 0) {
			saveSkills(basicInfo.getEmpSkillList());
		}
		return basicData;
	}

	private List<EmpSkills> saveSkills(List<EmpSkills> skills) {
		List<EmpSkills> list2Save = new ArrayList<EmpSkills>();
		log.info("Total Skill [{}]", list2Save.size(), "is starting to save");

		for (EmpSkills skill : skills) {
			list2Save.add(skill);
		}

		list2Save = skillsRepo.saveAll(list2Save);
		log.info("Employee skills saved successfully..");

		return list2Save;
	}

	public EmpBasicInfo loadEmpInfo(Login login) {

		EmpBasicInfo dbEmp = basicInfoRepo.findByUsername(login.getUsername());
		if (dbEmp == null) {
			dbEmp = new EmpBasicInfo();
			dbEmp.setErrMsg("User Name not found.");
		} else {
			if (!dbEmp.getPassword().equals(login.getPassword())) {
				dbEmp.setErrMsg("Password not match.");
			}
		}
		return dbEmp;
	}

}
