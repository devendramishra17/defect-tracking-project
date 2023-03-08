package com.defectTracking.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.defectTracking.Entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	public User findByUsernameAndPassword(String username, String password);

	public User findByUsername(String username);

	@Query("select u from User u where u.username <> :p order by createdtime desc")
	public List<User> findAllExcept(@Param("p") String username);

	@Query("select u from User u where u.username = :p")
	public User findByUniqueUsername(@Param("p") String username);

	@Query(value = "select * from userrolemapping urm join User u on u.userid_pk = urm.userid_pk join Role r on r.roleid_pk = urm.roleid_pk where r.roleid_pk=3", nativeQuery = true)
	public List<User> findByRole();

}
