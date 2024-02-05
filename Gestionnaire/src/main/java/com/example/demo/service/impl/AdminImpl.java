package com.example.demo.service.impl;
import com.example.demo.dto.AdminDTO;
import com.example.demo.entities.Admin;
import com.example.demo.entities.enums.AdminEnum;
import com.example.demo.repositories.AdminRepository;
import com.example.demo.service.IAdmin;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminImpl implements IAdmin {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    AdminRepository adminRepository;

    @Override
    public AdminDTO createAdmin(AdminDTO adminDTO) {
        Admin admin = modelMapper.map(adminDTO, Admin.class);
        adminRepository.save(admin);
        return modelMapper.map(admin, AdminDTO.class);
    }

    @Override
    public List<AdminDTO> getAllAdmins() {
        List<Admin> admins = adminRepository.findAll();
        return admins.stream()
                .map(admin -> modelMapper.map(admin, AdminDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<AdminDTO> getAdmin(AdminEnum adminEnum) {
        List<Admin> admins = adminRepository.findByAdminEnum(adminEnum);
        return admins.stream()
                .map(admin -> modelMapper.map(admin, AdminDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    @Override
    public AdminDTO getAdminById(Long id) {
        Admin admin = adminRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin not found"));
        return modelMapper.map(admin, AdminDTO.class);
    }

    @Override
    public AdminDTO updateAdmin(AdminDTO adminDTO, long id) {
        Admin admin = adminRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin not found"));
        admin.setFirstName(adminDTO.getFirstName());
        admin.setLastName(adminDTO.getLastName());
        admin.setEmail(adminDTO.getEmail());
        adminRepository.save(admin);
        return modelMapper.map(admin, AdminDTO.class);
    }
}