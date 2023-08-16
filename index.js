console.log("hello")

if (typeof jQuery === 'undefined') {
  console.error('jQuery is not loaded.');
} else {
  console.log('jQuery is loaded.');
}

let serverAddress = 'http://localhost:3000'

// Use Jquery to implement the "Add Book" function
$(document).ready(function () {
  console.log("Document is ready");


  $('#bookForm').submit(function (event) {
    event.preventDefault();

    const bookData = {
      ISBN: $('#ISBN').val(),
      book_id: $('#book_id').val(),
      title: $('#title').val(),
      author: $('#author').val(),
      subject: $('#subject').val(),
      publish_year: $('#publish_year').val(),
      edition: $('#edition').val()
    };

    $.ajax({
      url: serverAddress+'/addBook',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(bookData),
      success: function (response) {
        console.log('Book data added successfully');
        // Create a Bootstrap alert using jQuery
        const successAlert = $('<div class="alert alert-success alert-dismissible mt-3 fade show" role="alert">')
          .text('Successfully submitted to the database!')
          .append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>');

        $(".card-body").append(successAlert);

        // Reset the form after submission
        $("#bookForm")[0].reset();
      },
      error: function (error) {
        console.error('Error adding book data:', error);
      }
    });
  });

  // Add a click event listener to the "Cancel" button
  $('#cancelButton').click(function () {
    // Select the form element by its id and reset it
    $('#bookForm')[0].reset();
  });

  $('#userForm').submit(function (event) {
    event.preventDefault();

    const userData = {
      user_id: $('#user_id').val(),
      firstname: $('#firstname').val(),
      lastname: $('#lastname').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      address: $('#address').val(),
      username: $('#username').val(),
      password: $('#password').val(),
      create_date: $('#create_date').val()
    };

    $.ajax({
      url: serverAddress+'/addUser',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(userData),
      success: function (response) {
        console.log('User data added successfully');
        // Create a Bootstrap alert using jQuery
        const successAlert = $('<div class="alert alert-success alert-dismissible mt-3 fade show" role="alert">')
          .text('Successfully submitted to the database!')
          .append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>');

        $(".card-body").append(successAlert);

        // Reset the form after submission
        $("#userForm")[0].reset();
      },
      error: function (error) {
        console.error('Error adding user data:', error);
      }
    });
  });

 

 

  function fetchUsers() {
    console.log("fetchUsers run");

    fetch(serverAddress+'/user')
      .then(response => response.json())
      .then(data => {
        console.log("User data fetched successfully");
        const tableBody = document.getElementById('users-table-body');
        tableBody.innerHTML = ''; // Clear existing table content
        data.forEach(user => {
          const createDate = new Date(user.create_date);
          const formattedDate = createDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${user.user_id}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.address}</td>
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>${formattedDate}</td>
            <td>
              <a href="#" class="btn btn-danger btn-sm">Delete</a>
            </td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  }

 
});

function fetchTotalBooksCount() {
  fetch(serverAddress+'/book/totalCount')
    .then(response => response.json())
    .then(data => {
      const totalBooksCountElement = document.getElementById('totalBooksCount');
      totalBooksCountElement.textContent = data.totalCount; // Update the content with the total count
    })
    .catch(error => {
      console.error('Error fetching total book count:', error);
    });
}

function fetchTotalUsersCount() {
  fetch(serverAddress+'/user/totalUsersCount')
    .then(response => response.json())
    .then(data => {
      const totalUsersCountElement = document.getElementById('totalUsersCount');
      totalUsersCountElement.textContent = data.totalCount; // Update the content with the total count
    })
    .catch(error => {
      console.error('Error fetching total user count:', error);
    });
}

function fetchTotalLoansCount() {
  fetch(serverAddress+'/borrowed/totalLoansCount')
    .then(response => response.json())
    .then(data => {
      const totalLoansCountElement = document.getElementById('totalLoansCount');
      totalLoansCountElement.textContent = data.totalCount; // Update the content with the total count
    })
    .catch(error => {
      console.error('Error fetching total loan count:', error);
    });
}

// Fetch data for Dashboard Recent User Table
function fetchDashUsers() {
  console.log("fetchUsers run");

  fetch(serverAddress+'/user')
    .then(response => response.json())
    .then(data => {
      console.log("User data fetched successfully");
      const tableBody = document.getElementById('recent-users-table');
      tableBody.innerHTML = ''; // Clear existing table content

      // Get the last five users from the data array
      const lastFiveUsers = data.slice(-5);

      lastFiveUsers.forEach(user => {
        const createDate = new Date(user.create_date);
        const formattedDate = createDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.user_id}</td>
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.address}</td>
          <td>${formattedDate}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}

// Fetch data for Dashboard Recent Loans Table
function fetchDashLoans() {
  console.log("fetchBorrowed run");

  fetch(serverAddress+'/borrowed')
    .then(response => response.json())
    .then(data => {
      console.log("Borrowed data fetched successfully");
      const tableBody = document.getElementById('recent-loans-table');
      tableBody.innerHTML = ''; // Clear existing table content
      // Get the last five users from the data array
      const lastFiveUsers = data.slice(-5);

      lastFiveUsers.forEach(borrowed => {
        const createDate = new Date(borrowed.borrow_date);
        const formattedDate = createDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${borrowed.borrow_id}</td>
        <td>${borrowed.account_id}</td>
        <td>${borrowed.ISBN}</td>
        <td>${borrowed.title}</td>
        <td>${formattedDate}</td>
        <td>
          <a href="#" class="btn btn-${borrowed.status === 'Normal' ? 'success' : 'danger'} btn-sm">${borrowed.status}</a>
        </td>
      `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching book data:', error);
    });
}

function fetchBooks() {
  console.log("fetchBooks run");

  fetch(serverAddress+'/book?sort=book_id')
    .then(response => response.json())
    .then(data => {
      console.log("Book data fetched successfully");
      const tableBody = document.getElementById('books-table-body');
      tableBody.innerHTML = ''; // Clear existing table content
      data.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${book.ISBN}</td>
          <td>${book.book_id}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.subject}</td>
          <td>${book.publish_year}</td>
          <td>${book.edition}</td>
          <td>
            <a href="#" class="btn btn-danger btn-sm" onclick="confirmDelete('${book.ISBN}')">Delete</a>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching book data:', error);
    });
}

function confirmDelete(ISBN) {
  const confirmed = confirm('Are you sure you want to delete this book?');
  if (confirmed) {
    deleteBook(ISBN);
  }
}

function deleteBook(ISBN) {
  fetch(serverAddress+`/book/${ISBN}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    console.log('Book deleted successfully:', data);
    // Refresh the book list after deletion
    fetchBooks();
  })
  .catch(error => {
    console.error('Error deleting book:', error);
  });
}

function fetchUsers() {
  console.log("fetchUsers run");

  fetch(serverAddress+'/user')
    .then(response => response.json())
    .then(data => {
      console.log("User data fetched successfully");
      const tableBody = document.getElementById('users-table-body');
      tableBody.innerHTML = ''; // Clear existing table content
      data.forEach(user => {
        const createDate = new Date(user.create_date);
        const formattedDate = createDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.user_id}</td>
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.address}</td>
          <td>${user.username}</td>
          <td>${user.password}</td>
          <td>${formattedDate}</td>
          <td>
            <a href="#" class="btn btn-danger btn-sm" onclick="confirmUserDelete('${user.user_id}')">Delete</a>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}

function confirmUserDelete(user_id) {
  const confirmed = confirm('Are you sure you want to delete this user?');
  if (confirmed) {
    deleteUser(user_id);
  }
}

function deleteUser(user_id) {
  fetch(serverAddress+`/user/${user_id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    console.log('User deleted successfully:', data);
    // Refresh the user list after deletion
    fetchUsers();
  })
  .catch(error => {
    console.error('Error deleting user:', error);
  });
}

function fetchBorrowed() {
  console.log("fetchBorrowed run");

  fetch(serverAddress+'/borrowed')
    .then(response => response.json())
    .then(data => {
      console.log("Borrowed data fetched successfully");
      const tableBody = document.getElementById('borrowed-table-body');
      tableBody.innerHTML = ''; // Clear existing table content
      data.forEach(borrowed => {
        const createDate = new Date(borrowed.borrow_date);
        const formattedDate = createDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${borrowed.borrow_id}</td>
          <td>${borrowed.account_id}</td>
          <td>${borrowed.ISBN}</td>
          <td>${borrowed.title}</td>
          <td>${formattedDate}</td>
          <td>
            <a href="#" class="btn btn-${borrowed.status === 'Normal' ? 'success' : 'danger'} btn-sm">${borrowed.status}</a>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching book data:', error);
    });
}
