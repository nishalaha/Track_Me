const API_URL = 'https://api-eta-eight.vercel.app/api';
const currentUser = localStorage.getItem('user');
if (currentUser) {
  $.get(`${API_URL}/devices`)
    .then(response => {
      response.forEach((device) => {
        $('#devices tbody').append(`
       <tr id=${device._id}>
       <td>${device.user}</td>
       <td>${device.name}</td>
     </tr>`
        );
      });
      $('#devices tbody tr').on('click', (e) => {
        const deviceId = e.currentTarget.getAttribute('id');
        console.log(deviceId)
        $.get(`${API_URL}/devices/${deviceId}/device-history`)
          .then(response => {
            response.map(sensorData => {
              $('#historyContent').append(`
                <tr>
                    <td>${sensorData.ts}</td>
                    <td>${sensorData.temp}</td>
                    <td>${sensorData.loc.lat}</td>
                    <td>${sensorData.loc.lon}</td>
                </tr>
            `);
            });
            $('#historyModal').modal('show');
          });
      });
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
} else {
  const path = window.location.pathname;
  if (path !== "/login" && path !== "/registration") {
    location.href = "/login";
  }
}
/*const devices = JSON.parse(localStorage.getItem('devices')) || [];
const users = JSON.parse(localStorage.getItem('users')) || [];
const response = $.get(`${API_URL}/devices`);

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

$('#add-device').on('click', function () {
  const user = $('#user').val();
  const name = $('#name').val();
  const sensorData = [];
  const body = {
    name,
    user,
    sensorData
  };
  $.post(`${API_URL}/devices`, body)
    .then(response => {
      location.href = '/';
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
});

$('#send-command').on('click', function () {
  const command = $('#command').val();
  console.log(`command is: ${command}`);
});

$('#login').on('click', () => {
  const username = $('#username').val();
  const password = $('#password').val();
  $.post(`${API_URL}/authenticate`, { username, password }).then((response) => {
    if (response.success) {
      localStorage.setItem('user', username);
      localStorage.setItem('isAdmin', response.isAdmin);
      localStorage.setItem('isAuthenticated', true);
      location.href = '/';
    } else {
      $('#message').append(`<p class="alert alert-danger">${response}
   </p>`);
    }
  });
});


$('#register').on('click', function () {
  const username = $('#username').val()
  const password = $('#password').val()
  const com_password = $('#comfirm').val()
  console.log(username, password, comfirm)
  const exists = users.find(user => user.username === username);
  console.log(exists)
  if (exists) {
    document.getElementById('error').innerHTML = "User already exists";
  } else if (password != comfirm) {
    document.getElementById('error').innerHTML = "Passwords doesn't match";
  } else if (password == "" || comfirm == "") {
    document.getElementById('error').innerHTML = "Password cannot be empty";
  }
  else {
    users.push({ username, password })
    localStorage.setItem('users', JSON.stringify(users));
    location.href = '/login';
  }
});

/*$('#login').on('click', function () {
  const username = $('#uname').val()
  const password = $('#pwd').val()
  const exists = users.find(user => user.userid === username);
  if (exists) {
     if (exists.password == password) { document.getElementById('error').innerHTML = ""; location.href = '/'; localStorage.setItem('isAuthenticated', true); }
      else { document.getElementById('error').innerHTML = "Incorrect password or username"; }
    }    else { document.getElementById('error').innerHTML = "Incorrect password or username"; }
});*/




$.get(`${API_URL}/devices`)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(`Error: ${error}`);
  });

// $.get(`${API_URL}/devices`)
//   .then(response => {
//     response.forEach(device => {
//       $('#devices tbody').append(`
//           <tr>
//             <td>${device.user}</td>
//             <td>${device.name}</td>
//           </tr>`
//       );
//     });
//     $("#devices tbody tr").on("click", (e) => {
//       const deviceId = e.currentTarget.getAttribute("data-device-id");
//       $.get(`${API_URL}/devices/${deviceId}/device-history`).then(
//         (response) => {
//           console.log(response);
//         }
//       );
//     });
//   })
//   .catch(error => {
//     console.error(`Error: ${error}`);
//   });


const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  location.href = '/login';

}


$('#navbar').load('navbar.html');

$('#footer').load('footer.html');

