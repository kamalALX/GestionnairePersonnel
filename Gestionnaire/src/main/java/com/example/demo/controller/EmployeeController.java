package com.example.demo.controller;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.entities.enums.JobTitle;
import com.example.demo.service.IEmployee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    @Autowired
    IEmployee iEmployee;

    @GetMapping("/{id}")
    ResponseEntity<EmployeeDTO> getEmployee( @PathVariable Long id){
        iEmployee.getEmployeeById(id);
        return ResponseEntity.ok().body(iEmployee.getEmployeeById(id));
    }


    @GetMapping("")
    ResponseEntity<List<EmployeeDTO>> allEmployees(){

        return ResponseEntity.ok().body(iEmployee.getAllEmployees());
    }



    @PostMapping("/create")
    public ResponseEntity<EmployeeDTO> createEmployeee(@RequestBody EmployeeDTO EmployeeDTO) {
        EmployeeDTO createdPatient = iEmployee.createEmployee(EmployeeDTO);
        return ResponseEntity.ok(createdPatient);
    }

    @GetMapping("/employees/{jobTitle}")
    ResponseEntity<List<EmployeeDTO>> allEmployees(@PathVariable JobTitle jobTitle){
        return ResponseEntity.ok().body(iEmployee.getEmployeesByJobTitle(jobTitle));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        iEmployee.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@RequestBody EmployeeDTO employeeDTO, @PathVariable Long id) {
        EmployeeDTO updatedEmployee = iEmployee.updateEmployee(employeeDTO, id);
        return ResponseEntity.ok(updatedEmployee);
    }
    @PostMapping("/uploadPdf/{id}")
    public ResponseEntity<Void> uploadPdf(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws  IOException {
        iEmployee.savePdf(id, file);
        return ResponseEntity.ok().build();
    }
        @GetMapping("/downloadPdf/{id}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {
        byte[] pdfFile = iEmployee.getPdf(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.builder("attachment").filename("file.pdf").build());

        return new ResponseEntity<>(pdfFile, headers, HttpStatus.OK);
    }
}
