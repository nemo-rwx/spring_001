package com.basiccrud.demo.repos;

import com.basiccrud.demo.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepos extends JpaRepository<Student, Long> {
}