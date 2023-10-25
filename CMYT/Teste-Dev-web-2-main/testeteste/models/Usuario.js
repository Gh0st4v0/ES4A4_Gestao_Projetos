const users = [];
class User {
    constructor(username, email, password, userLevel, jobRole, fullName, birthday) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.userLevel = userLevel;
      this.uniqueId = User.getNextUniqueId();
      this.jobRole = jobRole;
      this.fullName = fullName;
      this.birthday = birthday;
    }
  
    // Getters
    getUsername() {
      return this.username;
    }
  
    getEmail() {
      return this.email;
    }
  
    getPassword() {
      return this.password;
    }
  
    getUserLevel() {
      return this.userLevel;
    }
  
    getUniqueId() {
      return this.uniqueId;
    }
  
    getJobRole() {
      return this.jobRole;
    }
  
    getFullName() {
      return this.fullName;
    }
  
    getBirthday() {
      return this.birthday;
    }
  
    // Setters
    setUsername(username) {
      this.username = username;
    }
  
    setEmail(email) {
      this.email = email;
    }
  
    setPassword(password) {
      this.password = password;
    }
  
    setUserLevel(userLevel) {
      // Allow only predefined user levels: 'master', 'admin', 'user'
      const allowedLevels = ['master', 'admin', 'user'];
      if (!allowedLevels.includes(userLevel)) {
        console.error('Invalid user level.');
        return;
      }
  
      // Prevent setting 'master' user level
      if (this.userLevel !== 'master') {
        console.error('Cannot change the user level of a master user.');
        return;
      }
  
      this.userLevel = userLevel;
    }
  
    static getNextUniqueId() {
        if (typeof User.uniqueId === 'undefined') {
          User.uniqueId = 1; // Initialize the unique ID
        } else {
          User.uniqueId += 1; // Increment the unique ID for each new user
        }
        return User.uniqueId;
      }
  
    setJobRole(jobRole) {
      this.jobRole = jobRole;
    }
  
    setFullName(fullName) {
      this.fullName = fullName;
    }
  
    setBirthday(birthday) {
      this.birthday = birthday;
    }
  
    // Static method to create a user
    static createUser(username, email, password, userLevel, jobRole, fullName, birthday) {
      // Allow only predefined user levels: 'master', 'admin', 'user'
      const allowedLevels = ['master', 'admin', 'user'];
      if (!allowedLevels.includes(userLevel)) {
        console.error('Invalid user level.');
        return null;
      }
       // Add the newly created user to the 'users' array
        const newUser = new User(username, email, password, userLevel, jobRole, fullName, birthday);
        users.push(newUser);
      return newUser;
    }
  
    // Method to delete a user
    static deleteUser(loggedInUser,user) {
        console.log('funcao comecou',user)
      if (loggedInUser.userLevel !== 'master') {
        console.error('Insufficient privileges to delete a user.');
        return;
      } 
        const index = users.indexOf(user);
        if (index !== -1) {
          users.splice(index, 1);
        }
      
      console.log(`User '${user.username}' has been deleted.`);
    }
  }

   // Singleton to handle master user creation
   const MasterUserSingleton = (() => {
    let masterUser = null;
  
    function createMasterUser() {
      if (!masterUser) {
        masterUser = User.createUser('master', 'master@example.com', 'masterpassword', 'master', 'Master Role', 'Master User', '1970-01-01');
      }
      return masterUser;
    }
  
    return {
      getMasterUser: () => createMasterUser()
    };
  })();

  // Create users
    User.createUser('master', 'master@example.com', 'masterpassword', 'master', 'Master Role', 'Master User', '1970-01-01'),
    User.createUser('admin', 'admin@example.com', 'adminpassword', 'admin', 'Admin Role', 'Admin User', '1980-05-15'),


exports = {
    User,
    users
}; 
  
