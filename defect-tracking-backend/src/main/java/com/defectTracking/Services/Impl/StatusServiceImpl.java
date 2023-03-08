package com.defectTracking.Services.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.defectTracking.Dao.StatusRepository;
import com.defectTracking.Entity.Status;
import com.defectTracking.Services.IStatusService;

@Service
public class StatusServiceImpl implements IStatusService {

	@Autowired
	private StatusRepository statusRepository;

	@Override
	public List<Status> getStatus() {
		return statusRepository.findAll();
	}

}
