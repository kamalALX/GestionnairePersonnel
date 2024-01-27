package com.example.demo.entities;

import com.example.demo.entities.enums.JobTitle;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Email(message = "Email should be valid")
    private String email;
    private JobTitle jobtitle;

    @Lob
    private byte[] pdfFile;
}
