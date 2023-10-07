package com.gdi.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gdi.entity.EmpBasicInfo;

public interface EmpBasicInfoRepo  extends JpaRepository<EmpBasicInfo, Long>{

	List<EmpBasicInfo> findByLastName(String lastName);

	EmpBasicInfo findByUsername(String username);

}
