package com.defectTracking.Entity;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Getter
@Setter
@AllArgsConstructor
public class Ticket {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ticketid_pk;
	@Column(length = 50)
	private String ticketname;
	@Column(length = 150)
	private String description;

	@ManyToOne
	@JoinColumn(name = "statusid_fk")
	private Status statusid_fk;
	@Column(length = 20)
	private String createdtime;
	@Column(length = 20)
	private String modifiedtime;

	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "projectid_fk")
	private Project project;

	@JoinColumn(name = "assigntoid_fk")
	@ManyToOne
	private User assigntoid;

	@ManyToOne
	@JoinColumn(name = "creatorid_fk")
	private User ticketcreatorid;
	@Column(length = 100)
	private String remark;

	
	public Ticket() {
		super();
		 DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
			Date ct=new Date();
			this.createdtime = dateFormat.format(ct);

			Date mt= new Date();
			
			this.modifiedtime =dateFormat.format(mt);
	}
	
}