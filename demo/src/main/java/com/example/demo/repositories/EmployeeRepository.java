package com.example.demo.repositories;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.entities.Employee;
import com.example.demo.entities.enums.JobTitle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

     List<Employee> findEmployeesByJobtitle(JobTitle jobTitle);
}
