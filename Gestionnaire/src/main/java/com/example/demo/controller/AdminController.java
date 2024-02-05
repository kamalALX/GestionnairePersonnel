package com.example.demo.controller;

import com.example.demo.dto.AdminDTO;
import com.example.demo.entities.enums.AdminEnum;
import com.example.demo.service.IAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    IAdmin iAdmin;

    @GetMapping("/{id}")
    ResponseEntity<AdminDTO> getAdmin(@PathVariable Long id) {
        return ResponseEntity.ok().body(iAdmin.getAdminById(id));
    }

    @GetMapping("")
    ResponseEntity<List<AdminDTO>> allAdmins() {
        return ResponseEntity.ok().body(iAdmin.getAllAdmins());
    }

    @PostMapping("/create")
    public ResponseEntity<AdminDTO> createAdmin(@RequestBody AdminDTO adminDTO) {
        AdminDTO createdAdmin = iAdmin.createAdmin(adminDTO);
        return ResponseEntity.ok(createdAdmin);
    }

    @GetMapping("/admins/{adminEnum}")
    ResponseEntity<List<AdminDTO>> getAdmins(@PathVariable AdminEnum adminEnum) {
        return ResponseEntity.ok().body(iAdmin.getAdmin(adminEnum));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        iAdmin.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AdminDTO> updateAdmin(@RequestBody AdminDTO adminDTO, @PathVariable Long id) {
        AdminDTO updatedAdmin = iAdmin.updateAdmin(adminDTO, id);
        return ResponseEntity.ok(updatedAdmin);
    }
}
