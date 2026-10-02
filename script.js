const API_URL = "http://localhost:8080/api/student";


function getStudentData() {

    return {
        name: document.getElementById("name").value,
        age: Number(document.getElementById("age").value),
        rollNo: Number(document.getElementById("rollNo").value),
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        
    };

}


function showResult(data) {

    document.getElementById("result").textContent =
        JSON.stringify(data, null, 2);

}


// CREATE

async function createStudent() {

    const student = getStudentData();

    try {

        const response = await fetch(`${API_URL}/create`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });

        const data = await response.json();

        showResult(data);

    } catch (error) {

        showResult({
            error: error.message
        });

    }

}


// GET

async function getStudent() {

    const id = document.getElementById("studentId").value;

    if (!id) {

        alert("Please enter Student ID");

        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`);

        const data = await response.json();

        showResult(data);

        if (data) {

            document.getElementById("name").value = data.name;
            document.getElementById("age").value = data.age;
            document.getElementById("rollNo").value = data.rollNo;
            document.getElementById("email").value = data.email;
            document.getElementById("subject").value = data.subject;

        }

    } catch (error) {

        showResult({
            error: error.message
        });

    }

}


// UPDATE

async function updateStudent() {

    const id = document.getElementById("studentId").value;

    if (!id) {

        alert("Please enter Student ID");

        return;
    }

    const student = getStudentData();

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });

        const data = await response.json();

        showResult(data);

    } catch (error) {

        showResult({
            error: error.message
        });

    }

}


// DELETE

async function deleteStudent() {

    const id = document.getElementById("studentId").value;

    if (!id) {

        alert("Please enter Student ID");

        return;
    }

    const confirmDelete =
        confirm(`Are you sure you want to delete student ${id}?`);

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        const data = await response.text();

        showResult(data);

    } catch (error) {

        showResult({
            error: error.message
        });

    }

}

async function getAllStudents() {

    try {

        const response = await fetch(`${API_URL}/all`);

        const students = await response.json();

        const tableBody =
            document.getElementById("studentTableBody");

        tableBody.innerHTML = "";

        students.forEach(student => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.rollNo}</td>
                <td>${student.email}</td>
                <td>${student.subject}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {

        console.error(error);

        alert("Failed to load students");
    }
}

async function softdelete() {

    const id = document.getElementById("studentId").value;

    if (!id) {
        alert("Please enter Student ID");
        return;
    }

    const confirmDelete =
        confirm(`Are you sure you want to soft delete student ${id}?`);

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/delete-soft/${id}`,
            {
                method: "PATCH"
            }
        );

        const data = await response.text();

        showResult(data);

        // Refresh table
        getAllStudents();

    } catch (error) {

        showResult({
            error: error.message
        });
    }
}