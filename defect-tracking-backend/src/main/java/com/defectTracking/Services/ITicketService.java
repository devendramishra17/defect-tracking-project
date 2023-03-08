package com.defectTracking.Services;

import java.util.List;

import com.defectTracking.Entity.Ticket;

public interface ITicketService {

	public Ticket addTicket(Ticket ticket);
	
	public List<Ticket> getTicktet();
	
	public List<Ticket> getTicketByUsername(String username);
	
	public List<Ticket> getTicketByProject(int project);

	public List<Ticket> getTicketByProjectIdAndUsername(int projectid, String username);

	Ticket updateTicket(Ticket newTicket, int ticketid);

	public Boolean ticketNamaByProject(int projectid, String ticketname);
	
}
