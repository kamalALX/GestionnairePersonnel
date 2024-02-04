package com.example.demo.dto;

import com.example.demo.entities.enums.JobTitle;

import com.example.demo.entities.enums.SituationFamille;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {

    private Long id;
    private String name;
    @Email
    private String email;
    private JobTitle jobtitle;
    private byte[] pdfFile;
    private String cin;
    private String phone;
    private String address;
    private String city;
    private int cnss;
    private SituationFamille situationFamillle;
    private String niveauEtude;
}
