var loggedInUser
class UsuarioController {
  // Authenticate user
  static authenticateUser(username, password) {
    console.log(users)
    const authenticatedUser = users.find(user => user.username === username && user.password === password);
    return authenticatedUser;
  }

  // Check if a user is the master
  static isMasterUser(user) {
    if (user && user.userLevel === "master") {
      return true; // Return true for master users
    }
    return false; // Return false for non-master users
  }

  // Check if a user is an admin
  static isAdminUser(user) {
    if (user && user.userLevel === "admin") {
      return true; // Return true for admin users
    }
    return false; // Return false for non-admin users
  }

  //add users to the table
  static addUserToTable(user) {
    const tableBody = document.getElementById('user-table-body');
    const newRow = tableBody.insertRow();
    
    const usernameCell = newRow.insertCell(0);
    usernameCell.textContent = user.username;
    
    const userLevelCell = newRow.insertCell(1);
    userLevelCell.textContent = user.userLevel;
    
    const fullNameCell = newRow.insertCell(2);
    fullNameCell.textContent = user.fullName;
    
    const jobRoleCell = newRow.insertCell(3);
    jobRoleCell.textContent = user.jobRole;
    
    const uniqueIdCell = newRow.insertCell(4);
    uniqueIdCell.textContent = user.uniqueId;
    
    const emailCell = newRow.insertCell(5);
    emailCell.textContent = user.email;
    
    const birthdayCell = newRow.insertCell(6);
    birthdayCell.textContent = user.birthday;
  }
  

  static handleLoginFormSubmit(event) {
    event.preventDefault();  // Prevent the form from submitting and reloading the page
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = UsuarioController.authenticateUser(username, password);
    if (user) {
        window.location.href = "/testeteste/views/Main.html"
        UsuarioController.login(user);
    } else {
        alert('Invalid user credentials.');
    }
  }

  static handleUserCreationFormSubmit(event) {
    event.preventDefault();  // Prevent the form from submitting and reloading the page
    const newUsername = document.getElementById('new-username').value;
    const newEmail = document.getElementById('new-email').value;
    const newPassword = document.getElementById('new-password').value;
    const userLevel = document.getElementById('user-level').value;
    const jobRole = document.getElementById('job-role').value;
    const fullName = document.getElementById('full-name').value;
    const birthday = document.getElementById('birthday').value;
    const newUser = User.createUser(newUsername, newEmail, newPassword, userLevel, jobRole, fullName, birthday);
    if (newUser) {
      console.log('User created:', newUser);
      UsuarioController.updateUserTable();
    } else {
      alert('User creation failed.');
    }
  }

  static handleLogout() {
    UsuarioController.logout(); // Log out the user
    const logoutButton = document.getElementById('logout-button');
  }

  static login(user) {
    loggedInUser = user;
    console.log('login efetuado',loggedInUser)
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = `Logged in as: ${user.username}`;
  }

  static logout() {
    loggedInUser = null;
    console.log('logout efetuado',loggedInUser)
    window.location.href = '/testeteste/index.html'
  }

  static deleteUser(user) {
    if (UsuarioController.isMasterUser(loggedInUser)) {
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (confirmDelete){
            User.deleteUser(loggedInUser,user);
            const tableBody = document.getElementById("user-table-body");
            const index = users.findIndex(u => u.uniqueId === user.uniqueId);
            tableBody.deleteRow(index);
        }
    } else {
        alert("Only the master user can delete other users.");
    }
}

  
  static updateUserTable() {
    const tableBody = document.getElementById("user-table-body");
    tableBody.innerHTML = ''; // Clear the existing table
    for (const user of users) {
      const newRow = tableBody.insertRow();
      newRow.insertCell(0).textContent = user.username;
      newRow.insertCell(1).textContent = user.userLevel;
      newRow.insertCell(2).textContent = user.fullName;
      newRow.insertCell(3).textContent = user.jobRole;
      newRow.insertCell(4).textContent = user.uniqueId;
      newRow.insertCell(5).textContent = user.email;
      newRow.insertCell(6).textContent = user.birthday;
  
      if (UsuarioController.isMasterUser(loggedInUser)) {
        // Add a "Delete" button for master users
        const deleteCell = newRow.insertCell(7);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          UsuarioController.deleteUser(user);
        });
        deleteCell.appendChild(deleteButton);
      }
      else{
        console.log('n considero mastesr user')
        console.log(UsuarioController.isMasterUser(loggedInUser))
        console.log(loggedInUser)

      }
    }
  }

}
function addEventos (){
  if (document.getElementById('logout-button') !== null){
    document.getElementById('logout-button')
    .addEventListener('click', UsuarioController.handleLogout);
  }
  
  if (document.getElementById('user-creation-form') !== null){
    document.getElementById('user-creation-form')
    .addEventListener("submit",UsuarioController.handleUserCreationFormSubmit);
  }
  
  if (document.getElementById('login-form') !== null){
    window.addEventListener("load", document.getElementById('login-form')
    .addEventListener("submit",UsuarioController.handleLoginFormSubmit))
  }

  if (document.getElementById('user-info') !== null){
    document.getElementById('user-info').innerHTML = `Usuario ${loggedInUser.username} logado`
  }
}

window.addEventListener("load",addEventos)
 