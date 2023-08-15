console.log("hello")

if (typeof jQuery === 'undefined') {
  console.error('jQuery is not loaded.');
} else {
  console.log('jQuery is loaded.');
}

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
      url: 'http://localhost:3000/addBook',
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
      url: 'http://localhost:3000/addUser',
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

  function fetchBooks() {
    console.log("fetchBooks run");

    fetch('http://localhost:3000/book?sort=book_id')
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
              <a href="#" class="btn btn-primary btn-sm">Edit</a>
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

  function fetchUsers() {
    console.log("fetchUsers run");

    fetch('http://localhost:3000/user')
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
              <a href="#" class="btn btn-primary btn-sm">Edit</a>
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

  function fetchBorrowed() {
    console.log("fetchBorrowed run");

    fetch('http://localhost:3000/borrowed')
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

  fetchBorrowed();
  fetchBooks();
  fetchUsers();
});




