package com.basiccrud.demo.controller;
import com.basiccrud.demo.entity.Student;
import com.basiccrud.demo.services.studentService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final studentService studentService;

    public StudentController(studentService studentService) {
        this.studentService = studentService;
    }

    // CREATE
    @PostMapping("/create")
    public Student createStudent(@RequestBody Student student) {
        student.setDeleted(false);
        return studentService.createStudent(student);
    }

    @PostMapping("/createAll")
    public List <Student> createAllStudent(
            @RequestBody List <Student> student){
        return studentService.createAllStudent(student);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Student getStudent(@PathVariable Long id) {
        return studentService.getStudent(id);
    }

    @GetMapping("/all")
    public List<Student> GetAllStudent (){
        return studentService.GetAllStudent();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        return studentService.updateStudent(id, student);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }
    @PatchMapping("/delete-soft/{id}")
    public String deleteSoft(@PathVariable Long id) {
        studentService.deleteStudentSoft(id);
        return "Student deleted successfully";
    }
}