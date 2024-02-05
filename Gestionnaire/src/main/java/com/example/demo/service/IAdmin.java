package com.example.demo.service;

import com.example.demo.dto.AdminDTO;
import com.example.demo.dto.EmployeeDTO;
import com.example.demo.entities.enums.AdminEnum;
import com.example.demo.entities.enums.JobTitle;

import java.util.List;

public interface IAdmin {
    AdminDTO createAdmin(AdminDTO adminDTO);
    List<AdminDTO> getAllAdmins();
    List<AdminDTO> getAdmin(AdminEnum adminEnum);
    void deleteAdmin(Long id);
    AdminDTO getAdminById(Long id);

    AdminDTO updateAdmin(AdminDTO adminDTO, long id );


}
