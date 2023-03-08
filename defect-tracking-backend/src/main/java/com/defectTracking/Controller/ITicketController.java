package com.defectTracking.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.defectTracking.Entity.Ticket;
import com.defectTracking.Entity.User;

public interface ITicketController {

	@PostMapping("/ticket")
	public Ticket addTicket(@RequestBody Ticket ticket);

	@GetMapping("/ticket")
	List<Ticket> getTicket();

	@GetMapping("/ticketbyusername/{username}")
	List<Ticket> getTicketByUsername(@PathVariable("username") String username);

	@GetMapping("/ticketbyprojectid/{projectid}")
	List<Ticket> getTicketByProjectName(@PathVariable("projectid") int projectid);
	
	@GetMapping("/ticketbyprojectidnandusername/{projectid}/{username}")
	List<Ticket> getTicketByProjectIdAndUsername(@PathVariable("projectid") int projectid,@PathVariable("username") String username );
    
	@PutMapping("/updateticket/{id}")
	Ticket updateTicket(@RequestBody Ticket ticket,@PathVariable("id") int id);

	@GetMapping("/ticketnamebyprojectid/{projectid}/{ticketname}")
	Boolean getTicketNameByProjectId(@PathVariable("projectid") int projectid,@PathVariable("ticketname") String ticketname );
}
