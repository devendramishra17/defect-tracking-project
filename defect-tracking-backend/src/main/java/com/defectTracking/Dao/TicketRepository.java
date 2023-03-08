package com.defectTracking.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.defectTracking.Entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

	@Query("SELECT t from Ticket t inner join User u on u.userid = t.assigntoid where u.userid = :p")
	List<Ticket> findTicketByassignto(@Param("p") int userid);

	@Query("SELECT t from Ticket t inner join Project p on t.project = p.projectid where p.projectid = :r order by createdtime desc")
	List<Ticket> findByProjectName(@Param("r") int projectid);

	@Query(" select t from Ticket t where t.project.projectid= :r and t.assigntoid.userid= :s")
	List<Ticket> findTicketByProjectIdAndUsername(@Param("r") int projectid,@Param("s") int userid);

	@Query(" select t from Ticket t where t.project.projectid= :r and t.ticketname= :s")
	Ticket getTicketByProjectId(@Param("r")int projectid,@Param("s") String ticketname);

}
