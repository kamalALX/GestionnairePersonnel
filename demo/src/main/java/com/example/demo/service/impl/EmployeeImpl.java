package com.example.demo.service.impl;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.entities.Employee;
import com.example.demo.entities.enums.JobTitle;
import com.example.demo.repositories.EmployeeRepository;
import com.example.demo.service.IEmployee;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.NoSuchElementException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeImpl implements IEmployee {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    EmployeeRepository employeeRepository;


    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        Employee employee = modelMapper.map(employeeDTO, Employee.class);
        employeeRepository.save(employee);
        return modelMapper.map(employee, EmployeeDTO.class);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> patients = employeeRepository.findAll();
        return patients.stream()
                .map(patient -> modelMapper.map(patient, EmployeeDTO.class))
                .collect(Collectors.toList());
    }



    @Override
    public List<EmployeeDTO> getEmployeesByJobTitle(JobTitle jobTitle) {
        List<Employee> employees =  employeeRepository.findEmployeesByJobtitle(jobTitle);
        return employees.stream()
                .map(employee -> modelMapper.map(employee, EmployeeDTO.class))
                .collect(Collectors.toList());

    }
    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);

    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id).get();
        return modelMapper.map(employee, EmployeeDTO.class);
    }
    @Override
    public EmployeeDTO updateEmployee(EmployeeDTO employeeDTO , long id) {
        Employee employee = employeeRepository.findById(id).get();
        employee.setName(employeeDTO.getName());
        employee.setJobtitle(employeeDTO.getJobtitle());
        employee.setEmail(employeeDTO.getEmail());
        employeeRepository.save(employee);
        return modelMapper.map(employee, EmployeeDTO.class);
    }

    public void savePdf(Long id, MultipartFile file) throws IOException {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        employee.setPdfFile(file.getBytes());
        employeeRepository.save(employee);
    }

// ...

    public byte[] getPdf(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Employee not found with id " + id));
        return employee.getPdfFile();
    }


}
