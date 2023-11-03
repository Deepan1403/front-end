// Retrieve the employeeId from the query parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const employeeId = urlParams.get('employeeId');

// Fetch employee details based on the employeeId
fetch("http://localhost:8080/employee/getbyid?employeeId="+employeeId)
  .then((response) => response.json())
  .then((employee) => {
    // Populate the form fields with the retrieved employee data
    document.getElementById('firstName').value = employee.firstName;
    document.getElementById('lastName').value = employee.lastName;
    document.getElementById('email').value = employee.email;
    document.getElementById('department').value = employee.department;
    document.getElementById('position').value = employee.position;
    document.getElementById('salary').value = employee.salary;
    document.getElementById('dob').value = employee.dateOfBirth;
  })
  .catch((error) => {
    console.error("Error fetching employee details: " + error);
  });
  function submitForm(event, employeeId) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const employeeResponse = {
        employeeId: employeeId,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        dateOfBirth: document.getElementById('dob').value,
        email: document.getElementById('email').value,
        department: document.getElementById('department').value,
        position: document.getElementById('position').value,
        salary: document.getElementById('salary').value
    };

    // Send the updated data to the server using an AJAX request
    fetch("http://localhost:8080/employee/update?employeeId="+employeeId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeResponse)
    })
    .then((response) => {
        if (response.status === 200) {
            // Handle success, e.g., show a success message to the user
            console.log('Employee updated successfully');
            window.location.href="viewEmployee.html"
        } else {
            // Handle errors, e.g., display an error message to the user
            console.error('Failed to update employee');
        }
    })
    .catch((error) => {
        // Handle network errors, e.g., show a generic error message to the user
        console.error('Error updating employee: ' + error);
    });
}