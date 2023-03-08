package com.defectTracking.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.defectTracking.Entity.Status;

public interface StatusRepository extends JpaRepository<Status, Integer> {

}
