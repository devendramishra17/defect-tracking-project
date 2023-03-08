package com.defectTracking.Entity;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
@AllArgsConstructor
public class User implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userid_pk")
	private int userid;

	@Column(length = 20)
	private String firstname;
	@Column(length = 20)
	private String lastname;
	@Column(unique = true,length = 20)
	private String username;
	@Column(length = 100)
	private String password;

	@ManyToOne
	private User creatorid;

	@JsonIgnore
	@OneToMany(mappedBy = "creatorid",fetch = FetchType.EAGER)
	private Set<User> id;

	@Column(length = 20)
	private String createdtime;
	@Column(length = 20)
	private String modifiedtime;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinTable(name = "userrolemapping", joinColumns = { @JoinColumn(name = "userid_pk") }, inverseJoinColumns = {
			@JoinColumn(name = "roleid_pk") })
	private Set<Role> role;

	@JsonIgnore
	@OneToMany(mappedBy = "creator",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Project> project;
	
	@JsonIgnore
	@OneToMany(mappedBy = "assigntoid",fetch = FetchType.EAGER)
	private Set<Ticket> assignto;
	
	@JsonIgnore
	@OneToMany(mappedBy = "ticketcreatorid",fetch = FetchType.EAGER)
	private Set<Ticket> creatoridticket;

	public User() {
		super();
		 DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
			Date ct=new Date();
			this.createdtime = dateFormat.format(ct);

			Date mt= new Date();
			
			this.modifiedtime =dateFormat.format(mt);
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
