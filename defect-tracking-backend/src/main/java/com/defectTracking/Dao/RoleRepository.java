package com.defectTracking.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.defectTracking.Entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

	String findRoleByRoleId(int roleid);
}
