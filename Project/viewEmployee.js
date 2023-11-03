function populateTable() {
  const eventTable = document.getElementById("eventTable");

   // Create a header row
const headerRow = eventTable.insertRow();
const headers = ['employeeId', 'firstName', 'lastName','email','dateOfBirth','department','position','salary','delete','update'];
// Populate the header cells
headers.forEach((header) => {
  const headerCell = document.createElement("th");
  headerCell.innerHTML = header;
  headerRow.appendChild(headerCell);
});

  // Send an AJAX request to fetch employee details from the server
  fetch('http://localhost:8080/employee/alldata')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((employee) => {
        const row = eventTable.insertRow();

        const properties = ['employeeId', 'firstName', 'lastName','email','dateOfBirth','department','position','salary']; // Add more properties as needed

        properties.forEach((property) => {
          const cell = row.insertCell();
          cell.innerHTML = employee[property];
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => handleDelete(employee.employeeId));
        row.insertCell().appendChild(deleteButton);

        const updateButton = document.createElement("button");
        updateButton.innerText = "Update";
        updateButton.addEventListener("click", () => handleUpdate(employee.employeeId));
        row.insertCell().appendChild(updateButton);
      });
    })
    .catch((error) => {
      console.error("Error fetching data: " + error);
    });
}

// Function to handle the "Delete" button click event
function handleDelete(employeeId) {
  // Implement the logic to delete the employee with the given employeeId
  // You may use a separate AJAX request to your server to perform the delete operation
  fetch("http://localhost:8080/employee/delete?employeeId="+employeeId, {
    method: "DELETE",
  })
    .then((response) => {
      console.log(response)
      if (response.status=== 200) {
          window.location.reload()
      } else {
        console.error("Failed to delete employee.");
      }
    })
    .catch((error) => {
      console.error("Error deleting employee: " + error);
    });
}

// Function to handle the "Update" button click event
function handleUpdate(employeeId) {
  window.location.href = `update.html?employeeId=${employeeId}`;
  // Implement the logic to update the employee with the given employeeId
  // You may redirect to an update page or show a modal for editing
  // Example: window.location.href = `/employee/update?employeeId=${employeeId}`;
}

// Call the populateTable function when the page is loaded
document.addEventListener("DOMContentLoaded", populateTable);


