// Function to populate the table with employee details
function populateTable() {
    const eventTable = document.getElementById("eventTable");
  
    // Send an AJAX request to fetch employee details from the server
    fetch('/employee/get?employeeId=1') // Adjust the URL and query parameters as needed
      .then((response) => response.json())
      .then((data) => {
        // Create a row for each employee
        const row = eventTable.insertRow();
        const cells = Object.values(data); // Assuming the server response is an object with employee details
  
        cells.forEach((cellData, index) => {
          const cell = row.insertCell(index);
          cell.innerHTML = cellData;
        });
  
        // Add "Delete" and "Update" buttons in the last column
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => handleDelete(data.employeeId)); // Implement delete functionality
        row.insertCell(cells.length).appendChild(deleteButton);
  
        const updateButton = document.createElement("button");
        updateButton.innerText = "Update";
        updateButton.addEventListener("click", () => handleUpdate(data.employeeId)); // Implement update functionality
        row.insertCell(cells.length).appendChild(updateButton);
      })
      .catch((error) => {
        console.error("Error fetching data: " + error);
      });
  }
  
  // Function to handle the "Delete" button click event
  function handleDelete(employeeId) {
    // Implement the logic to delete the employee with the given employeeId
    // You may use a separate AJAX request to your server to perform the delete operation
    fetch(`/employee/delete?employeeId=${employeeId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          // Employee was successfully deleted, you can remove the corresponding table row
          const row = document.querySelector(`[data-employee-id="${employeeId}"]`);
          if (row) {
            row.remove();
          }
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
    // Implement the logic to update the employee with the given employeeId
    // You may redirect to an update page or show a modal for editing
    // Example: window.location.href = `/employee/update?employeeId=${employeeId}`;
  }
  
  // Call the populateTable function when the page is loaded
  document.addEventListener("DOMContentLoaded", populateTable);
  