package com.example.demo.service;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.entities.Employee;
import com.example.demo.entities.enums.JobTitle;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IEmployee {

     EmployeeDTO createEmployee(EmployeeDTO employeeDTO);
    List<EmployeeDTO> getAllEmployees();
    List<EmployeeDTO> getEmployeesByJobTitle(JobTitle jobTitle);
    void deleteEmployee(Long id);
    EmployeeDTO getEmployeeById(Long id);

    EmployeeDTO updateEmployee(EmployeeDTO employeeDTO, long id );

    public default void savePdf(Long id, MultipartFile file) throws IOException {

    }
    EmployeeDTO getEmployeeByCin(String cin);

    byte[] getPdf(Long id);
}
