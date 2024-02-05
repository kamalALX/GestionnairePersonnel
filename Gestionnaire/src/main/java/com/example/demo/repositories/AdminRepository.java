package com.example.demo.repositories;

import com.example.demo.entities.Admin;
import com.example.demo.entities.enums.AdminEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    List<Admin> findByAdminEnum(AdminEnum adminEnum);


}
