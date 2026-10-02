package com.basiccrud.demo.services;

import com.basiccrud.demo.entity.Student;
import com.basiccrud.demo.repos.StudentRepos;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class studentService {

    private final StudentRepos studentRepos;

    public studentService(StudentRepos studentRepos) {
        this.studentRepos = studentRepos;
    }

    public Student createStudent(Student student) {
        return studentRepos.save(student);
    }

    public List<Student> createAllStudent(List<Student> student){
        return studentRepos.saveAll(student);
    }


    //get the student

    public Student getStudent(Long id) {
        return studentRepos.findById(id).orElse(null);
    }

    public  List<Student> GetAllStudent(){
        return studentRepos.findAll();
    }

    //update
    public  Student updateStudent(Long id, Student student) {

        Student existingStudent = studentRepos.findById(id).orElse(null);

        if (existingStudent == null) {
            return null;
        }

        existingStudent.setName(student.getName());
        existingStudent.setAge(student.getAge());
        existingStudent.setRollNo(student.getRollNo());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setSubject(student.getSubject());

        return studentRepos.save(existingStudent);
    }
    //delete
    public  void deleteStudent(Long id) {
        studentRepos.deleteById(id);
    }

    public void deleteStudentSoft(Long id) {
        Student student = studentRepos.findById(id).orElse(null);
        if (student == null) {
            return;
        }
        student.setDeleted(true);
        studentRepos.save(student);
    }
}