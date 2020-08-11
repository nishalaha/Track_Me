
  const devices = JSON.parse(localStorage.getItem('devices')) || [];
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const response = $.get('http://localhost:3001/devices');
  console.log(response);

  /*
  devices.forEach(function(device) {
      const table = document.querySelector('#devices');
      const row = document.createElement('tr');
      const user = document.createElement('td');
      const userText = document.createTextNode(device.user);
      user.appendChild(userText);
      const name = document.createElement('td');
      const nameText = document.createTextNode(device.name);
      name.appendChild(nameText);
      row.appendChild(user);
      row.appendChild(name);
      table.appendChild(row);
     }); 
     
     devices.forEach(function(device) {
      $('#devices tbody').append(`
      <tr>
      <td>${device.user}</td>
      <td>${device.name}</td>
      </tr>`);
     }); */
  
   /* document.querySelector('#add-device').addEventListener('click',
  function() {
   const user = document.querySelector('#user').value;
   const name = document.querySelector('#name').value;
   devices.push({ user: user, name: name });
   console.log(devices);
  }); */
  
    $('#add-device').on('click', function() {
      const user = $('#user').val();
      const name = $('#name').val();
      const sensorData = [];
      const body = {
        name,
        user,
        sensorData
      };
      $.post('http://localhost:3001/devices', body)
      .then(response => {
        location.href = '/';
      })
      .catch(error => {
        console.error(`Error: ${error}`);
      });
     });

     $('#send-command').on('click', function() {
        const command = $('#command').val();
        console.log(`command is: ${command}`);
       });
       
    
     
    $('#register').on('click', function () {
      const userid = $('#username').val()
      const password = $('#password').val()
      const com_password = $('#com_password').val()
      console.log (userid, password, com_password)
      const exists = users.find(user => user.userid === userid);
      console.log (exists)
      if (exists) {
          document.getElementById('error').innerHTML = "User already exists";
      } else if (password != com_password) {
          document.getElementById('error').innerHTML = "Passwords doesn't match";
      } else if (password == "" || com_password == "") {
          document.getElementById('error').innerHTML = "Password cannot be empty";
      }
      else {
          users.push({ userid, password })
          localStorage.setItem('users', JSON.stringify(users));
          location.href = '/login';
      }
  });

    $('#login').on('click', function () {
      const username = $('#uname').val()
      const password = $('#pwd').val()
      const exists = users.find(user => user.userid === username);
      if (exists) {
         if (exists.password == password) { document.getElementById('error').innerHTML = ""; location.href = '/'; localStorage.setItem('isAuthenticated', true); }
          else { document.getElementById('error').innerHTML = "Incorrect password or username"; }
        }    else { document.getElementById('error').innerHTML = "Incorrect password or username"; }
  });
  
    $.get('http://localhost:3001/devices')
    .then(response => {
      console.log(response);
  });

    $.get('http://localhost:3001/devices')
    .then(response => {
      console.log(response);
  })
    .catch(error => {
      console.log(`Error: ${error}`);
  });

    $.get('http://localhost:3001/devices')
    .then(response => {
      response.forEach(device => {
        $('#devices tbody').append(`
          <tr>
            <td>${device.user}</td>
            <td>${device.name}</td>
          </tr>`
        );
      });
    })
  .catch(error => {
    console.error(`Error: ${error}`);
  });

  
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    location.href = '/login';
   }
   

  $('#navbar').load('navbar.html');

  $('#footer').load('footer.html');

