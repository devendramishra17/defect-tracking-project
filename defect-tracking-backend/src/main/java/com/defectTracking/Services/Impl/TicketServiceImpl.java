package com.defectTracking.Services.Impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.defectTracking.Dao.TicketRepository;
import com.defectTracking.Dao.UserRepository;
import com.defectTracking.Entity.Ticket;
import com.defectTracking.Entity.User;
import com.defectTracking.Services.ITicketService;

@Service
public class TicketServiceImpl implements ITicketService {

	@Autowired
	private TicketRepository ticketRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Ticket addTicket(Ticket ticket) {
		ticketRepository.save(ticket);
		return ticket;
	}

	@Override
	public List<Ticket> getTicktet() {
		return ticketRepository.findAll();
	}

	@Override
	public List<Ticket> getTicketByUsername(String username) {
		User userticket = userRepository.findByUsername(username);
		return ticketRepository.findTicketByassignto(userticket.getUserid());
	}

	@Override
	public List<Ticket> getTicketByProject(int projectid) {
		return ticketRepository.findByProjectName(projectid);
	}

	@Override
	public List<Ticket> getTicketByProjectIdAndUsername(int projectid, String username) {
		User currentUser = userRepository.findByUsername(username);
	   List<Ticket> tickets= ticketRepository.findTicketByProjectIdAndUsername(projectid,currentUser.getUserid());
	   if(tickets==null)
	   {
		   return null;
	   }
	   return tickets;
	 }
	
	@Override
	public Ticket updateTicket(Ticket newTicket,int ticketid)
	{
		Optional<Ticket> u = ticketRepository.findById(ticketid);
		Ticket ticketOld = u.get();
		// setting created time
		ticketOld.setCreatedtime(ticketOld.getCreatedtime());
		// setting first name if changed else setting old name
		if (newTicket.getStatusid_fk() != null)
			ticketOld.setStatusid_fk(newTicket.getStatusid_fk());
		else
			ticketOld.setStatusid_fk(ticketOld.getStatusid_fk());
		// setting last name if changed else setting old name
		if (newTicket.getRemark() != null)
			ticketOld.setRemark(newTicket.getRemark());
		else ticketOld.setRemark(ticketOld.getRemark());
		
		 DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
			Date ct=new Date();
			
		ticketOld.setModifiedtime(dateFormat.format(ct));
		 ticketRepository.save(ticketOld);
		 return ticketOld;
		
	}

	@Override
	public Boolean ticketNamaByProject(int projectid, String ticketname) {
		Ticket t=ticketRepository.getTicketByProjectId(projectid,ticketname);
		if(t==null)
			 return true;
		return false;
	}

}
