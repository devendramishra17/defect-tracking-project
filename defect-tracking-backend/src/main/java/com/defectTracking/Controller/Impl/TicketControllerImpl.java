package com.defectTracking.Controller.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.defectTracking.Controller.ITicketController;
import com.defectTracking.Entity.Ticket;
import com.defectTracking.Services.ITicketService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping
public class TicketControllerImpl implements ITicketController {

	@Autowired
	private ITicketService iTicketService;

	@Override
	public Ticket addTicket(Ticket ticket) {
		return iTicketService.addTicket(ticket);
	}

	@Override
	public List<Ticket> getTicket() {
		return iTicketService.getTicktet();
	}

	@Override
	public List<Ticket> getTicketByUsername(String username) {
		return iTicketService.getTicketByUsername(username);
	}

	@Override
	public List<Ticket> getTicketByProjectName(int projectId) {
		return iTicketService.getTicketByProject(projectId);
	}

	@Override
	public List<Ticket> getTicketByProjectIdAndUsername(int projectid, String username) {
		
		return iTicketService.getTicketByProjectIdAndUsername(projectid,username);
	}

	@Override
	public Ticket updateTicket(Ticket ticket, int id) {
		return iTicketService.updateTicket(ticket, id);
	}

	@Override
	public Boolean getTicketNameByProjectId(int projectid, String ticketname) {
		return iTicketService.ticketNamaByProject(projectid,ticketname);
	}

}
