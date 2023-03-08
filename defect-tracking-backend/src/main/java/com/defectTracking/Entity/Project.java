package com.defectTracking.Entity;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Project {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "projectid_pk")
	private int projectid;

	@Column(unique = true, length = 50)
	private String projectName;
	@Column(length = 150)
	private String description;
	@Column(length = 20)
	private String createdTime;
	@Column(length = 20)
	private String modifiedTime;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinTable(name = "projectusermapping", joinColumns = { @JoinColumn(name = "projectid_pk") }, inverseJoinColumns = {
			@JoinColumn(name = "userid_pk") })
	private User creator;

	@JsonIgnore
	@JsonBackReference
	@OneToMany(mappedBy = "project")
	private List<Ticket> ticket;

	public Project() {
		super();
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date ct = new Date();
		this.createdTime = dateFormat.format(ct);
		Date mt = new Date();
		this.modifiedTime = dateFormat.format(mt);
	}

}
