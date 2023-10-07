package com.gdi.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gdi.entity.Login;

public interface LoginRepo extends JpaRepository<Login, Long> {

}
